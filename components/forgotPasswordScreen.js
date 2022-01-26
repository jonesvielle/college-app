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
  apiDomain,
  errorHandler,
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
import ModalComponent from './modalComponent';

const ForgotPasswordScreen = ({route, navigation}) => {
  const [email, setEmail] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [showModalState, setShowModalState] = useState(false);
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };
  const handleEmailOnChange = (e) => {
    console.log('email', e);
    setEmail(e.toLowerCase());
    if (e.length < 1) {
      setButtonDisabled(true);
    }
    if (validateEmail(e) === null) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };
  const handleSubmit = () => {
    setShowLoader(true);
    var data = JSON.stringify({
      email: email,
    });

    var config = {
      method: 'post',
      url: apiDomain + '/api/student_forgot_password/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setShowLoader(false);
        setShowModalState(true);
      })
      .catch(function (error) {
        console.log(error);
        setShowLoader(false);
        errorHandler(error);
      });
  };
  return (
    <ScrollView style={{padding: '5%', backgroundColor: 'white'}}>
      <ModalComponent
        showModal={showModalState}
        title={'Check your inbox'}
        body={
          'We sent you a verification email. Open it and enter the verification code to continue.'
        }
        iconName={'envelope-open-text'}
        onSubmit={() => {
          setShowModalState(false);
          navigation.navigate('VerifyCodeScreen', {fromSignUp: false, email});
        }}
      />
      <View
        style={{
          // backgroundColor: 'blue',
          marginTop: '10%',
          // marginLeft: '5%',
          flexDirection: 'row',
          alignItems: 'center',
          width: width * 0.85,
        }}>
        <Text style={{fontSize: deviceSize * 0.00009}}>Forgot Password</Text>
        <Image
          style={{width: width * 0.15, height: height * 0.05}}
          source={Emoji}
          resizeMode="center"
        />
      </View>
      <View style={{marginVertical: '10%'}}>
        <Text>
          Enter the email address you used to sign up earlier to receive a
          verification code
        </Text>
      </View>
      <View>
        <Text>Email</Text>
        <TextInputComponent onChange={handleEmailOnChange} />
      </View>
      <View style={{marginVertical: '10%'}}>
        <ButtonComponent
          buttonText="Submit"
          isDisabled={buttonDisabled}
          showLoader={showLoader}
          onPress={handleSubmit}
        />
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;
