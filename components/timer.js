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

const Timer = ({timeInSeconds, handleSendAgain}) => {
  const [showResendCode, setShowResendCode] = useState(false);
  const [timerEnd, setTimerEnd] = useState(false);
  const refTimer = useRef();
  const timerCallbackFunc = (timerFlag) => {
    // Setting timer flag to finished
    setTimerEnd(timerFlag);
    setShowResendCode(true);
    // console.warn(
    //   'You can alert the user by letting him know that Timer is out.',
    // );
  };

  return (
    <>
      {showResendCode ? (
        <View
          style={{
            width: width * 0.8,
            flexDirection: 'row',
            marginVertical: '5%',
          }}>
          <Text>Didn't receive a code?</Text>
          <Text
            onPress={() => {
              handleSendAgain();
              setTimerEnd(false);
              setShowResendCode(false);

              //   refTimer.current.resetTimer();
              // const timeoutId = BackgroundTimer.setTimeout(() => {
              //   setShowResendCode(true);
              // }, 60000);
            }}
            style={{
              // marginBottom: height * 0.4,
              marginLeft: '1%',
              fontWeight: 'bold',
              color: brandColor,
            }}>
            {'Send again'}
          </Text>
        </View>
      ) : (
        <View
          style={{
            display: timerEnd ? 'none' : 'flex',
            flexDirection: 'row',
            // flexWrap: 'wrap',
            marginVertical: '5%',
          }}>
          <Text>wait for </Text>
          <CountDownTimer
            ref={refTimer}
            timestamp={timeInSeconds}
            timerCallback={timerCallbackFunc}
            containerStyle={
              {
                // height: 56,
                // width: 120,
                // justifyContent: 'center',
                // alignItems: 'center',
                // borderRadius: 35,
                // backgroundColor: '#2196f3',
              }
            }
            textStyle={{
              fontSize: dimension.fontScale * 15,
              color: 'black',
              fontWeight: 'bold',
              letterSpacing: 0.25,
            }}
          />
          <Text> to request for a new code</Text>
        </View>
      )}
    </>
  );
};

export default Timer;
