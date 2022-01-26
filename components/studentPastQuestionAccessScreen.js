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
import StudentLectureAccessDownloadsScreen from './studentLectureAccessDownloadsScreen';
import StudentUploadQuestionsComponent from './studentUploadQuestionsComponent';
import DocumentPicker from 'react-native-document-picker';
import {RNS3} from 'react-native-aws3';
import StudentPastQuestionAccessSolutionVideoComponent from './studentPastQuestionAccessSolutionVideoComponent';
import StudentPastQuestionAccessSolutionSheetScreen from './studentPastQuestionAccessSolutionSheetScreen';
import StudentPastQuestionAccessQnAScreen from './studentPastQuestionAccessQnAScreen';

const StudentPastQuestionAccessScreen = ({route, navigation}) => {
  const {lecture_id, tutorId, authenticationToken, studentUniversity} =
    route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [lectureDetails, setLectureDetails] = useState('');
  const [updateState, setUpdateState] = useState({});
  const [courseOutline, setCourseOutline] = useState([]);
  const [scrollHeight, setScrollHeight] = useState(height * 0.58);

  const [question, questionState] = useState('');
  const [answers, setAnswers] = useState([]);
  const [updateStates, setUpdateStates] = useState({});
  const [fileObject, setFileObject] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [fileType, setFileType] = useState('');

  const getData = () => {
    var config = {
      method: 'get',
      url:
        'http://collageapi.herokuapp.com/api/get_anwsers/' +
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
        sendData(response.body.postResponse.location);
        getData();
        console.log(response.body.postResponse.location);
      })
      .catch((e) => {
        setIsUploading(false);
        console.warn(e);
        alert('something went wrong');
      });
  };

  const sendData = (qst) => {
    var data = JSON.stringify({
      token: authenticationToken,
      lecture_id: lecture_id,
      university: studentUniversity,
      question: qst,
      title: fileObject.name,
      tutor_id: tutorId,
    });

    var config = {
      method: 'post',
      url: 'https://collageapi.herokuapp.com/api/ask_tutor/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        ToastAndroid.show('Question sent to tutor', ToastAndroid.LONG);
      })
      .catch(function (error) {
        console.log('damn send data request === ', error);
        ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
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
      setFileType(fileObj.type);
      // const awsParams = awsOptions(fileType);
      setFileObject(fileObj);

      setUpdateStates({});
      // console.warn(awsParams);
      handleUploadFileToS3(fileObj);
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
      past_question_id: lecture_id,
    });

    var config = {
      method: 'post',
      url: 'http://collageapi.herokuapp.com/api/view_past_question/',
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
      <ScrollView style={{backgroundColor: 'white'}}>
        {lectureDetails.length < 1 ? (
          <ActivityIndicator />
        ) : (
          <>
            <View>
              <View>
                <LinearGradient
                  colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.8)']}>
                  <Image
                    // resizeMethod="scale"
                    style={{
                      width: width,
                      height: height * 0.4,
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
                    height: height * 0.4,
                    // backgroundColor: 'rgba(0, 0, 0, 0.521)',
                    position: 'absolute',
                    // borderRadius: deviceSize * 0.0003,
                    paddingHorizontal: '10%',
                    justifyContent: 'flex-end',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      marginBottom: '5%',
                      fontWeight: 'bold',
                    }}>
                    {lectureDetails.title.toUpperCase()}
                  </Text>
                  <View
                    style={{
                      width: '100%',
                      marginBottom: '10%',
                      flexDirection: 'row',
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                          : lectureDetails.solution_videos.length}{' '}
                        Solutions
                      </Text>
                    </View>
                    {/* <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: '10%',
                }}>
                <Ionicons
                  onPress={() => {
                    navigation.goBack();
                    // alert('GGgg');
                  }}
                  name="book-outline"
                  size={18}
                  color={'white'}
                />
                <Text style={{color: 'white'}}> 12 Topics</Text>
              </View> */}
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                          type: 'past_questions',
                        });
                      }}>
                      Rate us
                    </Text>
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
                initialPage={0}>
                <StudentPastQuestionAccessSolutionVideoComponent
                  tabLabel={'Past questions'}
                  courseOutline={lectureDetails.solution_videos}
                  thumbnail={lectureDetails.thumbnail}
                  // key=
                />
                {/* <View key={'2'} tabLabel={'second tab'} style={{flex: 1}} /> */}
                {/* <StudentUploadQuestionsComponent
                  lecture_id={lecture_id}
                  authenticationToken={authenticationToken}
                  tutorId={tutorId}
                  studentUniversity={studentUniversity}
                  key={'2'}
                  tabLabel={'Upload questions'}
                /> */}
                {/* <View key={'3'} tabLabel={'Notes'} style={{flex: 1}} /> */}
                <StudentPastQuestionAccessSolutionSheetScreen
                  tabLabel={'Solution sheet'}
                  courseOutline={lectureDetails.solving_sheet}
                />
                <StudentPastQuestionAccessQnAScreen
                  authenticationToken={authenticationToken}
                  studentUniversity={studentUniversity}
                  lecture_id={lecture_id}
                  tutorId={tutorId}
                  tabLabel={'QnA'}
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
              justifyContent: 'center',
              alignItems: 'center',
              padding: '5%',
              borderWidth: 1,
              borderRadius: 10,
            }}>
            <Text>Find More</Text>
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
      {true ? (
        <></>
      ) : (
        <TouchableOpacity
          onPress={handleUploadFile}
          style={{
            position: 'absolute',
            padding: '4%',
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
          <Ionicons name="add" size={deviceSize * 0.0001} color={'white'} />
        </TouchableOpacity>
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

export default StudentPastQuestionAccessScreen;
