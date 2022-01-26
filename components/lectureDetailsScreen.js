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
// import {HScrollView} from 'react-native-head-tab-view';
// import {CollapsibleHeaderTabView} from 'react-native-scrollable-tab-view-collapsible-header/';
// import {TabView, SceneMap} from 'react-native-tab-view';
// import {ScrollableTabView} from '@valdio/react-native-scrollable-tabview';
// import {
//   TabViewAnimated,
//   TabViewPagerScroll,
//   TabViewPagerPan,
//   TabBar,
// } from 'react-native-tab-view';
// const DefaultScreen = () => (
//   <View
//     flex={1}
//     py={20}
//     alignItems="center"
//     justifyContent="center"
//     bg="background">
//     <ActivityIndicator size="large" color="white" animating />
//   </View>
// );

// var ScrollableTabView = require('react-native-scrollable-tab-view');
// const renderScene = SceneMap({
//   first: LectureDetailOutlineScreen,
//   second: LectureDetailsOverviewScreen,
// });
const LectureDetailsScreen = ({route, navigation}) => {
  const {id, authenticationToken} = route.params;
  const [videoPaused, setVideoPaused] = useState(true);
  const [onLoadProp, setOnloadProp] = useState(0);
  const [updateStates, setUpdateStates] = useState({});
  const [description, setDescription] = useState('');
  const [objective, setObjectve] = useState([]);
  const [courseOutline, setCourseOutline] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [activeTab, setActiveTab] = useState('Overview'); //your default (first) tab

  // const [updateStates, setUpdateStates] = useState({});
  const [courseDetails, setCourseDetails] = useState('');
  const fetchCourseDetails = () => {
    // var axios = require('axios');
    var data = JSON.stringify({
      lecture_id: id,
    });

    var config = {
      method: 'post',
      url: 'http://collageapi.herokuapp.com/api/view_lecture/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data.message));
        setCourseDetails(response.data.message);
        setDescription(response.data.message.description);
        setObjectve(response.data.message.objective);
        setCourseOutline(response.data.message.course_outline);
        setIsLoading(false);
        setUpdateStates({});
        // navigation.navigate('LectureDetailsScreen');
        // console.log(navigation);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  // // const Tab = createMaterialTopTabNavigator();
  // const layout = useWindowDimensions();
  // const [index, setIndex] = useState(0);
  // const [routes] = useState([
  //   {
  //     key: 'first',
  //     title: 'Overview',
  //   },
  //   {
  //     key: 'second',
  //     title: 'Outline',
  //   },
  // ]);

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const handleVideoPlay = () => {
    setVideoPaused(false);
  };
  const handleVideoPause = () => {
    setVideoPaused(true);
  };

  return (
    <View
      style={{
        padding: '5%',
        backgroundColor: 'white',
        // flex: 1,
        // height: height,
        // width: '10%',
      }}>
      {/* <LectureDetailsOverviewScreen /> */}
      <ScrollView
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            // alert('end');
          }
        }}
        scrollEventThrottle={400}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={200}
        directionalLockEnabled={true}
        style={{backgroundColor: 'white'}}
        contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: width * 0.6,
            justifyContent: 'space-between',
            // backgroundColor: 'green',
            // height: 100,
          }}>
          <Ionicons
            onPress={() => {
              navigation.goBack();
              // alert('GGgg');
            }}
            name="arrow-back"
            size={deviceSize * 0.0001}
            color={'black'}
          />
          <Text style={{fontSize: dimension.fontScale * 20}}>
            Course Details
          </Text>
        </View>
        {videoPaused ? (
          <View
            style={{
              width: '100%',
              height: height * 0.3,
              alignItems: 'center',
              // backgroundColor: 'yellow',
              borderRadius: 10,
              marginVertical: '10%',
            }}>
            <Image
              resizeMode="cover"
              //   paused={true}
              source={{
                uri: courseDetails.thumbnail,
              }} // Can be a URL or a local file.
              //    ref={(ref) => {
              //      this.player = ref
              //    }}                                      // Store reference
              //    onBuffer={this.onBuffer}                // Callback when remote video is buffering
              //    onError={this.videoError}               // Callback when video cannot be loaded
              style={{width: '100%', height: height * 0.35, borderRadius: 10}}
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
                  onPress={handleVideoPlay}
                  name="play-circle"
                  size={deviceSize * 0.00035}
                  color={'rgba(255, 255, 255, 1)'}
                />

                {/* </View> */}
              </View>
              <Text
                style={{color: 'white', fontSize: dimension.fontScale * 15}}>
                Preview course
              </Text>
            </View>
          </View>
        ) : (
          <View
            style={{
              width: '100%',
              height: height * 0.35,
              alignItems: 'center',
              // backgroundColor: 'yellow',
              borderRadius: 10,
              marginVertical: '10%',
            }}>
            <>
              <Video
                poster={courseDetails.thumbnail}
                posterResizeMode="stretch"
                onReadyForDisplay={(e) => {
                  console.log(e);
                  setOnloadProp(e);
                  setUpdateStates({});
                  console.log(onLoadProp);
                }}
                resizeMode="cover"
                paused={videoPaused}
                source={{
                  uri: courseDetails.preview_video,
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
              {console.log('in work', onLoadProp)}
              {onLoadProp === null ? (
                console.warn('loading')
              ) : (
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
                      onPress={handleVideoPause}
                      name="pause"
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
              )}
            </>
          </View>
        )}
        {/* <LectureDetailsOverviewScreen /> */}
        <View
          // onLayout={(e) => {
          //   const {x, y, width, height} = e.nativeEvent.layout;
          //   console.warn(height);
          // }}
          style={{
            // display: 'flex',
            // flexGrow: 1,
            // flex: 1,
            width: '100%',
            // backgroundColor: 'blue',
            height: 1500,
            // flexGrow: 1,
          }}>
          <ScrollableTabView
            renderTabBar={() => (
              <ScrollableTabBar
                style={styles.scrollStyle}
                tabStyle={styles.tabStyle}
              />
            )}
            tabBarTextStyle={styles.tabBarTextStyle}
            tabBarInactiveTextColor={'black'}
            tabBarActiveTextColor={brandColor}
            tabBarUnderlineStyle={styles.underlineStyle}
            initialPage={0}>
            <LectureDetailsOverviewScreen
              tabLabel={'Overview'}
              key={'1'}
              title={courseDetails.title}
              courseCode={courseDetails.course_code}
              date={courseDetails.date}
              description={description}
              objective={objective}
              isLoading={isLoading}
            />
            <LectureDetailOutlineScreen
              tabLabel={'Outline'}
              key={'2'}
              courseOutline={courseOutline}
              isLoading={isLoading}
            />
            {/* <LecturesDetailsReviewScreen tabLabel={'Reviews'} key={'3'} /> */}
            <LectureDetailsQandAScreen
              tabLabel={'Q&A'}
              key={'4'}
              authenticationToken={authenticationToken}
              lectureId={id}
              // university={tutorUniversity}
            />
            {/* <View
              key={'2'}
              tabLabel={'second tab'}
              style={{flex: 1, backgroundColor: 'blue'}}
            />
            <View
              key={'3'}
              tabLabel={'third tab'}
              style={{flex: 1, backgroundColor: 'yellow'}}
            /> */}
          </ScrollableTabView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabStyle: {},
  scrollStyle: {
    backgroundColor: 'white',
    paddingHorizontal: '0%',
    // height: 1000,
    // width: 200,
    // justifyContent: 'center',
  },
  tabBarTextStyle: {
    fontSize: dimension.fontScale * 15,
    fontWeight: 'normal',
  },
  underlineStyle: {
    height: 3,
    backgroundColor: brandColor,
    borderRadius: 3,
    width: '20%',
  },
});

export default LectureDetailsScreen;
