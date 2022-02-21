import React, {useEffect, useState} from 'react';
import {View, Image, ActivityIndicator} from 'react-native';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiDomain, dimension, errorHandler} from './modules';
import Brand from '../images/lot.png';
import TourScreen from './tourScreen';
import TutorTabComponent from './tutorTabComponent';
import StudentDrawerComponent from './studentTabComponent';

const OnBoardingScreen = ({navigation}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [authenticationToken, setAuthenticationToken] = useState('');
  const [userExist, setUserExist] = useState(false);
  const [componentKey, setComponentKey] = useState('fff');
  const [tokenExpired, setTokenExpired] = useState(false);
  const [isTutor, setIsTutor] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [tutorName, setTutorName] = useState('');
  const [tutorUniversity, setTutorUniversity] = useState('');
  const [tutorVerification, setTutorVerification] = useState('');
  const [tutorProfilePicture, setTutorProfilePicture] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentUniversity, setStudentUniversity] = useState('');
  const [studentVerification, setStudentVerification] = useState('');
  const [studentProfilePicture, setStudentProfilePicture] = useState('');
  const [studentDepartment, setStudentDepartment] = useState('');
  const [studentLevel, setStudentLevel] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [lectureAmount, setLectureAmount] = useState('');
  const [pastQuestionAmount, setPastQuestionAmount] = useState('');
  const [storedStudentId, setStoredStudentId] = useState('');

  // const deleteDownloads = async () => {
  //   try {
  //     await AsyncStorage.removeItem('@pastQuestions');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // deleteDownloads();

  useEffect(() => {
    // storeToken();
    // deleteToken();
    // retrieveToken();

    // const createVideoLocalStorage = async () => {
    //   try {
    //     await AsyncStorage.setItem('@lectures', JSON.stringify([]));
    //   } catch (error) {
    //     // Error saving data
    //   }
    // };
    // const createVideoLocalStorage1 = async () => {
    //   try {
    //     await AsyncStorage.setItem('@pastQuestions', JSON.stringify([]));
    //   } catch (error) {
    //     // Error saving data
    //   }
    // };
    // createVideoLocalStorage();
    // createVideoLocalStorage1();
    const retrieveToken = async () => {
      try {
        const value = await AsyncStorage.getItem('@authentication_token');
        console.log(value);
        if (value !== null) {
          // console.log(value);
          // setState(value);
          setAuthenticationToken(value);
          return value;
        } else {
          return null;
        }
      } catch (error) {
        console.log('error', error);
      }
    };

    const retrieveId = async () => {
      try {
        const value = await AsyncStorage.getItem('@student_id');
        console.log(value);
        if (value !== null) {
          // console.log(value);
          // setState(value);
          setStoredStudentId(value);
          return value;
        } else {
          return null;
        }
      } catch (error) {
        console.log('error', error);
      }
    };

    retrieveToken();
    retrieveId();
    console.log('ttk', authenticationToken);
    if (authenticationToken === null || authenticationToken === '') {
      setUserExist(false);
    } else {
      console.log('token exist', authenticationToken);
      setUserExist(true);
      setIsLoaded(false);
      // authentication request
      var data = JSON.stringify({
        token: authenticationToken,
        student_id: storedStudentId,
      });

      var config = {
        method: 'post',
        url: apiDomain + '/api/authenticate/',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      Axios(config)
        .then(function (response) {
          setIsLoaded(true);
          console.log('on message loging', response.data);
          setLectureAmount(response.data.lecture_amount);
          setPastQuestionAmount(response.data.past_question_amount);
          if (response.data.message.role === 'tutor') {
            // take to tutor tab
            // console.warn('tutor tab');
            setTutorName(response.data.message.full_name);
            setTutorUniversity(response.data.message.university);
            setTutorVerification(response.data.message.verified);
            setTutorProfilePicture(response.data.message.profile_picture);
            setIsTutor(true);
          } else if (response.data.message.role === 'student') {
            // take you to student tab
            // console.warn('student tab');
            setStudentName(response.data.message.full_name);
            setStudentUniversity(response.data.message.university);
            setStudentVerification(response.data.message.verified);
            setStudentProfilePicture(response.data.message.profile_picture);
            setStudentDepartment(response.data.message.department);
            setStudentLevel(response.data.message.level);
            setStudentEmail(response.data.message.email);
            setStudentId(response.data.message._id);
            setIsStudent(true);
          }
        })
        .catch(function (error) {
          // console.log(error.response.data);
          errorHandler(error);
          if (error.response === undefined) {
            // alert('no network');
            setIsLoaded(true);
            navigation.navigate('NoNetworkScreen');
          } else {
            // alert('handle the error');
            // errorHandler(error);
            setIsLoaded(true);
            console.log('with network', error.response.data);
            console.log(error);
            setTokenExpired(true);
          }
        });
    }
    // console.log('nav-', navigation);
  }, [authenticationToken]);
  return userExist && !tokenExpired ? (
    isTutor ? (
      <TutorTabComponent
        tutorName={tutorName}
        tutorUniversity={tutorUniversity}
        tutorVerification={tutorVerification}
        tutorProfilePicture={tutorProfilePicture}
        authenticationToken={authenticationToken}
        authenticationToken={authenticationToken}
        lectureAmount={lectureAmount}
        pastQuestionAmount={pastQuestionAmount}
      />
    ) : isStudent ? (
      <StudentDrawerComponent
        studentName={studentName}
        studentUniversity={studentUniversity}
        studentVerification={studentVerification}
        studentProfilePicture={studentProfilePicture}
        authenticationToken={authenticationToken}
        studentDepartment={studentDepartment}
        studentLevel={studentLevel}
        studentEmail={studentEmail}
        studentId={studentId}
        lectureAmount={lectureAmount}
        pastQuestionAmount={pastQuestionAmount}
      />
    ) : (
      <View
        style={{height: '100%', width: '100%', backgroundColor: '#fb3846'}}
        key={componentKey}>
        <View
          style={{
            width: '100%',
            height: dimension.height * 0.95,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'white',
          }}>
          <Image
            style={{
              width: dimension.width * 0.3,
              height: dimension.width * 0.3,
            }}
            source={Brand}
            resizeMode="center"
          />

          {isLoaded ? (
            <></>
          ) : (
            <ActivityIndicator color="white" size="large" animating={true} />
          )}
        </View>
      </View>
    )
  ) : (
    <TourScreen navigation={navigation} />
  );
};

export default OnBoardingScreen;
