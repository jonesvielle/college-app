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
  //   WebView,
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
import ProgressCircle from 'react-native-progress-circle';
// import RNFetchBlob from 'react-native-fetch-blob';
// const {getVideoDurationInSeconds} = require('get-video-duration');
// import MediaMeta from 'react-native-media-meta';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pdf from 'react-native-pdf';
// import {Pdf, PdfUtil} from 'react-native-pdf-light';
import Pd from '../images/Trigonometry_Short_Course_Tutorial_Lauren_Johnson.pdf';
// import WebView from 'react-native-webview';
// import PDFReader from 'rn-pdf-reader-js';

const CollegePdfViewer = ({route, navigation}) => {
  //   const [pdf, setPdf] = useState('');
  const {file} = route.params;
  const [updateStates, setUpdateStates] = useState({});

  const source = {
    uri: file,
    cache: true,
  };

  useEffect(() => {
    // pdfFile();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // marginTop: 25,
      }}>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link presse: ${uri}`);
        }}
        style={{
          flex: 1,
          width: width,
          height: height,
        }}
      />
    </View>
  );
};

export default CollegePdfViewer;
