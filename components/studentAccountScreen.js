import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  FlatList,
  ToastAndroid,
  StatusBar,
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
  titleCase,
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
import Brand from '../images/lot.png';
import EmptyCourses from '../images/emptyCourses.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TutorHeaderComponent from './tutorHeaderComponent';
import axios from 'axios';
import {useNavigation} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StudentHeaderComponent from './studentHeaderComponent';
import RNRestart from 'react-native-restart';
import ProcessComponent from './processComponent';
import FocusAwareStatusBar from './FocuseAwareStatusBar';

const StudentAccountScreen = ({
  studentName,
  studentUniversity,
  studentProfilePicture,
  tutorVerification,
  studentDepartment,
  studentLevel,
  authenticationToken,
}) => {
  const [level, setLevel] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showLoadingProcess, setShowLoadingProcess] = useState(false);
  const pickerFunction = (e) => {
    setLevel(e);
  };

  useEffect(() => {
    // StatusBar.setTranslucent(true);
    // StatusBar.setBackgroundColor(brandColor);
  });
  const removeUserToken = () => {
    // alert('great');
    const deleteToken = async () => {
      try {
        await AsyncStorage.removeItem('@authentication_token');
        // navigation.navigate('OnboardingScreen');
        RNRestart.Restart();
        setShowLoadingProcess(false);
      } catch (error) {
        setShowLoadingProcess(false);
        console.log(error);
      }
    };
    deleteToken();
  };
  const handleLogout = () => {
    setShowLoadingProcess(true);
    var data = JSON.stringify({
      token: authenticationToken,
    });

    var config = {
      method: 'post',
      url: apiDomain + '/api/student_signout/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        removeUserToken();
      })
      .catch(function (error) {
        setShowLoadingProcess(false);
        console.log(error);
        ToastAndroid(
          'SOMETHING WENT WRONG, CHECK YOUR CONNECTION',
          ToastAndroid.LONG,
        );
      });
  };
  const navigation = useNavigation();

  const handleChangeStudentLevel = () => {
    setButtonDisabled(true);
    ToastAndroid.show('please wait....', ToastAndroid.LONG);
    if (level.length < 1) {
      setButtonDisabled(false);
      ToastAndroid.show('Select your new level', ToastAndroid.LONG);
    } else {
      var data = JSON.stringify({
        token: authenticationToken,
        level: level,
      });

      var config = {
        method: 'post',
        url: apiDomain + '/api/edit_student_level/',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          ToastAndroid.show('Changes made successfully', ToastAndroid.LONG);
          setButtonDisabled(false);
          RNRestart.Restart();
        })
        .catch(function (error) {
          console.log(error);
          ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
          setButtonDisabled(false);
        });
    }
  };
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: height,
        padding: '5%',
        width: width,
      }}>
      {/* <StatusBar backgroundColor={brandColor} translucent={false} /> */}
      <FocusAwareStatusBar
        currentHeight={0}
        translucent={false}
        backgroundColor={brandColor}
      />
      <StudentHeaderComponent notShowSearch title="Account" />
      <ProcessComponent
        showModal={showLoadingProcess}
        text={'Logging out...'}
      />
      <View
        style={{
          marginVertical: '10%',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          // resizeMethod="scale"
          style={{
            width: width * 0.3,
            height: width * 0.3,
            borderRadius: deviceSize,
          }}
          source={{
            uri: studentProfilePicture,
          }}
          resizeMode="stretch"
        />
        <View style={{marginHorizontal: '3%', flexWrap: 'wrap'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: dimension.fontScale * 20,
            }}>
            {titleCase(studentName)}
          </Text>
          {/* <Text style={{color: 'grey', fontSize: dimension.fontScale * 15}}>
            {titleCase(studentUniversity.toUpperCase())}
          </Text> */}
          <Text style={{color: 'grey', fontSize: dimension.fontScale * 15}}>
            {titleCase(studentDepartment.toUpperCase())}
          </Text>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: dimension.fontScale * 15,
            }}>
            {titleCase(studentLevel.toUpperCase())} Level
          </Text>
          {/* <Text
            style={{
              padding: '5%',
              backgroundColor: '#FCAA11',
              margin: '1%',
              borderRadius: deviceSize * 0.0003,
              color: 'white',
              textAlign: 'center',
              fontSize: dimension.fontScale * 10,
            }}>
            {tutorVerification === 0 ? 'Not activated' : 'Activated'}
          </Text> */}
          {/* if activated */}
          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons
                name="star"
                size={deviceSize * 0.00006}
                color={'#FCAA11'}
              />
              <Ionicons
                name="star"
                size={deviceSize * 0.00006}
                color={'#FCAA11'}
              />
              <Ionicons
                name="star"
                size={deviceSize * 0.00006}
                color={'#FCAA11'}
              />
              <Ionicons
                name="star"
                size={deviceSize * 0.00006}
                color={'#FCAA11'}
              />
              <Ionicons
                name="star"
                size={deviceSize * 0.00006}
                color={'#FCAA11'}
              />
            </View> */}
        </View>
      </View>
      <View
        style={{
          marginBottom: '10%',
          marginTop: '5%',
          backgroundColor: 'rgb(252, 250, 249)',
          padding: '5%',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}>
        <Text
          style={{
            marginBottom: '5%',
            fontSize: dimension.fontScale * 17,
            color: 'grey',
          }}>
          Edit your level
        </Text>
        <PickerComponent
          itemList={['100', '200', '300', '400', '500', 'POST UTME']}
          selectedValue={level}
          placeholder={'Select new level'}
          pickerFunction={pickerFunction}
        />
        <View style={{marginTop: '10%'}}>
          <ButtonComponent
            onPress={handleChangeStudentLevel}
            isDisabled={buttonDisabled}
            buttonText="Save changes"
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // backgroundColor: 'red',
          width: width * 0.4,
        }}
        onPress={handleLogout}>
        <Ionicons name="exit" size={deviceSize * 0.00014} color={brandColor} />
        <Text
          style={{
            fontSize: dimension.fontScale * 15,
            marginLeft: '5%',
            color: brandColor,
          }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default StudentAccountScreen;
