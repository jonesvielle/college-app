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

const TutorLectureCarouselCard = ({
  //   route,
  title,
  course_code,
  thumbnail,
  id,
  rating,
  //   navigation,
  lectureAmount,
  authenticationToken,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('LectureDetailsScreen', {id, authenticationToken});
        // console.log(navigation);
      }}
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

export default TutorLectureCarouselCard;
