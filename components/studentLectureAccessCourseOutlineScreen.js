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
import {useNavigation} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FocusAwareStatusBar from './FocuseAwareStatusBar';

const StudentLectureAccessCourseOutlineScreen = ({
  courseOutline,
  title,
  numberOfTopics,
  thumbnail,
}) => {
  //   const [courseOutline, setCourseOutline] = useState([]);
  const [allKeys, setAllKeys] = useState([]);
  const [lecturesProgress, setLecturesProgress] = useState([]);
  const [currentLectureProgress, setCurrentLectureProgress] = useState([]);

  const navigation = useNavigation();

  const handleAccessCourseOutline = (id, courseArray, title) => {
    navigation.navigate('StudentCourseOutlineListScreen', {
      courseOutline: courseArray,
      title,
      numberOfTopics,
      thumbnail,
      id,
    });
  };
  const getLecturesProgress = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@lecturesProgress');
      if (jsonValue != null) {
        const data = JSON.parse(jsonValue);
        setLecturesProgress(data);
        console.log('lectures progress', data);
        let tempArray = new Array();
        for (i in data) {
          if (data[i].courseTitle === title) {
            tempArray.push(data[i]);
          }
        }
        setCurrentLectureProgress(tempArray);
      }
    } catch (e) {
      console.log('error from reading lecture progress', e);
    }
  };

  const checkIfLectureIsStarted = (topicTitle) => {
    for (i in currentLectureProgress) {
      console.log('lopp', currentLectureProgress[i]);
      if (currentLectureProgress[i].topicTitle === topicTitle) {
        return currentLectureProgress[i];
      } else {
        return false;
      }
    }
  };

  const getAllKeys = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      console.log('read key error', e);
    }
    setAllKeys(keys);
  };

  const setLectureProgressKey = async () => {
    try {
      const jsonValue = JSON.stringify([]);
      await AsyncStorage.setItem('@lecturesProgress', jsonValue);
    } catch (e) {
      console.log('saving error', e);
    }
  };

  const addLectureProgressObject = (courseTitle, topicTitle) => {
    progressObject = {
      courseTitle,
      topicTitle,
      progress: 0,
    };
  };

  useEffect(() => {
    // console.log(checkLectureProgressExists());
    getAllKeys();
    if (allKeys.includes('@lecturesProgress')) {
      getLecturesProgress();
    } else {
      setLectureProgressKey();
    }
  }, []);

  return (
    <View style={{padding: '5%', backgroundColor: 'white'}}>
      {courseOutline.map((c, i) => (
        <>
          <View
            key={i}
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginBottom: '5%',
            }}>
            <Image
              // resizeMethod="scale"
              style={{
                width: width * 0.2,
                height: width * 0.2,
                borderRadius: 10,
                // borderRadius: deviceSize * 0.0003,
              }}
              source={{
                uri: thumbnail,
              }}
              resizeMode="stretch"
            />
            <View style={{width: '70%', marginLeft: '5%'}}>
              <Text style={{fontFamily: 'DM Sans', color: '#333333'}}>
                <Text style={{fontWeight: 'bold', fontFamily: 'DM Sans'}}>
                  Topic {i + 1}:
                </Text>{' '}
                {c.title}
              </Text>
              {!checkIfLectureIsStarted(c.title) ? (
                <>
                  {console.log(
                    'checked here',
                    checkIfLectureIsStarted(c.title),
                  )}
                </>
              ) : (
                <Progress.Bar
                  progress={checkIfLectureIsStarted(c.title).progress}
                  width={200}
                  color={brandColor}
                  style={{marginTop: '5%'}}
                  unfilledColor={'#F2F2F2'}
                  borderWidth={0}
                />
              )}
              {!checkIfLectureIsStarted(c.title) ? (
                <Text
                  onPress={() => {
                    handleAccessCourseOutline(i + 1, c.class, c.title);
                  }}
                  style={{
                    color: brandColor,
                    fontWeight: 'bold',
                    marginVertical: '2%',
                  }}>
                  Start class
                </Text>
              ) : (
                <Text
                  onPress={() => {
                    handleAccessCourseOutline(i + 1, c.class, c.title);
                  }}
                  style={{
                    color: brandColor,
                    fontWeight: 'bold',
                    marginVertical: '2%',
                  }}>
                  Resume class
                </Text>
              )}
            </View>
          </View>
          <View
            style={{
              height: 1.5,
              backgroundColor: '#E0E0E0',
              width: '100%',
              marginBottom: '5%',
            }}></View>
        </>
      ))}

      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: '5%',
        }}>
        <Image
          // resizeMethod="scale"
          style={{
            width: width * 0.2,
            height: width * 0.2,
            borderRadius: 100,
            // borderRadius: deviceSize * 0.0003,
          }}
          source={{
            uri: 'https://collageapi.s3.amazonaws.com/videos%2FFB_IMG_1619862199468.jpg',
          }}
          resizeMode="stretch"
        />
        <View style={{width: '70%', marginLeft: '5%'}}>
          <Text>
            <Text style={{fontWeight: 'bold'}}>Topic 1:</Text> thermal physics
            is quite interesting, just give it a try to really learn it.
          </Text>
          <Text
            style={{
              color: brandColor,
              fontWeight: 'bold',
              marginVertical: '2%',
            }}>
            Start class
          </Text>
        </View>
      </View> */}
      <View style={{marginTop: height * 0.1, alignItems: 'center'}}>
        <Text style={{color: 'grey'}}>Nothing more</Text>
      </View>
    </View>
  );
};

export default StudentLectureAccessCourseOutlineScreen;
