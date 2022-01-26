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

const CollegeVideoPlayerComponent = ({route, navigation}) => {
  const {thumbnail, preview_video} = route.params;
  const [videoPausedState, setVideoPausedState] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [showControl, setShowControl] = useState(true);
  const [showFullSceen, setShowFullScreen] = useState(true);

  const player = useRef(null);

  //   if (Orientation.getInitialOrientation() === 'LANDSCAPE') {
  //     // console.warn('landscape job');

  //   }
  //   Orientation.lockToPortrait();

  useEffect(() => {
    console.log(preview_video);
    setTimeout(() => {
      setShowControl(false);
    }, 3000);
  }, []);
  const handleShowFullScreen = () => {
    if (showFullSceen) {
      setShowControl(false);
    } else {
      setShowFullScreen(true);
    }
  };
  const handleShowControl = () => {
    if (showControl) {
      setShowControl(false);
      //   console.warn('hide');
    } else {
      setShowControl(true);
      //   console.warn('show');
      setTimeout(() => {
        setShowControl(false);
        // console.warn('hide');
      }, 6000);
    }
  };
  const handlePlay = () => {
    if (videoPausedState) {
      setVideoPausedState(false);
      player.current.seek(videoCurrentTime);
    } else {
      setVideoPausedState(true);
    }
  };
  const convertSecondsToTime = (num) => {
    const timeFormat = 60 % num;
    const timeFormatObject = {
      minute: Math.floor(num / 60),
      seconds: num % 60 < 10 ? '0' + (num % 60) : num % 60,
    };
    return timeFormatObject;
  };

  const seekVideoForward = (time) => {
    player.current.seek(videoCurrentTime + time);
  };

  const seekVideoBackward = (time) => {
    player.current.seek(videoCurrentTime - time);
  };
  //   console.log(videoCurrentTime / videoDuration);
  const screenOrientationHandler = () => {
    if (true) {
      return (
        <View
          activeOpacity={1}
          style={{
            height: height,
            width: height,
            backgroundColor: 'black',
            // justifyContent: 'center',
            alignItems: 'center',
            transform: [{rotate: '-90deg'}],
          }}>
          <View>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                width: height,
                height: width,
                backgroundColor: 'black',
                zIndex: showControl ? -1 : 1,
              }}
              //   onPress={() => {
              //     alert('ggg');
              //   }}
              onPress={handleShowControl}>
              <Video
                onEnd={() => {
                  setVideoCurrentTime(0);
                  setVideoPausedState(true);
                }}
                ref={player}
                // controls={true}
                // fullscreen={true}
                onProgress={(e) => {
                  //   console.log(e);
                  setVideoCurrentTime(e.currentTime);
                }}
                onLoad={(e) => {
                  // console.log(e);
                  setVideoDuration(e.duration);
                }}
                bufferConfig={{
                  minBufferMs: 1000,
                  maxBufferMs: 5000,
                  bufferForPlaybackMs: 2500,
                  bufferForPlaybackAfterRebufferMs: 3000,
                }}
                // onl
                // // controls={true}
                poster={thumbnail}
                posterResizeMode="contain"
                resizeMode="contain"
                paused={videoPausedState}
                source={{
                  uri: preview_video,
                }} // Can be a URL or a local file.
                // Store reference
                style={{
                  width: height,
                  height: width,
                  //   borderRadius: 10,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleShowControl}
              activeOpacity={1}
              style={{
                display: 'flex',
                position: 'absolute',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                height: width,
                width: height,
              }}>
              <View
                style={{
                  display: 'flex',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  //   height: height * 0.35,
                  width: '100%',
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  //   marginTop: '50%',
                  height: '100%',
                  // flexDirection: 'row',
                }}>
                <TouchableOpacity
                  //   onPress={handleShowControl}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: '20%',
                  }}>
                  <Ionicons
                    onPress={() => {
                      seekVideoBackward(10);
                    }}
                    name="reload-outline"
                    size={deviceSize * 0.00015}
                    color={'rgba(255, 255, 255, 1)'}
                    style={{transform: [{scaleX: -1}]}}
                  />
                  <View
                    style={{
                      width: width * 0.23,
                      height: width * 0.23,
                      backgroundColor: 'rgba(255, 255, 255, 0.4)',
                      borderRadius: deviceSize,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginHorizontal: '10%',
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
                      onPress={handlePlay}
                      name={videoPausedState ? 'play-circle' : 'pause-circle'}
                      size={deviceSize * 0.00024}
                      color={'rgba(255, 255, 255, 1)'}
                    />

                    {/* </View> */}
                  </View>

                  <Ionicons
                    onPress={() => {
                      seekVideoForward(10);
                    }}
                    name="reload-outline"
                    size={deviceSize * 0.00015}
                    color={'rgba(255, 255, 255, 1)'}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    width: height,
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: '2%',
                    justifyContent: 'space-between',
                    zIndex: 1,
                  }}>
                  <Text
                    style={{
                      width: '4%',
                      fontSize: dimension.fontScale * 13,
                      color: 'white',
                    }}>
                    {convertSecondsToTime(Math.floor(videoCurrentTime)).minute}:
                    {convertSecondsToTime(Math.floor(videoCurrentTime)).seconds}
                  </Text>
                  <View style={{width: '85%'}}>
                    {/* <Progress.Bar
                      progress={
                        videoDuration === 0 ? 0 : videoCurrentTime / videoDuration
                      }
                      width={width * 0.75}
                      color={brandColor}
                      height={4}
                    /> */}
                    <Slider
                      style={{width: '100%', height: 40}}
                      minimumValue={0}
                      maximumValue={1}
                      value={
                        videoDuration === 0
                          ? 0
                          : videoCurrentTime / videoDuration
                      }
                      minimumTrackTintColor={brandColor}
                      maximumTrackTintColor="#000000"
                      thumbTintColor={brandColor}
                      tapToSeek={true}
                      onValueChange={(e) => {
                        console.log(e);
                        // setVideoCurrentTime(e);
                        player.current.seek(e * videoDuration);
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      width: '4%',
                      fontSize: dimension.fontScale * 13,
                      color: 'white',
                    }}>
                    {convertSecondsToTime(Math.floor(videoDuration)).minute}:
                    {convertSecondsToTime(Math.floor(videoDuration)).seconds}
                  </Text>
                  {/* <Ionicons
                    onPress={handleShowFullScreen}
                    name="resize-outline"
                    size={deviceSize * 0.00009}
                    color={'rgba(255, 255, 255, 1)'}
                    style={{transform: [{scaleX: -1}], width: '5%'}}
                  /> */}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View
          activeOpacity={1}
          style={{
            height: height,
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{rotate: '360deg'}],
          }}>
          <>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                height: height * 0.35,
                backgroundColor: 'red',
                zIndex: showControl ? -1 : 1,
              }}
              //   onPress={() => {
              //     alert('ggg');
              //   }}
              onPress={handleShowControl}>
              <Video
                onEnd={() => {
                  setVideoCurrentTime(0);
                  setVideoPausedState(true);
                }}
                ref={player}
                // controls={true}
                // fullscreen={true}
                onProgress={(e) => {
                  //   console.log(e);
                  setVideoCurrentTime(e.currentTime);
                }}
                onLoad={(e) => {
                  // console.log(e);
                  setVideoDuration(e.duration);
                }}
                // onl
                // // controls={true}
                poster={thumbnail}
                posterResizeMode="stretch"
                resizeMode="stretch"
                paused={videoPausedState}
                source={{
                  uri: preview_video,
                }} // Can be a URL or a local file.
                // Store reference
                style={{
                  width: width,
                  height: height * 0.4,
                  //   borderRadius: 10,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleShowControl}
              activeOpacity={1}
              style={{
                display: 'flex',
                position: 'absolute',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                height: height * 0.4,
                width: '100%',
              }}>
              <View
                style={{
                  display: 'flex',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  //   height: height * 0.35,
                  width: '100%',
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  //   marginTop: '50%',
                  height: '100%',
                  // flexDirection: 'row',
                }}>
                <TouchableOpacity
                  //   onPress={handleShowControl}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: '25%',
                  }}>
                  <Ionicons
                    onPress={handlePlay}
                    name="reload-outline"
                    size={deviceSize * 0.00015}
                    color={'rgba(255, 255, 255, 1)'}
                    style={{transform: [{scaleX: -1}]}}
                  />
                  <View
                    style={{
                      width: width * 0.23,
                      height: width * 0.23,
                      backgroundColor: 'rgba(255, 255, 255, 0.4)',
                      borderRadius: deviceSize,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginHorizontal: '10%',
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
                      onPress={handlePlay}
                      name={videoPausedState ? 'play-circle' : 'pause-circle'}
                      size={deviceSize * 0.00024}
                      color={'rgba(255, 255, 255, 1)'}
                    />

                    {/* </View> */}
                  </View>

                  <Ionicons
                    onPress={handlePlay}
                    name="reload-outline"
                    size={deviceSize * 0.00015}
                    color={'rgba(255, 255, 255, 1)'}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: '2%',
                    justifyContent: 'space-between',
                    zIndex: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: dimension.fontScale * 13,
                      color: 'white',
                    }}>
                    {convertSecondsToTime(Math.floor(videoCurrentTime)).minute}:
                    {convertSecondsToTime(Math.floor(videoCurrentTime)).seconds}
                  </Text>
                  <View>
                    {/* <Progress.Bar
                      progress={
                        videoDuration === 0 ? 0 : videoCurrentTime / videoDuration
                      }
                      width={width * 0.75}
                      color={brandColor}
                      height={4}
                    /> */}
                    <Slider
                      style={{width: width * 0.75, height: 40}}
                      minimumValue={0}
                      maximumValue={1}
                      value={
                        videoDuration === 0
                          ? 0
                          : videoCurrentTime / videoDuration
                      }
                      minimumTrackTintColor={brandColor}
                      maximumTrackTintColor="#000000"
                      thumbTintColor={brandColor}
                      tapToSeek={true}
                      onValueChange={(e) => {
                        console.log(e);
                        // setVideoCurrentTime(e);
                        player.current.seek(e * videoDuration);
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: dimension.fontScale * 13,
                      color: 'white',
                    }}>
                    {convertSecondsToTime(Math.floor(videoDuration)).minute}:
                    {convertSecondsToTime(Math.floor(videoDuration)).seconds}
                  </Text>
                  <Ionicons
                    onPress={handleShowFullScreen}
                    name="resize-outline"
                    size={deviceSize * 0.00009}
                    color={'rgba(255, 255, 255, 1)'}
                    style={{transform: [{scaleX: -1}]}}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </>
        </View>
      );
    }
  };
  return (
    // <View style={{backgroundColor: 'red'}}>
    screenOrientationHandler()
    // </View>
  );
};

export default CollegeVideoPlayerComponent;
