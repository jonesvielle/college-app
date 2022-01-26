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
import LinearGradient from 'react-native-linear-gradient';
import StudentLectureAccessCourseOutlineScreen from './studentLectureAccessCourseOutlineScreen';
import StudentLectureAccessDownloadsScreen from './studentLectureAccessDownloadsScreen';
import EmptyCourses from '../images/emptyCourses.png';
import DocumentPicker from 'react-native-document-picker';
import {RNS3} from 'react-native-aws3';
import {useNavigation} from '@react-navigation/core';

const StudentUploadQuestionsComponent = ({
  tutorId,
  authenticationToken,
  studentUniversity,
  lecture_id,
  // type,
  // answers,
}) => {
  const navigation = useNavigation();
  const [question, questionState] = useState('');
  const [answers, setAnswers] = useState([]);
  const [updateStates, setUpdateStates] = useState({});
  const [fileObject, setFileObject] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [fileType, setFileType] = useState('');
  const getData = () => {
    var config = {
      method: 'get',
      url:
        'http://collageapi.herokuapp.com/api/get_anwsers/' +
        lecture_id +
        '/' +
        authenticationToken +
        '/' +
        studentUniversity,
      headers: {},
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data.message));
        setAnswers(response.data.message.reverse());
        setUpdateStates({});
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // const handleUploadFileToS3 = (f) => {
  //   console.warn(f);
  //   const awsParams = awsOptions();
  //   RNS3.put(f, awsParams)
  //     .progress((e) => {
  //       setIsUploading(true);
  //       // console.log(e.loaded / e.total);
  //       console.log(Math.round((e.loaded * 100) / e.total));
  //     })
  //     .then((response) => {
  //       console.log('result', response);
  //       setIsUploading(false);
  //       questionState(response.body.postResponse.location);
  //       sendData(response.body.postResponse.location, f.name);
  //       getData();
  //       console.log(response.body.postResponse.location);
  //     })
  //     .catch((e) => {
  //       setIsUploading(false);
  //       console.warn(e);
  //       alert('something went wrong');
  //     });
  // };

  // const sendData = (qst, title) => {
  //   var data = JSON.stringify({
  //     token: authenticationToken,
  //     lecture_id: lecture_id,
  //     university: studentUniversity,
  //     question: qst,
  //     title: title,
  //     tutor_id: tutorId,
  //   });

  //   var config = {
  //     method: 'post',
  //     url: 'https://collageapi.herokuapp.com/api/ask_tutor/',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     data: data,
  //   };

  //   Axios(config)
  //     .then(function (response) {
  //       console.log(JSON.stringify(response.data));
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  // const handleUploadFile = async () => {
  //   try {
  //     const res = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.images],
  //     });
  //     console.log(res);
  //     const fileObj = {
  //       type: res.type,
  //       name: res.name,
  //       uri: res.uri,
  //     };
  //     setFileType(fileObj.type);
  //     // const awsParams = awsOptions(fileType);
  //     setFileObject(fileObj);

  //     setUpdateStates({});
  //     // console.warn(awsParams);
  //     handleUploadFileToS3(fileObj);
  //   } catch (error) {
  //     if (DocumentPicker.isCancel(error)) {
  //       console.warn('cancelled');
  //     } else {
  //       throw error;
  //     }
  //   }
  // };

  useEffect(() => {
    getData();
  }, []);
  if (answers.length < 1) {
    return (
      <View style={{backgroundColor: 'white'}}>
        <View
          style={{
            marginTop: '10%',
            alignItems: 'center',
            paddingHorizontal: '10%',
            backgroundColor: 'white',
            height: '100%',
          }}>
          <Image
            style={{
              width: width * 0.4,
              height: width * 0.4,
            }}
            source={EmptyCourses}
            resizeMode="center"
          />
          <Text style={{textAlign: 'center', color: 'grey'}}>
            You have not uploaded any assignment or AOC to be solved
          </Text>
        </View>
        {/* <Text>ggg</Text> */}
        {/* <View style={{alignItems: 'flex-end', marginTop: width * 0.2}}>
          <TouchableOpacity
            style={{
              backgroundColor: brandColor,
              padding: '10%',
              width: width * 0.1,
              borderRadius: width,
              marginRight: '15%',
              // marg
            }}>
            <Text>ok</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  } else {
    return (
      <View>
        {answers.map((c, i) => (
          <View
            key={i}
            style={{padding: '5%', flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="image" size={50} color={'grey'} />
            <View style={{marginLeft: '3%', width: '80%'}}>
              <Text style={{fontSize: dimension.fontScale * 17}}>
                {c.title}
              </Text>

              {c.answered ? (
                <Text
                  onPress={() => {
                    navigation.navigate('StudentAnswerScreen', {
                      answer: c.answer,
                    });
                  }}
                  style={{
                    color: brandColor,
                    fontWeight: 'bold',
                    marginTop: '3%',
                  }}>
                  Answered
                </Text>
              ) : (
                <Text
                  style={{color: 'grey', fontWeight: 'bold', marginTop: '3%'}}>
                  No Answer
                </Text>
              )}
            </View>
          </View>
        ))}

        {/* <View
          style={{padding: '5%', flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="image" size={50} color={'grey'} />
          <View style={{marginLeft: '3%'}}>
            <Text style={{fontSize: dimension.fontScale * 17}}>
              Assignment_pic from work
            </Text>
            <Text style={{color: 'grey'}}>Answered</Text>
          </View>
        </View> */}
        <View style={{marginTop: height * 0.1, alignItems: 'center'}}>
          <Text style={{color: 'grey'}}>Nothing more</Text>
        </View>
      </View>
    );
  }
};

export default StudentUploadQuestionsComponent;
