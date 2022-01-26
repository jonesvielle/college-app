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

const StudentLectureAccessCourseOutlineScreen = ({
  courseOutline,
  title,
  numberOfTopics,
  thumbnail,
}) => {
  //   const [courseOutline, setCourseOutline] = useState([]);

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

  return (
    <View style={{padding: '5%', backgroundColor: 'white'}}>
      {courseOutline.map((c, i) => (
        <View
          key={i}
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
              uri: thumbnail,
            }}
            resizeMode="stretch"
          />
          <View style={{width: '70%', marginLeft: '5%'}}>
            <Text>
              <Text style={{fontWeight: 'bold'}}>Topic {i + 1}:</Text>{' '}
              {c.courseTitle}
            </Text>
            <Text
              onPress={() => {
                handleAccessCourseOutline(
                  i + 1,
                  c.classObjectArray,
                  c.courseTitle,
                );
              }}
              style={{
                color: brandColor,
                fontWeight: 'bold',
                marginVertical: '2%',
              }}>
              Start class
            </Text>
          </View>
        </View>
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
    </View>
  );
};

export default StudentLectureAccessCourseOutlineScreen;
