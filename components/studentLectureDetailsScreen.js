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
  Animated,
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
  apiDomain,
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
import FocusAwareStatusBar from './FocuseAwareStatusBar';
import BackButtonComponent from './backButtonComponent';
import moment from 'moment';
import VideoFile from '../images/videoFile.png';
// const {getVideoDurationInSeconds} = require('get-video-duration');

const StudentLectureDetailsScreen = ({route, navigation}) => {
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
    lectureAmount,
  } = route.params;
  const formattedDate = new Date(date);
  const [videoPausedState, setVideoPausedState] = useState(true);
  const [showControl, setShowControl] = useState(true);
  const [accordionHeight, setAccordionHeight] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [ratings, setRatings] = useState([]);
  const handlePlayVideo = () => {
    navigation.navigate('CollegeVideoPlayerComponent', {
      preview_video,
      thumbnail,
    });
  };

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
      role: 'lecture',
      amount: lectureAmount,
    });
  };

  // const accordionHeight = useRef(new Animated.Value(0)).current;

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
  const handleAddToFavourites = () => {
    ToastAndroid.show('please wait...', ToastAndroid.LONG);
    // alert('ok');
    var data = JSON.stringify({
      token: authenticationToken,
      lecture_id: id,
    });

    var config = {
      method: 'post',
      url: apiDomain + '/api/add_lecture_favourites/',
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
  const handleAccordion = (index) => {
    if (accordionHeight === '100%') {
      setAccordionHeight(0);
      setActiveAccordion(index);
    } else {
      setAccordionHeight('100%');
      setActiveAccordion(index);
    }
    setActiveAccordion(index);
  };

  const getRatings = () => {
    var data = JSON.stringify({
      lecture_id: id,
    });

    var config = {
      method: 'post',
      url: apiDomain + '/api/get_ratings/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setRatings(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getStars = (length) => {
    let arr = new Array(length);
    [7, 7].map((c, i) => (
      <Ionicons
        key={i}
        name="star"
        size={deviceSize * 0.00006}
        color={'#FCAA11'}
      />
    ));
  };

  useEffect(() => {
    getRatings();
  }, []);
  return (
    <View style={{backgroundColor: 'white', paddingBottom: '10%'}}>
      <FocusAwareStatusBar
        currentHeight={0}
        translucent={false}
        backgroundColor={brandColor}
      />
      <ScrollView
        style={{padding: '5%', backgroundColor: 'white', marginBottom: '15%'}}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                justifyContent: 'space-between',
              }}>
              <View>
                <BackButtonComponent />
              </View>
              <Text
                style={{
                  width: '80%',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: dimension.fontScale * 15,
                }}>
                Course Details
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
          <Text
            style={{
              marginTop: '5%',
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
            {description}
          </Text>
          <Text
            style={{
              marginTop: '2%',
              fontSize: dimension.fontScale * 15,
              //   fontWeight: 'bold',
              color: 'grey',
            }}>
            Monthly subscription:{' '}
            <Text style={{fontWeight: 'bold', color: 'green'}}>
              ${(lectureAmount / 500).toFixed(2)}
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
            Date:{' '}
            <Text style={{fontWeight: 'bold', color: 'black'}}>
              {moment(formattedDate).format('DD MMM YYYY')}
            </Text>
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
          <Text
            style={{
              marginTop: '10%',
              fontSize: dimension.fontScale * 20,
              fontWeight: 'bold',
            }}>
            Curriculum
          </Text>
          {course_outline.map((c, i) => (
            <View
              key={i}
              style={{
                flexDirection: 'row',
                marginTop: '5%',
                marginBottom: '5%',
                //   justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: dimension.fontScale * 15,
                  width: '10%',
                  fontWeight: 'bold',
                }}>
                {String(i).length > 1 ? i + 1 : String(0) + (i + 1)}
              </Text>
              <View style={{width: '83%'}}>
                <Text
                  onPress={() => {
                    handleAccordion(i);
                    handleAccordion(i);
                  }}
                  style={{
                    fontSize: dimension.fontScale * 15,
                    fontWeight: 'bold',
                    // transform: [{scaleY: 1}],
                    // backgroundColor: 'red',
                  }}>
                  {c.title}
                </Text>

                <Text
                  style={{fontSize: dimension.fontScale * 15, color: 'grey'}}>
                  {moment
                    .utc(
                      c.class
                        .map((j) => j.videoLength)
                        .reduce((prev, curr) => prev + curr, 0) * 1000,
                    )
                    .format('mm:ss')}
                </Text>
                {accordionHeight === '100%' && activeAccordion === i ? (
                  <View
                    style={{
                      backgroundColor: 'transparent',
                      // height: '100%',
                    }}>
                    {c.class.map((j, k) => (
                      <Animated.View
                        key={k}
                        style={{
                          flexDirection: 'row',
                          marginTop: '5%',
                          marginLeft: '0%',
                          // height: 0,
                          //   justifyContent: 'space-between',
                          // height: '100%',
                          // backgroundColor: 'red',
                          // transform: [{scaleY: 0}],
                        }}>
                        <View
                          style={{
                            width: '80%',
                            flexDirection: 'row',
                            width: '100%',
                            // height: 0,
                            // backgroundColor: 'r',
                            // transform: [{scaleY: 0}],
                          }}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: j.free ? 'black' : 'rgba(0,0,0,0.2)',
                              width: '10%',
                              textAlign: 'center',
                              fontSize: dimension.fontScale * 13,
                            }}>
                            {k + 1}
                          </Text>
                          <TouchableOpacity
                            activeOpacity={0.9}
                            style={{width: '90%'}}
                            onPress={
                              j.free
                                ? () => {
                                    console.log('ok');
                                    navigation.navigate(
                                      'CollegeVideoPlayerComponent',
                                      {
                                        preview_video: j.file,
                                        thumbnail,
                                      },
                                    );
                                  }
                                : () => {
                                    console.log('not free');
                                    ToastAndroid.show(
                                      'SUBSCRIBE TO GET ACCESS TO ALL CONTENTS',
                                      ToastAndroid.SHORT,
                                    );
                                  }
                            }>
                            <Text
                              style={{
                                fontSize: dimension.fontScale * 13,
                                color: j.free ? 'black' : 'rgba(0,0,0,0.2)',
                                fontWeight: 'bold',
                                // height: '100%',
                              }}>
                              {j.classTitle}
                            </Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                // height: 0,
                              }}>
                              <Image
                                // resizeMethod="scale"
                                style={{
                                  width: width * 0.04,
                                  height: width * 0.04,
                                  // borderRadius: deviceSize,
                                }}
                                source={VideoFile}
                                // resizeMode="stretch"
                              />
                              <Text
                                style={{
                                  fontSize: dimension.fontScale * 13,
                                  color: 'grey',
                                  marginTop: '1%',
                                  marginLeft: '3%',
                                  height: accordionHeight,
                                }}>
                                {moment(j.videoLength * 1000).format('mm:ss')}
                                {/* {j.videoLength} */}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </Animated.View>
                    ))}
                  </View>
                ) : (
                  <></>
                )}
              </View>
              {/* <Text> */}
              <Ionicons
                //   onPress={handleVideoPause}
                name={
                  accordionHeight === '100%' && activeAccordion === i
                    ? 'remove-outline'
                    : 'add-outline'
                }
                size={20}
                color={brandColor}
                style={{width: '5%'}}
              />
              {/* </Text> */}
            </View>
          ))}
        </View>
        <View style={{marginVertical: '10%'}}>
          {/* Ratings array */}
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: dimension.fontScale * 17,
              marginTop: '5%',
            }}>
            Students Ratings
          </Text>
          {ratings.map((c, i) => (
            <View style={{marginTop: '5%'}} key={i}>
              <Text>{c.comment}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // backgroundColor: 'red',
                }}>
                <Text style={{marginTop: '5%', color: 'grey'}}>
                  {c.student_name}
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    // backgroundColor: 'green',
                    marginTop: '5%',
                    marginLeft: '5%',
                  }}>
                  {/* {const arr = new Array(7)} */}
                  {new Array(c.rate).fill(0).map((c, i) => (
                    <Ionicons
                      key={i}
                      name="star"
                      size={deviceSize * 0.00006}
                      color={'#FCAA11'}
                    />
                  ))}
                  {/* {getStars(3)} */}
                </View>
              </View>

              <View
                style={{
                  height: height * 0.001,
                  backgroundColor: 'grey',
                  marginTop: '5%',
                }}></View>
            </View>
          ))}
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
          backgroundColor: 'white',
          padding: '5%',
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

export default StudentLectureDetailsScreen;
