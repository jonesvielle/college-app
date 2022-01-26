import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
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
// import axios from 'axios';

const StudentVerifyEmailScreen = ({route, navigation}) => {
  const {email, password, university, fullName, profile, phoneNumber} =
    route.params;

  const now = Moment.now();
  // const timeoutId = BackgroundTimer.setTimeout(() => {
  //   setShowResendCode(true);
  // }, 60000);

  // console.log('now=', now);
  // console.log('now + 60 =', now + 60);
  const fiveMinutesTime = new Date().getMinutes(5);
  // const {email, password} = route.params;
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [input1Active, setInput1Active] = useState(true);
  const [input2Active, setInput2Active] = useState(false);
  const [input3Active, setInput3Active] = useState(false);
  const [input4Active, setInput4Active] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [currentTime, setCurrentTime] = useState(30);
  const [showResendCode, setShowResendCode] = useState(false);
  const [continueButtonDisabled, setContinueButtonDisabled] = useState(true);
  const [timerEnd, setTimerEnd] = useState(false);

  const refTimer = useRef();
  const timerCallbackFunc = (timerFlag) => {
    // Setting timer flag to finished
    setTimerEnd(timerFlag);
    setShowResendCode(true);
    console.warn(
      'You can alert the user by letting him know that Timer is out.',
    );
  };

  useEffect(() => {}, []);

  const onChangeInput1 = (e) => {
    setInput1(e);
    setInput1Active(true);
    if (e.length > 0) {
      setContinueButtonDisabled(false);
    } else {
      setContinueButtonDisabled(true);
    }
    // setVerificationCode(verificationCode.concat(e));
  };
  const onChangeInput2 = (e) => {
    setInput2(e);
    setInput2Active(true);
    if (e.length > 0) {
      setContinueButtonDisabled(false);
    } else {
      setContinueButtonDisabled(true);
    }
    // setVerificationCode(verificationCode.concat(e));
  };

  const onChangeInput3 = (e) => {
    setInput3(e);
    setInput3Active(true);
    if (e.length > 0) {
      setContinueButtonDisabled(false);
    } else {
      setContinueButtonDisabled(true);
    }
    // setVerificationCode(verificationCode.concat(e));
  };
  const onChangeInput4 = (e) => {
    setInput4(e);
    setInput4Active(true);
    // setVerificationCode(verificationCode.concat(e));
    if (e.length > 0) {
      setContinueButtonDisabled(false);
    } else {
      setContinueButtonDisabled(true);
    }
  };
  const onFocusInput2 = () => {
    setInput2Active(true);
  };
  const onFocusInput1 = () => {
    setInput1Active(true);
  };
  const onFocusInput3 = () => {
    setInput3Active(true);
  };
  const onFocusInput4 = () => {
    setInput4Active(true);
  };
  const verifyCode = () => {
    setContinueButtonDisabled(true);
    var axios = require('axios');
    var data = JSON.stringify({
      verification_code: input1 + input2 + input3 + input4,
    });

    var config = {
      method: 'post',
      url: 'http://collageapi.herokuapp.com/api/verify_code/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setContinueButtonDisabled(false);
        console.log(JSON.stringify(response.data.message));
        if (response.data.message === 'OK') {
          navigation.navigate('StudentLoginScreen');
        }
      })
      .catch(function (error) {
        console.log(error);
        setContinueButtonDisabled(false);
      });
  };
  return (
    <ScrollView>
      <View
        style={{
          // padding: '10%',
          backgroundColor: 'white',
          height: height,
          // justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            marginTop: '5%',
            width: width * 0.9,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <BackButtonComponent
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <View
          style={{
            // backgroundColor: 'blue',
            marginTop: '10%',
            // marginLeft: '5%',
            flexDirection: 'row',
            alignItems: 'center',
            width: width * 0.85,
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: deviceSize * 0.00009}}>Verify Phone</Text>
          <Image
            style={{width: width * 0.15, height: height * 0.05}}
            source={Emoji}
            resizeMode="center"
          />
        </View>
        <View
          style={{
            width: width * 0.85,
            marginVertical: '3%',
            // flexDirection: 'row',
          }}>
          <Text style={{color: 'rgb(114, 112, 112)'}}>
            Enter the four digit code sent to you at
          </Text>
          <Text style={{fontWeight: 'bold'}}>{phoneNumber}</Text>
        </View>
        <CodeInputComponent
          input1Active={input1Active}
          input2Active={input2Active}
          input3Active={input3Active}
          input4Active={input4Active}
          onChangeInput1={onChangeInput1}
          onChangeInput2={onChangeInput2}
          onChangeInput3={onChangeInput3}
          onChangeInput4={onChangeInput4}
          onFocusInput1={onFocusInput1}
          onFocusInput2={onFocusInput2}
          onFocusInput3={onFocusInput3}
          onFocusInput4={onFocusInput4}
        />
        {/* <Text style={{marginBottom: height * 0.02}}>{now}</Text> */}
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
                setShowResendCode(false);
                navigation.navigate('VerifyCodeScreen', {
                  email,
                  password,
                  university,
                  fullName,
                  profile,
                  phoneNumber,
                });

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
              timestamp={300}
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
        <ButtonComponent
          onPress={verifyCode}
          buttonText="Continue"
          isDisabled={continueButtonDisabled}
        />
      </View>
    </ScrollView>
  );
};

export default StudentVerifyEmailScreen;
