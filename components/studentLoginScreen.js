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
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

const StudentLoginScreen = ({route, navigation}) => {
  const [emailActiveState, setEmailActiveState] = useState(false);
  const [passwordActiveState, setPasswordState] = useState(false);
  const [secureEntryText, setSecureEntryText] = useState(true);
  const [password, setPassword] = useState('');
  const [continueButtonDisabled, setContinueButtonDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [isWrongPassword, setIsWrongPassword] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const handleSecureEntryText = () => {
    secureEntryText ? setSecureEntryText(false) : setSecureEntryText(true);
  };

  const handleEmailOnChange = (e) => {
    console.log('email', e);
    setEmail(e.toLowerCase());
    if (e.length < 1 || password.length < 1) {
      setContinueButtonDisabled(true);
      console.log('password lent', password.length);
    } else {
      setContinueButtonDisabled(false);
      console.log('password lent', password.length);
    }
  };
  const handleOnPasswordChange = (e) => {
    console.log(e);
    setPassword(e);
    if (e.length < 1 || email.length < 1) {
      setContinueButtonDisabled(true);
      console.log('password lent', password.length);
    } else {
      setContinueButtonDisabled(false);
      console.log('password lent', password.length);
    }
  };
  const handleSubmit = () => {
    setShowLoader(true);
    // setContinueButtonDisabled(true);
    // var data = JSON.stringify({
    //   email: email,
    //   password: password,
    // });
    var data = JSON.stringify({
      email: email,
      password: password,
    });
    // email: 'emai5tyrrl4@gmail.coms',
    //   password: 'jones1111',

    var config = {
      method: 'post',
      url: apiDomain + '/api/student_signin/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        setNetworkError(false);
        setShowLoader(false);
        // setContinueButtonDisabled(false);
        setIsWrongPassword(false);
        console.log(JSON.stringify(response.data.token));
        const storeToken = async () => {
          try {
            await AsyncStorage.setItem(
              '@authentication_token',
              response.data.token,
            );
            // navigation.navigate('OnboardingScreen');
            RNRestart.Restart();
          } catch (error) {
            console.log(error);
          }
        };
        storeToken();
      })
      .catch(function (error) {
        console.log(error);
        setShowLoader(false);
        // setContinueButtonDisabled(false);
        if (error.response !== undefined) {
          setNetworkError(false);
          setIsWrongPassword(true);
        } else {
          setIsWrongPassword(false);
          setNetworkError(true);
        }
      });
  };
  const emailFocus = () => {
    setEmailActiveState(true);
    setPasswordState(false);
  };
  const passwordFocus = () => {
    setEmailActiveState(false);
    setPasswordState(true);
  };
  return (
    <ScrollView style={{height: height, backgroundColor: 'white'}}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: 'white',
          height: '100%',
          padding: '5%',
        }}>
        <View style={{width: '100%'}}>
          <BackButtonComponent />
        </View>
        <View
          style={{
            // backgroundColor: 'blue',
            marginTop: '10%',
            // marginLeft: '5%',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}>
          <Text style={{fontSize: deviceSize * 0.00009}}>Welcome Back</Text>
          <Image
            style={{width: width * 0.15, height: height * 0.05}}
            source={Emoji}
            resizeMode="center"
          />
        </View>
        <View style={{flexDirection: 'row', width: '100%', marginTop: '2%'}}>
          <Text style={{color: 'rgb(114, 112, 112)'}}>
            I don't have an account
          </Text>
          <TouchableOpacity
            style={{marginLeft: '1%'}}
            onPress={() => {
              navigation.navigate('StudentSignUpScreen', {
                navigation: navigation,
              });
            }}>
            <Text style={{color: '#fb3846', fontWeight: 'bold'}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={{marginTop: '10%', width: width * 0.85}}>
            <Text>Email</Text>
          </View>
          <TextInputComponent
            placeHolder="email"
            activeState={emailActiveState}
            onFocus={emailFocus}
            onChange={handleEmailOnChange}
          />
        </View>
        <View style={{marginBottom: '5%'}}>
          <View style={{marginTop: '10%', width: width * 0.85}}>
            <Text>Password</Text>
          </View>
          <TextInputComponent
            placeHolder="password"
            activeState={passwordActiveState}
            onFocus={passwordFocus}
            isPassword={true}
            secureTextEntry={secureEntryText}
            handleSecureEntryText={handleSecureEntryText}
            isAboveMinimumCharacters={true}
            atLeastOneDigit={true}
            atLeastOneUpperCase={true}
            onChange={handleOnPasswordChange}
          />
        </View>
        <View
          style={{
            // backgroundColor: 'blue',
            width: width * 0.85,
            marginBottom: '40%',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          {isWrongPassword ? (
            <Text style={{fontWeight: 'bold', color: brandColor}}>
              Wrong password*
            </Text>
          ) : (
            <></>
          )}
          {networkError ? (
            <Text style={{fontWeight: 'bold', color: brandColor}}>
              Network Error!
            </Text>
          ) : (
            <></>
          )}
          <Text
            style={{fontWeight: 'bold', color: brandColor}}
            onPress={() => {
              navigation.navigate('ForgotPasswordScreen');
            }}>
            Recover Password
          </Text>
        </View>
        <ButtonComponent
          onPress={handleSubmit}
          buttonText="Login"
          isDisabled={continueButtonDisabled}
          showLoader={showLoader}
        />
      </View>
    </ScrollView>
  );
};

export default StudentLoginScreen;
