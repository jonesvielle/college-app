import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
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
} from './modules';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Picker} from '@react-native-picker/picker';
import TutorActiveImage from '../images/tutorActive.png';
import TutorInactiveImage from '../images/tutorInactive.png';
import StudentActiveImage from '../images/studentActive.png';
import StudentInactiveImage from '../images/studentInactive.png';
import LoginAsTutorImage from '../images/lot.png';
import Emoji from '../images/mem.png';
import UploadImage from '../images/nosignal.png';
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
import svg, {Circle, Path, Ellipse, Polygon} from 'react-native-svg';
import {useNavigation} from '@react-navigation/core';

const NoNetworkModalComponent = ({
  refreshHandler,
  showModal,
  // gotoDownloads,
}) => {
  const navigation = useNavigation();
  const gotoDownloads = () => {
    navigation.navigate('StudentDownloadScreen');
  };
  return (
    <Modal visible={showModal}>
      <View
        style={{
          padding: '5%',
          alignItems: 'center',
          justifyContent: 'center',
          height: height,
          width: width,
          backgroundColor: 'rgba(255,255,255,0.4)',
          // flex: 1,
        }}>
        <Image
          resizeMode="contain"
          source={UploadImage}
          style={{height: height * 0.3}}
        />
        <Text style={{marginVertical: '1%', textAlign: 'center'}}>
          No network,{' '}
        </Text>
        <Text>
          check your data connection and{' '}
          <Text
            onPress={refreshHandler}
            style={{color: brandColor, fontWeight: 'bold', fontSize: 17}}>
            retry
          </Text>
        </Text>
        <View style={{marginVertical: '10%'}}>
          <ButtonComponent
            buttonText="Go to Downloads"
            onPress={gotoDownloads}
          />
        </View>
      </View>
    </Modal>
  );
};

export default NoNetworkModalComponent;
