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
import StudentLectureAccessCourseOutlineScreen from './studentLectureAccessCourseOutlineScreen';
import StudentLectureAccessDownloadsScreen from './studentLectureAccessDownloadsScreen';
import EmptyCourses from '../images/emptyCourses.png';
import DocumentPicker from 'react-native-document-picker';
import {RNS3} from 'react-native-aws3';

const StudentAnswerScreen = ({route, navigation}) => {
  const {answer} = route.params;
  return (
    <View style={{backgroundColor: 'white'}}>
      <Text
        style={{
          marginTop: height * 0.1,
          textAlign: 'center',
          fontSize: dimension.fontScale * 20,
          fontWeight: 'bold',
          color: brandColor,
        }}>
        Answer
      </Text>
      <Image
        // resizeMethod="scale"
        style={{
          width: width,
          height: height * 0.8,
          // borderRadius: deviceSize * 0.0003,
          zIndex: -1,
        }}
        source={{
          uri: answer,
        }}
        resizeMode="contain"
      />
    </View>
  );
};

export default StudentAnswerScreen;
