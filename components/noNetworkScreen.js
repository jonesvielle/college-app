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
import EmptyCourses from '../images/cryGirl.png';
import ButtonComponent from './buttonComponent';

const NoNetworkScreen = ({route, navigation}) => {
  return (
    <ScrollView>
      <View style={{padding: '5%', height: height, backgroundColor: 'white'}}>
        <View style={{marginTop: '30%'}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: height * 0.2,
            }}>
            <Image
              style={{
                width: width * 0.6,
                height: width * 0.6,
              }}
              source={EmptyCourses}
              resizeMode="center"
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '10%',
              }}>
              <Text
                style={{
                  fontSize: dimension.fontScale * 20,
                  fontWeight: 'bold',
                }}>
                You are offline
              </Text>
              <Text
                style={{
                  color: 'grey',
                  width: width * 0.6,
                  //   backgroundColor: 'red',
                  textAlign: 'center',
                }}>
                Watch downloads without internet connection
              </Text>
            </View>
          </View>
        </View>
        <View style={{marginTop: height * 0.2}}>
          <ButtonComponent
            buttonText="Go to Downloads"
            onPress={() => {
              navigation.navigate('StudentDownloadScreen');
            }}
          />
        </View>
      </View>
      {/* </View> */}
    </ScrollView>
  );
};

export default NoNetworkScreen;
