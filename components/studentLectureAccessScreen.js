import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  useWindowDimensions,
  StyleSheet,
  ToastAndroid,
  // ScrollView,
} from 'react-native';
import TutorHeaderComponent from './tutorHeaderComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Axios from 'axios';
import {
  deviceSize,
  height,
  width,
  brandColor,
  studentLoginAs,
  tutorLoginAs,
  checkInputLength,
  checkUpperCase,
  checkNumber,
  awsOptions,
  dimension,
  titleCase,
  apiDomain,
} from './modules';
import Moment from 'moment';
import Video from 'react-native-video';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import LectureDetailsOverviewScreen from './lectureDetailsOverviewScreen';
import LectureDetailOutlineScreen from './LectureDetailsOutlineScreen';
import {ScrollView} from 'react-native-gesture-handler';
import ScrollableTabView, {
  // DefaultTabBar,
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view-forked';
import LecturesDetailsReviewScreen from './lecturesDetailsReviewScreen';
import LectureDetailsQandAScreen from './lectureDetailsQandAscreen';
import * as Progress from 'react-native-progress';
import moment from 'moment';
import Slider from '@react-native-community/slider';
// import { Orientation } from 'react-native-pager-view';
import Orientation from 'react-native-orientation-locker';
import LinearGradient from 'react-native-linear-gradient';
import StudentLectureAccessCourseOutlineScreen from './studentLectureAccessCourseOutlineScreen';
import StudentLectureAccessNoteScreen from './studentLectureAccessNoteScreen';
import StudentLectureAccessDownloadsScreen from './studentLectureAccessDownloadsScreen';
import StudentUploadQuestionsComponent from './studentUploadQuestionsComponent';
import DocumentPicker from 'react-native-document-picker';
import {RNS3} from 'react-native-aws3';
import FocusAwareStatusBar from './FocuseAwareStatusBar';
import ProcessComponent from './processComponent';

const StudentLectureAccessScreen = ({route, navigation}) => {
  const {lecture_id, tutorId, authenticationToken, studentUniversity} =
    route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [lectureDetails, setLectureDetails] = useState([]);
  const [updateState, setUpdateState] = useState({});
  const [courseOutline, setCourseOutline] = useState([]);
  const [scrollHeight, setScrollHeight] = useState(height * 0.58);

  const [question, questionState] = useState('');
  const [answers, setAnswers] = useState([]);
  const [updateStates, setUpdateStates] = useState({});
  const [fileObject, setFileObject] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [fileType, setFileType] = useState('');
  const [totalCourseHour, setTotalCourseHour] = useState(0);
  const [showAddButton, setShowAddButton] = useState(true);

  const getData = () => {
    var config = {
      method: 'get',
      url:
        apiDomain +
        '/api/get_anwsers/' +
        lecture_id +
        '/' +
        authenticationToken +
        '/' +
        studentUniversity,
      headers: {},
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data.message));
        setAnswers(response.data.message);
        setUpdateStates({});
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleUploadFileToS3 = (f) => {
    console.warn(f);
    const awsParams = awsOptions();
    RNS3.put(f, awsParams)
      .progress((e) => {
        setIsUploading(true);
        // console.log(e.loaded / e.total);
        console.log(Math.round((e.loaded * 100) / e.total));
      })
      .then((response) => {
        console.log('result', response);
        setIsUploading(false);
        questionState(response.body.postResponse.location);
        sendData(response.body.postResponse.location, f);
        getData();
        console.log(response.body.postResponse.location);
      })
      .catch((e) => {
        setIsUploading(false);
        console.warn(e);
        alert('something went wrong');
      });
  };

  const sendData = (qst, file) => {
    var data2 = JSON.stringify({
      token: authenticationToken,
      lecture_id: lecture_id,
      university: studentUniversity,
      question: qst,
      title: file.name,
      tutor_id: tutorId,
    });

    console.log('what am sending', data2);

    var config = {
      method: 'post',
      url: apiDomain + '/api/ask_tutor/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data2,
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        ToastAndroid.show('Question sent to tutor', ToastAndroid.LONG);
        getData();
      })
      .catch(function (error) {
        console.log('damn send data request === ', error);
        ToastAndroid.show(
          'Something went wrong,.. try again',
          ToastAndroid.LONG,
        );
      });
  };

  const handleUploadFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(res);
      const fileObj = {
        type: res.type,
        name: res.name,
        uri: res.uri,
      };
      if (fileObj) {
        setFileType(fileObj.type);
        // const awsParams = awsOptions(fileType);
        setFileObject(fileObj);

        setUpdateStates({});
        // console.warn(awsParams);
        handleUploadFileToS3(fileObj);
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.warn('cancelled');
      } else {
        throw error;
      }
    }
  };

  const handleFindMoreButton = () => {
    setScrollHeight(scrollHeight + scrollHeight * 0.4);
  };

  const getData1 = () => {
    setIsLoading(true);
    var data = JSON.stringify({
      lecture_id: lecture_id,
    });

    var config = {
      method: 'post',
      url: apiDomain + '/api/view_lecture/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data.message));
        setLectureDetails(response.data.message);
        setCourseOutline(response.data.message.course_outline);
        let totalHours = 0;
        for (let i in response.data.message.course_outline) {
          for (let j in response.data.message.course_outline[i].class) {
            totalHours += Number(
              response.data.message.course_outline[i].class[j].videoLength,
            );
          }
        }
        console.log('total hours', totalHours);
        setTotalCourseHour(totalHours);
        setUpdateState({});
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  useState(() => {
    getData1();
  }, []);
  return (
    <>
      {isLoading ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: height,
          }}>
          <ActivityIndicator color={brandColor} size={40} />
          <Text>Just a moment...</Text>
        </View>
      ) : (
        <>
          <ScrollView style={{backgroundColor: 'white'}}>
            <ProcessComponent showModal={isUploading} text={'Sending...'} />
            <FocusAwareStatusBar
              currentHeight={0}
              translucent={false}
              backgroundColor={brandColor}
            />
            {lectureDetails.length < 1 ? (
              <ActivityIndicator />
            ) : (
              <>
                <View>
                  <View>
                    <LinearGradient
                      colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}>
                      <Image
                        // resizeMethod="scale"
                        style={{
                          width: width,
                          height: height * 0.35,
                          // borderRadius: deviceSize * 0.0003,
                          zIndex: -1,
                        }}
                        source={{
                          uri: lectureDetails.thumbnail,
                        }}
                        resizeMode="stretch"
                      />
                    </LinearGradient>

                    <View
                      style={{
                        width: width,
                        height: height * 0.35,
                        // backgroundColor: 'rgba(0, 0, 0, 0.521)',
                        position: 'absolute',
                        // borderRadius: deviceSize * 0.0003,
                        padding: '5%',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Ionicons
                          onPress={() => {
                            navigation.goBack();
                            // alert('GGgg');
                          }}
                          name="chevron-back-outline"
                          size={25}
                          color={'white'}
                          style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            borderRadius: deviceSize,
                            padding: '1%',
                          }}
                        />
                        <Ionicons
                          onPress={() => {
                            // navigation.goBack();
                            // alert('GGgg');
                          }}
                          name="share-social-outline"
                          size={25}
                          color={'white'}
                          style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            borderRadius: deviceSize,
                            padding: '1%',
                          }}
                        />
                      </View>
                      <View>
                        <Text
                          style={{
                            color: 'white',
                            marginBottom: '5%',
                            fontWeight: 'bold',
                            fontFamily: 'DM Sans',
                          }}>
                          {lectureDetails.title.toUpperCase()}
                        </Text>
                        <View
                          style={{
                            width: '100%',
                            // marginBottom: '2%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Ionicons
                                onPress={() => {
                                  // navigation.goBack();
                                  // alert('GGgg');
                                }}
                                name="book-outline"
                                size={18}
                                color={'white'}
                              />
                              <Text style={{color: 'white'}}>
                                {' '}
                                {lectureDetails.length < 1
                                  ? 0
                                  : lectureDetails.course_outline.length}{' '}
                                Topics
                              </Text>
                            </View>

                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginLeft: '5%',
                              }}>
                              <Ionicons
                                onPress={() => {
                                  // navigation.goBack();
                                  // alert('GGgg');
                                }}
                                name="stopwatch-outline"
                                size={18}
                                color={'white'}
                              />
                              <Text style={{color: 'white'}}>
                                {' '}
                                {moment
                                  .duration(totalCourseHour, 'seconds')
                                  .hours() === 0
                                  ? ''
                                  : moment
                                      .duration(totalCourseHour, 'seconds')
                                      .hours() + 'hr'}
                                {moment
                                  .duration(totalCourseHour, 'seconds')
                                  .minutes()}
                                min
                              </Text>
                            </View>
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginLeft: '5%',
                            }}>
                            <Ionicons
                              onPress={() => {
                                // navigation.goBack();
                                // alert('GGgg');
                              }}
                              name="star-outline"
                              size={18}
                              color={'white'}
                            />
                            <Text
                              style={{
                                color: brandColor,
                                marginVertical: '3%',
                                marginLeft: '2%',
                                // backgroundColor: 'green',
                              }}
                              onPress={() => {
                                navigation.navigate('StudentRateScreen', {
                                  lecture_id,
                                  authenticationToken,
                                  type: 'lectures',
                                });
                              }}>
                              {' '}
                              Rate us
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  // onLayout={(e) => {
                  //   const {x, y, width, height} = e.nativeEvent.layout;
                  //   console.warn(height);
                  // }}
                  style={{
                    // display: 'flex',
                    // flexGrow: 1,
                    // flex: 1,
                    width: '100%',
                    // backgroundColor: 'blue',
                    height: scrollHeight,
                    // flexGrow: 1,
                  }}>
                  <ScrollableTabView
                    renderTabBar={() => (
                      <ScrollableTabBar
                        style={styles.scrollStyle}
                        tabStyle={styles.tabStyle}
                      />
                    )}
                    tabBarTextStyle={styles.tabBarTextStyle}
                    tabBarInactiveTextColor={'black'}
                    tabBarActiveTextColor={brandColor}
                    tabBarUnderlineStyle={styles.underlineStyle}
                    onChangeTab={() => {
                      // console.log('tab 1 changed');
                      if (showAddButton) {
                        setShowAddButton(false);
                      } else {
                        setShowAddButton(true);
                      }
                    }}
                    initialPage={0}>
                    <StudentLectureAccessCourseOutlineScreen
                      key={'1'}
                      tabLabel={'Course outline'}
                      courseOutline={courseOutline}
                      title={lectureDetails.title}
                      numberOfTopics={
                        lectureDetails.length < 1
                          ? 0
                          : lectureDetails.course_outline.length
                      }
                      thumbnail={lectureDetails.thumbnail}
                    />
                    {/* <View key={'2'} tabLabel={'second tab'} style={{flex: 1}} /> */}
                    <StudentUploadQuestionsComponent
                      lecture_id={lecture_id}
                      authenticationToken={authenticationToken}
                      tutorId={tutorId}
                      studentUniversity={studentUniversity}
                      key={'2'}
                      tabLabel={'Upload questions'}
                    />
                    <StudentLectureAccessNoteScreen
                      tabLabel={'Notes'}
                      key={'3'}
                    />
                  </ScrollableTabView>
                </View>
              </>
            )}
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: '5%',
              }}>
              <TouchableOpacity
                onPress={handleFindMoreButton}
                style={{
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '5%',
                  borderWidth: 1,
                  borderRadius: 10,
                }}>
                <Text>Load More</Text>
                <Ionicons
                  onPress={() => {
                    // navigation.goBack();
                    // alert('GGgg');
                  }}
                  name="arrow-down-outline"
                  size={18}
                  color={brandColor}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
          {lectureDetails.length < 1 ? (
            <></>
          ) : showAddButton ? (
            <TouchableOpacity
              onPress={handleUploadFile}
              // onPress={sendMail}
              style={{
                position: 'absolute',
                paddingVertical: '4%',
                backgroundColor: brandColor,
                // width: width * 0.2,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: height * 0.85,
                borderRadius: deviceSize,
                marginLeft: '70%',
                shadowColor: brandColor,
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.41,
                shadowRadius: 9.11,

                elevation: 5,
              }}>
              <Ionicons
                name="add"
                size={dimension.fontScale * 30}
                color={'white'}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  tabStyle: {},
  scrollStyle: {
    backgroundColor: 'white',
    paddingHorizontal: '0%',
    // height: 1000,
    // width: 200,
    // justifyContent: 'center',
  },
  tabBarTextStyle: {
    fontSize: dimension.fontScale * 14,
    fontWeight: 'normal',
  },
  underlineStyle: {
    height: 3,
    backgroundColor: brandColor,
    borderRadius: 3,
    width: '30%',
  },
});

export default StudentLectureAccessScreen;
