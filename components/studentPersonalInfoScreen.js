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
import ModalComponent from './modalComponent';

const StudentPersonalInfoScreen = ({route, navigation}) => {
  const {
    university,
    email,
    password,
    selectedDepartment,
    selectedFaculty,
    selectedLevel,
  } = route.params;
  const [imageLoading, setImageLoading] = useState(false);
  const [noNetwork, setNoNetwork] = useState(false);
  const [profileImage, setProfileImage] = useState(UploadImage);
  const [profile, setProfile] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullNameActiveState, setFullNameActiveState] = useState(false);
  const [phoneNumberActiveState, setPhoneNumberActiveState] = useState(false);
  const [continueButtonDisabled, setContinueButtonDisabled] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [errorState, setErrorState] = useState('');
  const [showModalState, setShowModalState] = useState(false);
  const handleUploadProfile = async () => {
    // alert('hgf');

    // const {email, password} = route.params;
    setImageLoading(true);
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(res);
      const image = {
        type: res.type,
        name: res.name,
        uri: res.uri,
      };
      setProfileImage(image);
      // const awsOptio = awsOptions();
      RNS3.put(image, awsOptions())
        .then((response) => {
          if (response.status !== 201) {
            console.log('f here');
            setImageLoading(false);
            setNoNetwork(true);
          }
          // console.log('ressssstss', response.body.postResponse.location);
          setImageLoading(false);
          setNoNetwork(false);
          setProfile(response.body.postResponse.location);
          // setContinueButtonDisabled(false);
          if (fullName.length > 0 && phoneNumber.length > 0) {
            console.log('lent', fullName.length);
            setContinueButtonDisabled(false);
          } else {
            setContinueButtonDisabled(true);
          }
        })
        .catch((e) => {
          //   console.log(e);
          console.log('f here');
          setImageLoading(false);
          setNoNetwork(true);
          setContinueButtonDisabled(true);
        });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.warn('cancelled');
        setImageLoading(false);
        setContinueButtonDisabled(true);
      } else {
        console.log('f here');
        setContinueButtonDisabled(true);
        throw err;
      }
    }
  };
  const onFocusFullName = () => {
    setFullNameActiveState(true);
    setPhoneNumberActiveState(false);
  };
  const onFocusPhoneNumber = () => {
    setFullNameActiveState(false);
    setPhoneNumberActiveState(true);
  };
  const handleFullName = (e) => {
    setFullName(e.toLowerCase());
    if (e.length > 0 && phoneNumber.length > 0 && profile.length > 0) {
      setContinueButtonDisabled(false);
    } else {
      setContinueButtonDisabled(true);
    }
  };
  const handlePhoneNumber = (e) => {
    setPhoneNumber(e);
    // console.log('profile', profile);
    if (e.length > 0 && fullName.length > 0 && profile.length > 0) {
      setContinueButtonDisabled(false);
    } else {
      setContinueButtonDisabled(true);
    }
  };

  const handleSignUp = () => {
    setShowLoader(true);
    const formattedNumber = '+234' + phoneNumber.substring(1);
    var data = JSON.stringify({
      email: email,
      phone: formattedNumber,
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
        setShowLoader(false);
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        setShowLoader(false);
        // console.log(error);
        if (error.response.data !== undefined) {
          console.log(error.response.data.message);
          setErrorState(error.response.data.message);
        } else {
          console.log('COLLOSSAL DAMAGES');
        }
      });
  };

  const handleSubmit = () => {
    setShowLoader(true);
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
      url: 'http://collageapi.herokuapp.com/api/student_signup/',
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
        setShowModalState(true);
        // }
        console.log(JSON.stringify(response.data));
        setErrorState(false);
        setShowLoader(false);
      })
      .catch(function (error) {
        setShowLoader(false);
        if (error.response.data !== undefined) {
          console.log(error.response.data.message);
          setErrorState(error.response.data.message);
        } else {
          console.log('COLLOSSAL DAMAGES');
        }
      });
  };
  console.log('route', route);
  return (
    <ScrollView>
      <ModalComponent
        showModal={showModalState}
        onSubmit={() => {
          setShowModalState(false);
          navigation.navigate('VerifyCodeScreen', {
            email,
            university,
            phoneNumber,
            password,
            fullName,
            profile,
            selectedFaculty,
            selectedLevel,
            selectedDepartment,
            fromSignUp: true,
          });
        }}
        title={'Check your inbox'}
        body={
          'We sent you a verification email. Open it and enter the verification code to continue.'
        }
        iconName={'envelope-open-text'}
      />
      <View
        // behavior="position"
        keyboardVerticalOffset={40}
        style={{
          // position: 'absolute',
          // padding: '10%',
          backgroundColor: 'white',
          height: height,
          width: width,
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
          <Text style={{color: 'rgb(114, 112, 112)'}}>Step 3/3</Text>
        </View>
        <View
          style={{
            // backgroundColor: 'blue',
            marginTop: '10%',
            // marginLeft: '5%',
            flexDirection: 'row',
            alignItems: 'center',
            width: width * 0.85,
          }}>
          <Text style={{fontSize: deviceSize * 0.00009}}>Personal Info</Text>
          <Image
            style={{width: width * 0.15, height: height * 0.05}}
            source={Emoji}
            resizeMode="center"
          />
        </View>

        <View style={{width: width * 0.85}}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              padding: '10%',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleUploadProfile}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                // borderRadius: 10,
              }}>
              <Text
                style={{
                  marginBottom: '2%',
                  color: 'grey',
                  fontStyle: 'italic',
                }}>
                <Text
                  style={{
                    color: 'red',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                  }}>
                  *
                </Text>{' '}
                please upload your profile picture here
              </Text>
              <Image
                style={{width: width * 0.5, height: height * 0.16}}
                source={profileImage}
                resizeMode="center"
              />
              {noNetwork ? (
                <Text style={{color: 'red', marginTop: '3%'}}>
                  Error uploading!, check connection
                </Text>
              ) : (
                <></>
              )}
              <ActivityIndicator
                animating={imageLoading}
                color={brandColor}
                size="large"
                style={{position: 'absolute'}}
              />
            </TouchableOpacity>
          </View>
          {errorState !== '' ? (
            <Text style={{color: 'red'}}>{errorState}</Text>
          ) : (
            <></>
          )}
          <View style={{width: '100%', marginTop: '10%'}}>
            <Text>Full Name</Text>
            <TextInputComponent
              onChange={handleFullName}
              placeHolder="full name"
              isNumeric={false}
              activeState={fullNameActiveState}
              onFocus={onFocusFullName}
            />
          </View>
          <View
            style={{
              width: '100%',
              marginTop: '10%',
              marginBottom: height * 0.1,
            }}>
            <Text>Phone Number</Text>
            <TextInputComponent
              onFocus={onFocusPhoneNumber}
              onChange={handlePhoneNumber}
              placeHolder="Enter phone (e.g 08101234567)"
              isNumeric={true}
              hasImageLeft={true}
              image={Nigeria}
              activeState={phoneNumberActiveState}
            />
          </View>
        </View>

        <ButtonComponent
          showLoader={showLoader}
          onPress={handleSubmit}
          buttonText="Sign Up"
          isDisabled={continueButtonDisabled}
        />
      </View>
    </ScrollView>
  );
};

export default StudentPersonalInfoScreen;
