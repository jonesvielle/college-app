import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
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
  apiDomain,
  errorHandler,
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
import axios from 'axios';

const ChangePasswordScreen = ({route, navigation}) => {
  const {email} = route.params;
  const [secureTextEntry, setSecureEntryText] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [buttonDisable, setButtonDisabled] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  const handleSecureEntryText = () => {
    if (secureTextEntry) {
      setSecureEntryText(false);
    } else {
      setSecureEntryText(true);
    }
  };

  const handleOnChangePassword = (e) => {
    if (e.length < 1 || confirmPassword.length < 1) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
    setPassword(e);
  };

  const handleOnChangeConfirmPassword = (e) => {
    if (e.length < 1 || password.length < 1) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
    setConfirmPassword(e);
  };

  const handleSubmit = () => {
    setShowLoader(true);
    if (confirmPassword !== password) {
      ToastAndroid.show(
        'YOUR NEW AND OLD PASSWORDS ARE NOT THE SAME',
        ToastAndroid.LONG,
      );
      setShowLoader(false);
    } else {
      handleUpdatePassword();
    }
  };

  const handleUpdatePassword = () => {
    var data = JSON.stringify({
      email: email,
      new_password: password,
    });

    var config = {
      method: 'post',
      url: apiDomain + '/api/student_update_password/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        navigation.navigate('StudentLoginScreen');
        setShowLoader(false);
      })
      .catch(function (error) {
        setShowLoader(false);
        console.log(error);
        errorHandler(error);
      });
  };
  //   this.setState({counter: this.state.counter + this.props.increment});
  return (
    <ScrollView style={{padding: '5%', backgroundColor: 'white'}}>
      <View
        style={{
          // backgroundColor: 'blue',
          marginTop: '10%',
          // marginLeft: '5%',
          flexDirection: 'row',
          alignItems: 'center',
          width: width * 0.85,
        }}>
        <Text style={{fontSize: deviceSize * 0.00009}}>Change password</Text>
        <Image
          style={{width: width * 0.15, height: height * 0.05}}
          source={Emoji}
          resizeMode="center"
        />
      </View>
      <View style={{paddingVertical: '10%'}}>
        <Text>
          In other to best protect your account, please select password that is
          at least 8 characters long and contains a combination of lowercase and
          uppercase letters, and numbers
        </Text>
      </View>
      <View style={{marginBottom: '10%'}}>
        <Text>New password</Text>
        <TextInputComponent
          secureTextEntry={secureTextEntry}
          handleSecureEntryText={handleSecureEntryText}
          isPassword
          onChange={handleOnChangePassword}
        />
      </View>
      <View style={{marginBottom: '10%'}}>
        <Text>Confirm password</Text>
        <TextInputComponent
          onChange={handleOnChangeConfirmPassword}
          secureTextEntry
        />
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ButtonComponent
          buttonText="Reset"
          onPress={handleSubmit}
          isDisabled={buttonDisable}
          showLoader={showLoader}
        />
      </View>
    </ScrollView>
  );
};

export default ChangePasswordScreen;
