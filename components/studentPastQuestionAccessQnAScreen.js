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
import StudentLectureAccessDownloadsScreen from './studentLectureAccessDownloadsScreen';
import StudentUploadQuestionsComponent from './studentUploadQuestionsComponent';
import DocumentPicker from 'react-native-document-picker';
import {RNS3} from 'react-native-aws3';
import StudentPastQuestionAccessSolutionVideoComponent from './studentPastQuestionAccessSolutionVideoComponent';
import StudentPastQuestionAccessSolutionSheetScreen from './studentPastQuestionAccessSolutionSheetScreen';
import ButtonComponent from './buttonComponent';
import {useNavigation} from '@react-navigation/core';

// type,
// answers,
const StudentPastQuestionAccessQnAScreen = ({
  tutorId,
  authenticationToken,
  studentUniversity,
  lecture_id,
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
        console.log(JSON.stringify('anssss', response.data.message));
        setAnswers(response.data.message.reverse());
        setUpdateStates({});
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleUploadFileToS3 = (f) => {
    console.warn(f);
    const awsParams = awsOptions();
    RNS3.put(f, awsParams)
      .progress((e) => {
        setIsUploading(true);
        // console.log(e.loaded / e.total);
        console.log(Math.round((e.loaded * 100) / e.total));
      })
      .then((response) => {
        console.log('result', response);
        setIsUploading(false);
        questionState(response.body.postResponse.location);
        sendData(response.body.postResponse.location);
        getData();
        console.log(response.body.postResponse.location);
      })
      .catch((e) => {
        setIsUploading(false);
        console.warn(e);
        alert('something went wrong');
      });
  };

  const sendData = (qst) => {
    var data = JSON.stringify({
      token: authenticationToken,
      lecture_id: lecture_id,
      university: studentUniversity,
      question: qst,
      title: fileObject.name,
      tutor_id: tutorId,
    });

    var config = {
      method: 'post',
      url: 'https://collageapi.herokuapp.com/api/ask_tutor/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        ToastAndroid.show('Question sent to tutor', ToastAndroid.LONG);
      })
      .catch(function (error) {
        console.log('damn send data request === ', error);
        ToastAndroid.show(
          'Something went wrong,.. try again',
          ToastAndroid.LONG,
        );
      });
  };

  const handleUploadFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(res);
      const fileObj = {
        type: res.type,
        name: res.name,
        uri: res.uri,
      };
      setFileType(fileObj.type);
      // const awsParams = awsOptions(fileType);
      setFileObject(fileObj);

      setUpdateStates({});
      // console.warn(awsParams);
      handleUploadFileToS3(fileObj);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.warn('cancelled');
      } else {
        throw error;
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={{padding: '5%'}}>
      <View>
        <ButtonComponent
          onPress={handleUploadFile}
          buttonText={'Any challenges? upload it for the tutor'}
        />
      </View>
      {answers.map((c, i) => (
        <View
          key={i}
          style={{padding: '5%', flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="image" size={50} color={'grey'} />
          <View style={{marginLeft: '3%', width: '80%'}}>
            <Text style={{fontSize: dimension.fontScale * 17}}>{c.title}</Text>

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
};

export default StudentPastQuestionAccessQnAScreen;
