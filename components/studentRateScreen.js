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
import StudentLectureAccessNoteScreen from './studentLectureAccessNoteScreen';
import StudentLectureAccessDownloadsScreen from './studentLectureAccessDownloadsScreen';
import StudentUploadQuestionsComponent from './studentUploadQuestionsComponent';
import DocumentPicker from 'react-native-document-picker';
import {RNS3} from 'react-native-aws3';
import RateImage from '../images/guyFist.png';
import TextInputComponent from './TextInputComponent';
import ButtonComponent from './buttonComponent';
// import {is} from '@babel/types';
// import Axios from 'axios';

const StudentRateScreen = ({route, navigation}) => {
  const {lecture_id, authenticationToken, type} = route.params;
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);
  const [active5, setActive5] = useState(false);
  const [ratings, setRatings] = useState(0);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleComment = (e) => {
    setComment(e);
  };

  const handleRating = () => {
    setIsLoading(true);
    if (comment.length < 1 || ratings < 1) {
      setIsLoading(false);
      ToastAndroid.show('please fill all required fields', ToastAndroid.LONG);
    } else {
      var data = JSON.stringify({
        rate: ratings,
        comment: comment,
        lecture_id: lecture_id,
        token: authenticationToken,
      });

      var config = {
        method: 'post',
        url:
          type === 'lectures'
            ? 'http://collageapi.herokuapp.com/api/rate_lecture/'
            : 'http://collageapi.herokuapp.com/api/rate_past_question/',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      Axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setIsLoading(false);
          setTimeout(() => {
            ToastAndroid.show('Thanks for your feedback', ToastAndroid.LONG);
          }, 2000);
          navigation.goBack();
        })
        .catch(function (error) {
          console.log(error);
          setIsLoading(false);
          ToastAndroid.show('Operation failed', ToastAndroid.LONG);
        });
    }
  };
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={{padding: '5%', backgroundColor: 'white'}}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <Image
            style={{
              width: width * 0.6,
              height: width * 0.6,
            }}
            source={RateImage}
            resizeMode="center"
          />
          <Text style={{fontSize: dimension.fontScale * 20}}>
            Course completed?
          </Text>
          <Text style={{marginTop: '5%', color: 'grey'}}>
            Please leave a rating
          </Text>
          <View style={{marginVertical: '10%', flexDirection: 'row'}}>
            <Ionicons
              onPress={() => {
                setActive1(true);
                setActive2(false);
                setActive3(false);
                setActive4(false);
                setActive5(false);
                setRatings(1);
              }}
              name={active1 ? 'star' : 'star-outline'}
              size={40}
              color={'#ffe234'}
              style={{marginHorizontal: '2%'}}
            />
            <Ionicons
              onPress={() => {
                setActive1(true);
                setActive2(true);
                setActive3(false);
                setActive4(false);
                setActive5(false);
                setRatings(2);
              }}
              name={active2 ? 'star' : 'star-outline'}
              size={40}
              color={'#ffe234'}
              style={{marginHorizontal: '2%'}}
            />
            <Ionicons
              onPress={() => {
                setActive1(true);
                setActive2(true);
                setActive3(true);
                setActive4(false);
                setActive5(false);
                setRatings(3);
              }}
              name={active3 ? 'star' : 'star-outline'}
              size={40}
              color={'#ffe234'}
              style={{marginHorizontal: '2%'}}
            />
            <Ionicons
              onPress={() => {
                setActive1(true);
                setActive2(true);
                setActive3(true);
                setActive4(true);
                setActive5(false);
                setRatings(4);
              }}
              name={active4 ? 'star' : 'star-outline'}
              size={40}
              color={'#ffe234'}
              style={{marginHorizontal: '2%'}}
            />
            <Ionicons
              onPress={() => {
                setActive1(true);
                setActive2(true);
                setActive3(true);
                setActive4(true);
                setActive5(true);
                setRatings(5);
              }}
              name={active5 ? 'star' : 'star-outline'}
              size={40}
              color={'#ffe234'}
              style={{marginHorizontal: '2%'}}
            />
          </View>
          <View style={{width: '100%'}}>
            <Text>Comment</Text>
          </View>
          <View>
            <TextInputComponent
              placeHolder={'Leave comments'}
              onChange={handleComment}
            />
          </View>
          <View style={{marginVertical: '20%'}}>
            <ButtonComponent
              buttonText="Rate"
              onPress={handleRating}
              isDisabled={isLoading}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default StudentRateScreen;
