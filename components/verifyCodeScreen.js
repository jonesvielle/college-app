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

const CELL_COUNT = 4;
const VerifyCodeScreen = ({route, navigation}) => {
  // console.log(route, 'routes');
  const {fromSignUp, email} = route.params;
  if (fromSignUp) {
    const {
      email,
      phoneNumber,
      university,
      password,
      fullName,
      profile,
      selectedFaculty,
      selectedLevel,
      selectedDepartment,
    } = route.params;
  }
  const [value, setValue] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleSubmit1 = () => {
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

  const handleSubmit = () => {
    // setShowLoader(true);
    ToastAndroid.show('PROCESSING PLEASE WAIT....', ToastAndroid.LONG);
    const formattedNumber = '+234' + phoneNumber.substring(1);
    var data = JSON.stringify({
      university: university,
      phone: formattedNumber,
      password: password,
      email: email.toLowerCase(),
      full_name: fullName.toLowerCase(),
      // course: 'my course',
      profile_picture: profile,
      faculty: selectedFaculty,
      level: selectedLevel,
      department: selectedDepartment,
    });

    var config = {
      method: 'post',
      url: apiDomain + '/api/student_signup/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        // if (response.data.message === 'OK') {
        // navigation.navigate('VerifyCodeScreen', {
        //   email,
        //   password,
        //   university,
        //   fullName,
        //   profile,
        //   phoneNumber,
        // });
        // navigation.navigate('VerifyCodeScreen', {email});
        // setShowModalState(true);
        // }
        console.log(JSON.stringify(response.data));
        // setErrorState(false);
        setShowLoader(false);
        return true;
      })
      .catch(function (error) {
        // setShowLoader(false);
        console.log(error);
        if (error.response.data !== undefined) {
          console.log(error.response.data.message);
          // setErrorState(error.response.data.message);
          return false;
        } else {
          console.log('COLLOSSAL DAMAGES');
          return false;
        }
      });
  };

  const handleVerification = () => {
    setShowLoader(true);
    // console.warn(value);
    var data = JSON.stringify({
      auth_token: value,
    });

    var config = {
      method: 'post',
      url: apiDomain + '/api/verify_code/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (fromSignUp) {
          handleInsertAccount();
        } else {
          navigation.navigate('ChangePasswordScreen', {email});
        }
        setShowLoader(false);
      })
      .catch(function (error) {
        setShowLoader(false);
        console.log(error);
        if (error.response.data !== undefined) {
          console.log(error.response.data.message);
          ToastAndroid.show(error.response.data.message, ToastAndroid.LONG);
        } else {
          // console.log('COLLOSSAL DAMAGES');
          ToastAndroid.show('NETWORK ERROR', ToastAndroid.LONG);
        }
      });
  };
  const handleInsertAccount = () => {
    const formattedNumber = '+234' + phoneNumber.substring(1);
    var data = JSON.stringify({
      email: email,
      password: password,
      full_name: fullName,
      phone: formattedNumber,
      university: university,
      faculty: selectedFaculty,
      level: selectedLevel,
      department: selectedDepartment,
      profile_picture: profile,
    });

    var config = {
      method: 'post',
      url: apiDomain + '/api/student_insert_account/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        navigation.navigate('StudentLoginScreen');
      })
      .catch(function (error) {
        console.log(error);
        errorHandler(error);

        navigation.goBack();
      });
  };
  return (
    <ScrollView style={{padding: '5%'}}>
      {/* <BackButtonComponent /> */}
      <View
        style={{
          // backgroundColor: 'blue',
          marginTop: '10%',
          // marginLeft: '5%',
          flexDirection: 'row',
          alignItems: 'center',
          width: width * 0.85,
        }}>
        <Text style={{fontSize: deviceSize * 0.00009}}>Verify Email</Text>
        <Image
          style={{width: width * 0.15, height: height * 0.05}}
          source={Emoji}
          resizeMode="center"
        />
      </View>
      <Text style={{marginTop: '5%', width: '100%'}}>
        Enter the 4 digit code sent to your email address
      </Text>
      <Text style={{marginBottom: '5%', width: '100%', fontWeight: 'bold'}}>
        {/* (oben*****nes@gmail.com) */}
        {email}
      </Text>
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <View style={{marginBottom: '5%'}}>
        <Timer
          timeInSeconds={300}
          handleSendAgain={fromSignUp ? handleSubmit : handleSubmit1}
        />
      </View>
      {/* <Text style={{marginVertical: '5%', textAlign: 'center'}}>
        Resend code in 5:00
      </Text> */}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: '5%',
        }}>
        <ButtonComponent
          buttonText="Verify"
          onPress={handleVerification}
          showLoader={showLoader}
          // isDisabled={}
          // onPress={handleHideEmail}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  // codeFieldRoot: {marginTop: 200},
  cell: {
    width: width * 0.17,
    height: width * 0.17,
    lineHeight: 38,
    fontSize: dimension.fontScale * 17,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    paddingVertical: '5%',
    // paddingHorizontal: '8%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    borderRadius: 10,
    // Top: '50%',
  },
  focusCell: {
    borderColor: brandColor,
  },
});
export default VerifyCodeScreen;
