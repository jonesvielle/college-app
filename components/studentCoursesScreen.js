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
import EmptyCourses from '../images/emptyCourses.png';
import StudentCoursesCardComponent from './studentCoursesCardComponent';
import StudentLectureCarouselCard from './studentLectureCarouselCard';
import StudentHeaderComponent from './studentHeaderComponent';

const StudentCoursesScreen = ({route, navigation}) => {
  const {
    university,
    authenticationToken,
    department,
    level,
    studentEmail,
    studentId,
    lectureAmount,
  } = route.params;
  const [lectures, setLectures] = useState([]);
  const [updateStates, setUpdateStates] = useState({});
  const lec = [
    {
      course_code: 'MEE521',
      course_outline: [
        {
          classObjectArray: [
            {
              classTitle: 'Class with the case',
              file: 'https://collageapi.s3.amazonaws.com/videos%2Fdownload+%283%29.jpeg',
              fileObject: {
                name: 'download (3).jpeg',
                type: 'image/jpeg',
                uri: 'content://com.android.providers.downloads.documents/document/6332',
              },
            },
            {
              classTitle: 'Another class title',
              file: 'https://collageapi.s3.amazonaws.com/videos%2Fdownload+%283%29.jpeg',
              fileObject: {
                name: 'download (3).jpeg',
                type: 'image/jpeg',
                uri: 'content://com.android.providers.downloads.documents/document/6332',
              },
            },
          ],
          courseTitle: 'An important title that you really need',
        },
        {
          classObjectArray: [
            {
              classTitle: ' this is a title',
              file: 'https://collageapi.s3.amazonaws.com/videos%2Fdownload+%283%29.jpeg',
            },
          ],
          courseTitle: 'Ok this is still a course title',
        },
      ],
      date: 'Thu, 23 Sep 2021 10:14:20 GMT',
      department: 'mechanical engineering',
      description: 'How can it go',
      faculty_name: 'technology',
      id: 'ee7b9f89659f4b7697a77e1bbfc037a6',
      level: '400',
      objective: ['Cours3 ob'],
      preview_video:
        'https://collageapi.s3.amazonaws.com/videos%2F218405503_519607079284781_1039139773137338970_n.mp4',
      rating: 0,
      thumbnail:
        'https://collageapi.s3.amazonaws.com/videos%2Fimages+-+2021-09-01T000444.589.jpeg',
      title: 'Another course title here',
      tutor_id: '1470a9f83c2e4e8aad5cdaf6a41b8ff4',
      university: 'fupre',
    },
    {
      course_code: 'MEE521',
      course_outline: [
        {
          classObjectArray: [
            {
              classTitle: 'Entry view time',
              file: 'https://collageapi.s3.amazonaws.com/videos%2F53774572_562054198546293_7754918304800798762_n.mp4',
              fileObject: {
                name: '53774572_562054198546293_7754918304800798762_n.mp4',
                type: 'video/mp4',
                uri: 'content://com.android.providers.downloads.documents/document/6342',
              },
            },
          ],
          courseTitle: 'Wonderful usage',
        },
      ],
      date: 'Thu, 23 Sep 2021 00:15:27 GMT',
      department: 'mechanical engineering',
      description: 'How to really use it well. Cool tho',
      faculty_name: 'technology',
      id: '710c1b83eb4c4ef1a7e143e572729bfb',
      level: '400',
      objective: [
        'Learn principles here',
        'Understand me na',
        'Learn new stuffs now',
      ],
      preview_video:
        'https://collageapi.s3.amazonaws.com/videos%2F10000000_1537185816631631_8997201231365129289_n.mp4',
      rating: 0,
      thumbnail:
        'https://collageapi.s3.amazonaws.com/videos%2Fimages+-+2021-09-11T131741.170.jpeg',
      title: 'Thermometer usage',
      tutor_id: '1470a9f83c2e4e8aad5cdaf6a41b8ff4',
      university: 'fupre',
    },
  ];
  const getData = () => {
    Axios({
      method: 'post',
      url: 'https://collageapi.herokuapp.com/api/get_lectures_student_full/none',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        token: authenticationToken,
        page_size: 10000,
        university: university,
        department: department,
        level: level,
      }),
    })
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setLectures(response.data.data);
        setUpdateStates({});
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const renderItem = ({item}) => (
    <StudentCoursesCardComponent
      route={route}
      navigation={navigation}
      date={item.date}
      title={item.title}
      course_code={item.course_code}
      thumbnail={item.thumbnail}
      id={item.id}
      rating={item.rating}
      tutorProfilePicture={item.tutor_profile_picture}
      tutorName={item.tutor_name}
      preview_video={item.preview_video}
      course_outline={item.course_outline}
      description={item.description}
      studentEmail={studentEmail}
      studentId={studentId}
      studentUniversity={university}
      studentLevel={level}
      tutorId={item.tutor_id}
      authenticationToken={authenticationToken}
      lectureAmount={lectureAmount}
    />
  );
  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: 'white',
          height: height,
          padding: '5%',
          width: width,
        }}>
        <StudentHeaderComponent
          title="All courses"
          onPressSearch={() => {
            navigation.navigate('StudentSearchScreen', {
              studentUniversity: university,
              studentDepartment: department,
              studentEmail,
              studentId,
              studentLevel: level,
              authenticationToken,
              lectureAmount,
            });
          }}
        />
        {/* <FlatList
        style={{marginTop: '10%'}}
        data={lectures}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        // horizontal={true}
      /> */}
        {lectures < 1 ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: height * 0.5,
            }}>
            <Image
              style={{
                width: width * 0.4,
                height: width * 0.4,
              }}
              source={EmptyCourses}
              resizeMode="center"
            />
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text>Fetching...</Text>
              </View>
            </View>
          </View>
        ) : (
          <FlatList
            style={{marginTop: '10%'}}
            data={lectures}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            // horizontal={true}
          />
        )}
        {/* <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddLecturesScreen', {
            university,
            authenticationToken,
          });
        }}
        style={{
          position: 'absolute',
          padding: '4%',
          backgroundColor: brandColor,
          // width: width * 0.2,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: height * 0.8,
          borderRadius: deviceSize * 0.3,
          marginLeft: '80%',
          shadowColor: brandColor,
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.41,
          shadowRadius: 9.11,

          elevation: 5,
        }}>
        <Ionicons name="add" size={deviceSize * 0.0001} color={'white'} />
      </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
};

export default StudentCoursesScreen;
