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
// import {useNavigation} from '@react-navigation/core';
import ProgressCircle from 'react-native-progress-circle';
import RNFetchBlob from 'react-native-fetch-blob';
// const {getVideoDurationInSeconds} = require('get-video-duration');
import MediaMeta from 'react-native-media-meta';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';

const StudentPastQuestionAccessSolutionSheetScreen = ({
  //   route,
  courseOutline,
  //   navigation,
}) => {
  const navigation = useNavigation();
  return (
    <View style={{padding: '5%', marginTop: '2%'}}>
      {courseOutline.map((c, i) => (
        <>
          <TouchableOpacity
            key={i}
            onPress={() => {
              navigation.navigate('CollegePdfViewer', {file: c.file});
            }}
            activeOpacity={0.7}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '5%',
            }}>
            <Ionicons
              onPress={() => {
                // navigation.goBack();
                // alert('GGgg');
              }}
              name="receipt"
              size={30}
              color={'grey'}
            />
            <Text
              style={{fontSize: dimension.fontScale * 17, marginLeft: '3%'}}>
              SOLVING SHEET {i + 1}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: '100%',
              height: 2,
              backgroundColor: 'rgba(0,0,0,0.1)',
              marginVertical: '3%',
            }}></View>
        </>
      ))}
    </View>
  );
};

export default StudentPastQuestionAccessSolutionSheetScreen;
