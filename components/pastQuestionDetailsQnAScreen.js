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
import {ScrollView} from 'react-native-gesture-handler';
import PastQuestionDetailsOverviewScreen from './PastQuestionDetailsOverviewScreen';
import PastQuestionDetailsReviewScreen from './pastQuestionDetailsReviewScreen';
import PastQuestionDetailsSolutionScreen from './PastQuestionDetailsSolutionScreen';
import ScrollableTabView, {
  // DefaultTabBar,
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view-forked';
import DocumentPicker from 'react-native-document-picker';
import {RNS3} from 'react-native-aws3';

const PastQuestionDetailsQnAScreen = ({authenticationToken, lectureId}) => {
  const [questions, setQuestions] = useState([]);
  const [updateStates, setUpdateStates] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [fileObject, setFileObject] = useState({});
  const [fileType, setFileType] = useState('');
  const [answer, setAnswer] = useState('');
  const getData = () => {
    var data = JSON.stringify({
      token: authenticationToken,
      lecture_id: lectureId,
    });

    var config = {
      method: 'post',
      url: 'http://collageapi.herokuapp.com/api/tutor_get_questions/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setQuestions(response.data.message);
        setUpdateStates({});
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleUploadFileToS3 = (f, question, tutor_id) => {
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
        setAnswer(response.body.postResponse.location);
        sendData(response.body.postResponse.location, question, tutor_id);
        getData();
        console.log(response.body.postResponse.location);
      })
      .catch((e) => {
        setIsUploading(false);
        console.warn(e);
        alert('something went wrong');
      });
  };

  const sendData = (answer, question, student_id, tutor_id) => {
    var data = JSON.stringify({
      // token: authenticationToken,
      lecture_id: lectureId,
      // university: ,
      answer: answer,
      student_id: student_id,
      tutor_id: tutor_id,
      question: question,
    });

    var config = {
      method: 'post',
      url: 'https://collageapi.herokuapp.com/api/answer_questions/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert('successfully answered');
      })
      .catch(function (error) {
        console.log(error);
        alert('something went wrong');
      });
  };

  const handleUploadFile = async (question, student_id, tutor_id) => {
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
      handleUploadFileToS3(fileObj, question, student_id, tutor_id);
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
    <View style={{paddingVertical: '5%'}}>
      {questions.reverse().map((c, i) => (
        <View>
          <Text
            style={{
              fontSize: dimension.fontScale * 17,
              fontWeight: 'bold',
              marginVertical: '2%',
            }}>
            {c.title}
          </Text>
          <Text style={{fontSize: dimension.fontScale * 15, color: 'grey'}}>
            {c.question}
          </Text>
          {c.answered ? (
            <Text
              style={{
                marginVertical: '2%',
                fontWeight: 'bold',
                fontSize: dimension.fontScale * 17,
                color: 'grey',
              }}>
              Answered
            </Text>
          ) : (
            <Text
              onPress={() => {
                handleUploadFile(c.question, c.student_id, c.tutor_id);
              }}
              style={{
                marginVertical: '2%',
                fontWeight: 'bold',
                fontSize: dimension.fontScale * 17,
                color: brandColor,
              }}>
              Answer
            </Text>
          )}
          <View
            style={{
              backgroundColor: 'rgb(214, 214, 214)',
              height: height * 0.002,
              width: '100%',
              marginVertical: '5%',
            }}></View>
        </View>
      ))}
    </View>
  );
};

export default PastQuestionDetailsQnAScreen;
