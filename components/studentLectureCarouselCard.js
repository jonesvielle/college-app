import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  FlatList,
  ToastAndroid,
} from 'react-native';
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
  errorHandler,
  apiDomain,
} from './modules';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Picker} from '@react-native-picker/picker';
import TutorActiveImage from '../images/tutorActive.png';
import TutorInactiveImage from '../images/tutorInactive.png';
import StudentActiveImage from '../images/studentActive.png';
import StudentInactiveImage from '../images/studentInactive.png';
import LoginAsTutorImage from '../images/lot.png';
import Emoji from '../images/mem.png';
import UploadImage from '../images/uploadImage.png';
import Nigeria from '../images/nigeria.png';
import LoginAsComponent from './signUpAsComponent';
import TextInputComponent from './TextInputComponent';
import ButtonComponent from './buttonComponent';
import PickerComponent from './pickerComponent';
import Axios from 'axios';
// import axios from 'axios';
import DocumentPicker from 'react-native-document-picker';
import {RNS3} from 'react-native-aws3';
import BackButtonComponent from './backButtonComponent';
import Brand from '../images/lot.png';
import EmptyCourses from '../images/emptyCourses.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TutorHeaderComponent from './tutorHeaderComponent';
import axios from 'axios';
import {useNavigation} from '@react-navigation/core';
import ProcessComponent from './processComponent';

const StudentLectureCarouselCard = ({
  //   route,
  title,
  course_code,
  thumbnail,
  id,
  rating,
  date,
  tutorName,
  tutorProfilePicture,
  navigation,
  preview_video,
  course_outline,
  description,
  studentEmail,
  studentId,
  studentUniversity,
  studentLevel,
  tutorId,
  authenticationToken,
  lectureAmount,
  //   navigation,
}) => {
  const [showModal, setShowModal] = useState(false);
  // const navigation = useNavigation();
  const checkSubscription = () => {
    setShowModal(true);
    // console.log('id,', id);
    var data = JSON.stringify({
      token: authenticationToken,
      lecture_id: id,
    });

    var config = {
      method: 'post',
      url: apiDomain + '/api/check_lecture_subscription/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data.message));
        setShowModal(false);
        // handleSubscribe();
        navigation.navigate('StudentLectureAccessScreen', {
          lecture_id: id,
          tutorId,
          authenticationToken,
          studentUniversity,
        });
      })
      .catch(function (error) {
        setShowModal(false);
        // console.log('error', error.response.data.message);
        errorHandler(error);
        if (
          errorHandler(error) === 'subscription does not exist'.toUpperCase() ||
          errorHandler(error) === 'subscription expired'.toUpperCase()
        ) {
          console.log();
          navigation.navigate('StudentLectureDetailsScreen', {
            id,
            thumbnail,
            title,
            course_code,
            date,
            rating,
            preview_video,
            course_outline,
            description,
            studentEmail,
            studentId,
            studentUniversity,
            studentLevel,
            tutorId,
            authenticationToken,
            lectureAmount,
          });
        } else {
          errorHandler(error);
        }
      });
  };
  return (
    <TouchableOpacity
      onPress={checkSubscription}
      // onPress={}
      style={{
        // backgroundColor: '#f9c2ff',
        height: height * 0.3,
        width: width * 0.7,
        // paddingRight: '1%',
        paddingRight: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        // marginHorizontal: '2%',
      }}>
      {/* <View style={{width: '80%'}}> */}
      <ProcessComponent
        showModal={showModal}
        text={'Please wait, validating...'}
      />
      <View style={{width: '100%', height: height * 0.2}}>
        <Image
          // resizeMethod="scale"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 10,
          }}
          source={{
            uri: thumbnail,
          }}
          // resizeMode="center"
        />
      </View>
      <View
        style={{
          // paddingHorizontal: '3%',
          justifyContent: 'center',
          // paddingHorizontal: '5%',
          width: '100%',
        }}>
        <Text style={{fontSize: dimension.fontScale * 15, fontWeight: 'bold'}}>
          {titleCase(title)}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'center',
            alignItems: 'center',
            marginVertical: '3%',
          }}>
          <Text
            style={{
              fontSize: dimension.fontScale * 10,
              fontWeight: 'bold',
              color: 'grey',
            }}>
            Course code:
          </Text>
          <Text
            style={{
              fontSize: dimension.fontScale * 10,
              fontWeight: 'bold',
              color: 'black',
              marginHorizontal: '2%',
              // color: 'grey',
            }}>
            {course_code}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: dimension.fontScale * 15,
            fontWeight: 'bold',
            color: 'green',
          }}>
          ${(lectureAmount / 500).toFixed(2)}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: 'grey'}}>Ratings:</Text>
          <Text style={{fontWeight: 'bold'}}>{rating}</Text>
          <Ionicons name="star" size={deviceSize * 0.00006} color={'#FCAA11'} />
        </View>
      </View>
      {/* </View> */}
    </TouchableOpacity>
  );
};

export default StudentLectureCarouselCard;
