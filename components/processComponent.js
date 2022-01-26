import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
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
  dimension,
} from './modules';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Picker} from '@react-native-picker/picker';
import TutorActiveImage from '../images/tutorActive.png';
import TutorInactiveImage from '../images/tutorInactive.png';
import StudentActiveImage from '../images/studentActive.png';
import StudentInactiveImage from '../images/studentInactive.png';
import LoginAsTutorImage from '../images/lot.png';
import Emoji from '../images/sadGirl.png';
import LoginAsComponent from './signUpAsComponent';
import TextInputComponent from './TextInputComponent';
import ButtonComponent from './buttonComponent';
import PickerComponent from './pickerComponent';
import CodeInputComponent from './codeInputComponent';
import MomentTimer from 'moment-timer';
import Moment from 'moment';
import Axios from 'axios';
import BackgroundTimer from 'react-native-background-timer';
import BackButtonComponent from './backButtonComponent';
import CountDownTimer from 'react-native-countdown-timer-hooks';
import Timer from './timer';
// import axios from 'axios';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Modal from 'react-native-modal';

const ProcessComponent = ({showModal, text}) => {
  return (
    <Modal isVisible={showModal}>
      <View
        style={{
          backgroundColor: 'white',
          height: height * 0.1,
          padding: '5%',
          flexDirection: 'row',
          alignItems: 'center',
          //   justifyContent: 'space-between',
          //   borderRadius: 10,
        }}>
        <ActivityIndicator size={dimension.fontScale * 35} color={brandColor} />
        <Text
          style={{
            marginLeft: '10%',
            // color: 'grey',
            color: 'black',
            fontSize: dimension.fontScale * 17,
          }}>
          {text}
        </Text>
      </View>
    </Modal>
  );
};

export default ProcessComponent;
