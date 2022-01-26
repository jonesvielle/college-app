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
  Animated,
  PermissionsAndroid,
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
import ProgressCircle from 'react-native-progress-circle';
import RNFetchBlob from 'react-native-fetch-blob';
// const {getVideoDurationInSeconds} = require('get-video-duration');
import MediaMeta from 'react-native-media-meta';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StudentHeaderComponent from './studentHeaderComponent';
import EmptyCourses from '../images/emptyCourses.png';
import ButtonComponent from './buttonComponent';

const StudentDownloadScreen = ({route, navigation}) => {
  const [lectureDownloads, setLectureDownloads] = useState([]);
  const [pastQuestionDownloads, setPastQuestion] = useState([]);
  const [updateStates, setUpdateStates] = useState({});

  const getLectureDownloads = async () => {
    try {
      const value = await AsyncStorage.getItem('@lectures');
      console.log(value);
      if (value !== null) {
        console.log('local lecture', value);
        const uniq = removeDuplicates(JSON.parse(value), (item) => item.title);
        setLectureDownloads(uniq);
        setUpdateStates({});
        // setState(value);
        // return value;
      } else {
        return null;
      }
    } catch (error) {
      console.log('error lectures', error);
    }
  };

  const getPastQuestionDownloads = async () => {
    try {
      const value = await AsyncStorage.getItem('@pastQuestions');
      console.log(value);
      if (value !== null) {
        console.log('local past questions', value);
        const uniq = removeDuplicates(JSON.parse(value), (item) => item.title);
        setPastQuestion(uniq);
        setUpdateStates({});
        // setState(value);
        // return value;
      } else {
        return null;
      }
    } catch (error) {
      console.log('error lecures', error);
    }
  };

  function removeDuplicates(data, key) {
    return [...new Map(data.map((item) => [key(item), item])).values()];
  }
  useEffect(() => {
    getLectureDownloads();
    getPastQuestionDownloads();
    setUpdateStates({});

    // console.log(
    //   'OK',
    //   removeDuplicates(lectureDownloads, (item) => item.title),
    // );
  }, []);

  const handleOnRefresh = () => {
    // alert('ok');
    getLectureDownloads();
    getPastQuestionDownloads();
    setUpdateStates({});
  };

  const handlePlayVideo = async (file, thumbnail) => {
    // alert(file);

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Read permission',
          message: 'Allow read from externl storage',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('allowed');
        navigation.navigate('CollegeVideoPlayerComponent', {
          thumbnail,
          preview_video: file,
        });
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <ScrollView>
      <View style={{padding: '5%', height: height, backgroundColor: 'white'}}>
        <StudentHeaderComponent
          notShowSearch
          title="Downloads"
          // onPressSearch={() => {
          //   navigation.navigate('StudentSearchScreen', {
          //     studentUniversity,
          //     studentDepartment,
          //     studentEmail,
          //     studentId,
          //     studentLevel,
          //     authenticationToken,
          //   });
          // }}
        />
        {/* <View> */}
        <View style={{marginTop: '5%'}}>
          {pastQuestionDownloads.length < 1 ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: height * 0.2,
              }}>
              <Image
                style={{
                  width: width * 0.4,
                  height: width * 0.4,
                }}
                source={EmptyCourses}
                resizeMode="center"
              />
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontStyle: 'italic'}}>
                    No downloaded past question yet...
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            pastQuestionDownloads.map((c, i) => (
              <View
                style={{
                  paddingVertical: '2%',
                  marginTop: '5%',
                  marginHorizontal: '0%',
                  paddingHorizontal: '5%',
                  flexDirection: 'row',
                  borderWidth: 0.5,
                  borderRadius: 0,
                  //   marginBottom: '5%',
                  // alignItems: 'center',
                }}>
                <View style={{width: '90%'}}>
                  <Text
                    style={{
                      fontSize: dimension.fontScale * 15,
                      fontWeight: 'bold',
                    }}>
                    {c.title}
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons
                      onPress={() => {
                        // navigation.goBack();
                        // alert('GGgg');
                      }}
                      name="folder-open"
                      size={18}
                      color={'grey'}
                    />
                    <Text
                      style={{
                        marginTop: '2%',
                        color: 'grey',
                        marginLeft: '5%',
                      }}>
                      Video
                    </Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <Ionicons
                    onPress={() => {
                      handlePlayVideo(c.file, c.thumbnail);
                    }}
                    name="play-circle-outline"
                    size={30}
                    color={brandColor}
                  />
                </TouchableOpacity>
              </View>
            ))
          )}

          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: 'grey',
              marginTop: '10%',
            }}></View>
          {/* <Text
            style={{
              width: '100%',
              height: 1,
              backgroundColor: 'grey',
              // marginTop: '10%',
              color: 'red',
            }}>
            Downloaded Lectures
          </Text> */}
          {lectureDownloads.length < 1 ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: height * 0.2,
              }}>
              <Image
                style={{
                  width: width * 0.4,
                  height: width * 0.4,
                }}
                source={EmptyCourses}
                resizeMode="center"
              />
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontStyle: 'italic'}}>
                    No downloaded course lecture yet...
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            lectureDownloads.map((c, i) => (
              <View
                style={{
                  paddingVertical: '2%',
                  marginTop: '5%',
                  marginHorizontal: '0%',
                  paddingHorizontal: '5%',
                  flexDirection: 'row',
                  borderWidth: 0.5,
                  borderRadius: 0,
                  //   marginBottom: '5%',
                  // alignItems: 'center',
                }}>
                <View style={{width: '90%'}}>
                  <Text
                    style={{
                      fontSize: dimension.fontScale * 15,
                      fontWeight: 'bold',
                    }}>
                    {c.title}
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons name="folder-open" size={18} color={'grey'} />
                    <Text
                      style={{
                        marginTop: '2%',
                        color: 'grey',
                        marginLeft: '5%',
                      }}>
                      Video
                    </Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <Ionicons
                    onPress={() => {
                      handlePlayVideo(c.file, c.thumbnail);
                    }}
                    name="play-circle-outline"
                    size={30}
                    color={brandColor}
                  />
                </TouchableOpacity>
              </View>
            ))
          )}

          <View style={{width: '100%', marginVertical: '10%'}}>
            <ButtonComponent onPress={handleOnRefresh} buttonText="Refresh" />
          </View>
        </View>
      </View>
      {/* </View> */}
    </ScrollView>
  );
};

export default StudentDownloadScreen;
