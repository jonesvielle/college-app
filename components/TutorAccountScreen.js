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
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

const TutorAccountScreen = ({
  tutorName,
  tutorUniversity,
  tutorProfilePicture,
  tutorVerification,
}) => {
  const handleLogout = () => {
    // alert('great');
    const deleteToken = async () => {
      try {
        await AsyncStorage.removeItem('@authentication_token');
        // navigation.navigate('TourScreen');
        RNRestart.Restart();
      } catch (error) {
        console.log(error);
      }
    };
    deleteToken();
  };
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: height,
        padding: '5%',
        width: width,
      }}>
      <TutorHeaderComponent title="Account" />
      <View
        style={{
          marginVertical: '10%',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          // resizeMethod="scale"
          style={{
            width: width * 0.3,
            height: width * 0.3,
            borderRadius: deviceSize * 0.0003,
          }}
          source={{
            uri: tutorProfilePicture,
          }}
          resizeMode="stretch"
        />
        <View style={{marginHorizontal: '3%', flexWrap: 'wrap'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: dimension.fontScale * 20,
            }}>
            {titleCase(tutorName)}
          </Text>
          <Text style={{color: 'grey', fontSize: dimension.fontScale * 15}}>
            {titleCase(tutorUniversity)}
          </Text>
          <Text
            style={{
              padding: '5%',
              backgroundColor: '#FCAA11',
              margin: '1%',
              borderRadius: deviceSize * 0.0003,
              color: 'white',
              textAlign: 'center',
              fontSize: dimension.fontScale * 10,
            }}>
            {tutorVerification === 0 ? 'Not activated' : 'Activated'}
          </Text>
          {/* if activated */}
          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons
                name="star"
                size={deviceSize * 0.00006}
                color={'#FCAA11'}
              />
              <Ionicons
                name="star"
                size={deviceSize * 0.00006}
                color={'#FCAA11'}
              />
              <Ionicons
                name="star"
                size={deviceSize * 0.00006}
                color={'#FCAA11'}
              />
              <Ionicons
                name="star"
                size={deviceSize * 0.00006}
                color={'#FCAA11'}
              />
              <Ionicons
                name="star"
                size={deviceSize * 0.00006}
                color={'#FCAA11'}
              />
            </View> */}
        </View>
      </View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // backgroundColor: 'red',
          width: width * 0.4,
        }}
        onPress={handleLogout}>
        <Ionicons name="exit" size={deviceSize * 0.00014} color={brandColor} />
        <Text
          style={{
            fontSize: dimension.fontScale * 15,
            marginLeft: '5%',
            color: brandColor,
          }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TutorAccountScreen;
