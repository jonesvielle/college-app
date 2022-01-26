import React, {useState, useEffect} from 'react';
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
import CollegeVideoPlayerComponent from './collegeVideoPlayerComponent';
import MediaMeta from 'react-native-media-meta';
// const {getVideoDurationInSeconds} = require('get-video-duration');

const StudentPastQuestionDetailsScreen = ({route, navigation}) => {
  const {
    id,
    thumbnail,
    title,
    description,
    course_code,
    date,
    rating,
    course_outline,
    preview_video,
    studentEmail,
    studentId,
    studentUniversity,
    studentLevel,
    tutorId,
    authenticationToken,
    pastQuestionAmount,
  } = route.params;
  const [videoPausedState, setVideoPausedState] = useState(true);
  const [showControl, setShowControl] = useState(true);
  const handlePlayVideo = () => {
    navigation.navigate('CollegeVideoPlayerComponent', {
      preview_video,
      thumbnail,
    });
  };

  //   const course_outline = [];

  const handleSubscribe = () => {
    navigation.navigate('StudentPaymentScreen', {
      studentEmail,
      studentId,
      studentUniversity,
      studentLevel,
      tutorId,
      date,
      lectureId: id,
      authenticationToken,
      role: 'pastQuestion',
      amount: pastQuestionAmount,
    });
  };

  const handleAddToFavourites = () => {
    ToastAndroid.show('please wait...', ToastAndroid.LONG);
    // alert('ok');
    var data = JSON.stringify({
      token: authenticationToken,
      past_questions_id: id,
    });

    var config = {
      method: 'post',
      url: 'http://collageapi.herokuapp.com/api/add_past_questions_favourites/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        ToastAndroid.show('Added to favourites', ToastAndroid.LONG);
      })
      .catch(function (error) {
        console.log(error);
        ToastAndroid.show('Operation failed..., try again', ToastAndroid.LONG);
      });
  };

  //   const getVideoDuration = (path) => {
  //     getVideoDurationInSeconds(path).then((duration) => {
  //       console.log(duration);
  //     });
  //   };

  //   console.log(
  //     'duration',
  //     getVideoDuration(
  //       'https://collageapi.s3.amazonaws.com/videos%2FEminem+-+Godzilla.mp4',
  //     ),
  //   );
  //   console.log(D);
  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <ScrollView
        style={{padding: '5%', backgroundColor: 'white', marginBottom: '40%'}}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
              <Ionicons
                //   onPress={handleVideoPause}
                name="chevron-back-outline"
                size={30}
                color={'black'}
                style={{width: '10%'}}
              />
              <Text
                style={{
                  width: '80%',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: dimension.fontScale * 15,
                }}>
                Past Question Details
              </Text>
              <Ionicons
                //   onPress={handleVideoPause}
                name="share-social-outline"
                size={30}
                color={'black'}
                style={{width: '10%'}}
              />
            </View>
            <View
              style={{
                height: '100%',
                width: '100%',
                marginVertical: '5%',
                // alignItems: 'center',
                // justifyContent: 'center',
              }}>
              {/* <Text>fggggggggggg</Text> */}
              <View
                style={{
                  width: '100%',
                  height: '30%',
                  alignItems: 'center',
                  // backgroundColor: 'yellow',
                  borderRadius: 10,
                  //   marginVertical: '5%',
                }}>
                <Image
                  resizeMode="cover"
                  //   paused={true}
                  source={{
                    uri: thumbnail,
                  }} // Can be a URL or a local file.
                  //    ref={(ref) => {
                  //      this.player = ref
                  //    }}                                      // Store reference
                  //    onBuffer={this.onBuffer}                // Callback when remote video is buffering
                  //    onError={this.videoError}               // Callback when video cannot be loaded
                  style={{
                    width: '100%',
                    height: height * 0.35,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    height: height * 0.35,
                    width: '100%',
                    borderRadius: 10,
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      width: width * 0.3,
                      height: width * 0.3,
                      backgroundColor: 'rgba(255, 255, 255, 0.4)',
                      borderRadius: deviceSize,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {/* <View
              style={{
                width: width * 0.2,
                height: width * 0.2,
                backgroundColor: 'rgba(255, 255, 255, 1)',
                borderRadius: deviceSize,
                justifyContent: 'center',
                alignItems: 'center',
              }}> */}
                    <Ionicons
                      onPress={handlePlayVideo}
                      name="play-circle"
                      size={deviceSize * 0.00035}
                      color={'rgba(255, 255, 255, 1)'}
                    />

                    {/* </View> */}
                  </View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: dimension.fontScale * 15,
                    }}>
                    Preview course
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{backgroundColor: 'white', height: '100%'}}>
            <Text
              style={{
                marginTop: '0%',
                fontSize: dimension.fontScale * 20,
                fontWeight: 'bold',
              }}>
              {title}
            </Text>

            <Text
              style={{
                marginTop: '2%',
                fontSize: dimension.fontScale * 15,
                //   fontWeight: 'bold',
                color: 'grey',
              }}>
              3 Months subscription:{' '}
              <Text style={{fontWeight: 'bold', color: 'green'}}>
                ${(pastQuestionAmount / 500).toFixed(2)}
              </Text>
            </Text>
            <Text
              style={{
                marginTop: '2%',
                fontSize: dimension.fontScale * 15,
                //   fontWeight: 'bold',
                color: 'grey',
              }}>
              Course code:{' '}
              <Text style={{fontWeight: 'bold', color: 'black'}}>
                {course_code}
              </Text>
            </Text>
            <Text
              style={{
                marginTop: '2%',
                fontSize: dimension.fontScale * 15,
                //   fontWeight: 'bold',
                color: 'grey',
              }}>
              Date Uploaded:{' '}
              <Text style={{fontWeight: 'bold', color: 'black'}}>{date}</Text>
            </Text>
            <Text
              style={{
                marginTop: '2%',
                fontSize: dimension.fontScale * 15,
                //   fontWeight: 'bold',
                color: 'grey',
              }}>
              Rating:{' '}
              <Text style={{fontWeight: 'bold', color: 'black'}}>
                {rating}{' '}
                <Ionicons
                  name="star"
                  size={deviceSize * 0.00006}
                  color={'#FCAA11'}
                />
              </Text>
            </Text>
          </View>
          {/* <Text
            style={{
              marginTop: '10%',
              fontSize: dimension.fontScale * 20,
              fontWeight: 'bold',
              //   backgroundColor: 'red',
              color: 'black',
            }}>
            Student Ratings
          </Text> */}
        </View>
      </ScrollView>
      {/* <View style={{marginBottom: '30%'}}></View> */}
      <View
        style={{
          position: 'absolute',
          marginTop: height * 0.89,
          //   marginBottom: '10%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={handleAddToFavourites}
          style={{
            paddingVertical: '5%',
            paddingHorizontal: '5%',
            borderWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderColor: brandColor,
            width: '45%',
          }}>
          <Text style={{color: brandColor, fontWeight: 'bold'}}>
            Add to favourites
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubscribe}
          style={{
            paddingVertical: '5%',
            paddingHorizontal: '5%',
            borderWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: brandColor,
            borderColor: brandColor,
            width: '45%',
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Suscribe</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StudentPastQuestionDetailsScreen;
