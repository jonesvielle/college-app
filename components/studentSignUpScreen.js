import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
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
} from './modules';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TutorActiveImage from '../images/tutorActive.png';
import TutorInactiveImage from '../images/tutorInactive.png';
import StudentActiveImage from '../images/studentActive.png';
import StudentInactiveImage from '../images/studentInactive.png';
import LoginAsTutorImage from '../images/lot.png';
import Emoji from '../images/macbookBoy.png';
import LoginAsComponent from './signUpAsComponent';
import TextInputComponent from './TextInputComponent';
import ButtonComponent from './buttonComponent';
import BackButtonComponent from './backButtonComponent';

const StudentSignUpScreen = ({route, navigation}) => {
  useEffect(() => {
    // if (isAboveMinimumCharacters && atLeastOneDigit && atLeastOneUpperCase) {
    //   setContinueButtonDisabled(false);
    //   console.log(isAboveMinimumCharacters);
    //   console.log(atLeastOneDigit);
    //   console.log(atLeastOneUpperCase);
    // } else {
    //   setContinueButtonDisabled(true);
    // }
  }, [password]);
  const [emailActiveState, setEmailActiveState] = useState(false);
  const [passwordActiveState, setPasswordState] = useState(false);
  const [secureEntryText, setSecureEntryText] = useState(true);
  const [isAboveMinimumCharacters, setIsAboveMinimumCharacters] =
    useState(false);
  const [atLeastOneDigit, setAtLeastOneDigit] = useState(false);
  const [atLeastOneUpperCase, setAtLeastOneUpperCase] = useState(false);
  const [password, setPassword] = useState('');
  const [continueButtonDisabled, setContinueButtonDisabled] = useState(true);
  const [email, setEmail] = useState('');

  const handleSecureEntryText = () => {
    secureEntryText ? setSecureEntryText(false) : setSecureEntryText(true);
  };
  const emailFocus = () => {
    setEmailActiveState(true);
    setPasswordState(false);
  };
  const passwordFocus = () => {
    setEmailActiveState(false);
    setPasswordState(true);
  };

  const handleOnPasswordChange = (e) => {
    console.log('password', e);
    setPassword(e);
    if (checkInputLength(7, e)) {
      setIsAboveMinimumCharacters(true);
    } else {
      setIsAboveMinimumCharacters(false);
    }
    // if(checkUpperCase(passwor))
    // console.log('atl', checkNumber(e));
    if (checkUpperCase(e)) {
      setAtLeastOneUpperCase(true);
    } else {
      setAtLeastOneUpperCase(false);
    }

    if (checkNumber(e)) {
      setAtLeastOneDigit(true);
    } else {
      setAtLeastOneDigit(false);
    }
    if (
      checkNumber(e) &&
      checkInputLength(7, password) &&
      checkUpperCase(e) &&
      e.length > 0 &&
      email.length > 0 &&
      validateEmail(email) !== null
    ) {
      setContinueButtonDisabled(false);
    } else {
      setContinueButtonDisabled(true);
    }
  };
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
    if (e.length < 1 || password.length < 1) {
      setContinueButtonDisabled(true);
    }
    if (validateEmail(e) === null) {
      setContinueButtonDisabled(true);
    } else {
      setContinueButtonDisabled(false);
    }
  };
  return (
    <ScrollView style={{height: height}}>
      <View
        style={{
          padding: '5%',
          backgroundColor: 'white',
          height: height,
          // justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            // marginTop: '5%',
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
          <Text style={{color: 'rgb(114, 112, 112)'}}>Step 1/3</Text>
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
          <Text style={{fontSize: deviceSize * 0.00009}}>Account Info</Text>
          <Image
            style={{width: width * 0.15, height: height * 0.05}}
            source={Emoji}
            resizeMode="center"
          />
        </View>
        <View style={{flexDirection: 'row', width: '100%', marginTop: '2%'}}>
          <Text style={{color: 'rgb(114, 112, 112)'}}>
            Already have an account?
          </Text>
          <TouchableOpacity
            style={{marginLeft: '1%'}}
            onPress={() => {
              navigation.navigate('StudentLoginScreen');
            }}>
            <Text style={{color: '#fb3846', fontWeight: 'bold'}}>Login</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={{marginTop: '10%', width: '100%'}}>
            <Text>Email</Text>
          </View>
          <TextInputComponent
            placeHolder="email"
            activeState={emailActiveState}
            onFocus={emailFocus}
            onChange={handleEmailOnChange}
          />
        </View>
        <View style={{marginBottom: '40%'}}>
          <View style={{marginTop: '10%', width: '100%'}}>
            <Text>Password</Text>
          </View>
          <TextInputComponent
            placeHolder="password"
            activeState={passwordActiveState}
            onFocus={passwordFocus}
            isPassword={true}
            secureTextEntry={secureEntryText}
            handleSecureEntryText={handleSecureEntryText}
            isAboveMinimumCharacters={isAboveMinimumCharacters}
            atLeastOneDigit={atLeastOneDigit}
            atLeastOneUpperCase={atLeastOneUpperCase}
            onChange={handleOnPasswordChange}
          />
        </View>
        <ButtonComponent
          onPress={() => {
            navigation.navigate('StudentInstitutionInfoScreen', {
              password: password,
              email: email,
            });
            // console.log('val', validateEmail('dgdg@rr'));
          }}
          buttonText="Continue"
          isDisabled={continueButtonDisabled}
        />
      </View>
    </ScrollView>
  );
};

export default StudentSignUpScreen;
