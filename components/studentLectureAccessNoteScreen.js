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
import ButtonComponent from './buttonComponent';
import TextInputComponent from './TextInputComponent';

const StudentLectureAccessNoteScreen = () => {
  return (
    <View style={{padding: '5%', backgroundColor: 'white'}}>
      {/* <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
          flexDirection: 'row',
          width: '100%',
        }}>
        <View
          style={{
            width: '80%',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'blue',
          }}>
          <TextInputComponent
            multiline={true}
            placeHolder={'Add notes here...'}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor: brandColor,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            padding: '3.5%',
          }}>
          <Ionicons
            name="add"
            size={dimension.fontScale * 30}
            color={'white'}
          />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default StudentLectureAccessNoteScreen;
