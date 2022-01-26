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
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TutorHomeScreen from './tutorHomeScreen';
import TutorSettingScreen from './tutorSettingScreen';
import TutorCoursesScreen from './tutorCoursesScreen';
import TutorPastQuestionScreen from './TutorPastQuestionsScreen';
import EarningScreen from './earningScreen';
import TutorAccountScreen from './TutorAccountScreen';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import CustomDrawerComponent from './customDrawerComponent';

// const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();

const TutorDrawerComponent = ({
  tutorName,
  tutorUniversity,
  tutorVerification,
  tutorProfilePicture,
  authenticationToken,
  lectureAmount,
  pastQuestionAmount,
}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Courses') {
            iconName = focused ? 'ios-play-circle' : 'ios-play-circle-outline';
          } else if (route.name === 'PastQuestions') {
            iconName = focused ? 'ios-business' : 'ios-business-outline';
          } else if (route.name === 'PastQuestions') {
            iconName = focused ? 'ios-business' : 'ios-business-outline';
          } else if (route.name === 'Earnings') {
            iconName = focused ? 'ios-wallet' : 'ios-wallet-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home">
        {(props) => (
          <TutorHomeScreen
            {...props}
            tutorName={tutorName}
            tutorUniversity={tutorUniversity}
            tutorVerification={tutorVerification}
            tutorProfilePicture={tutorProfilePicture}
            authenticationToken={authenticationToken}
            lectureAmount={lectureAmount}
            pastQuestionAmount={pastQuestionAmount}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Courses"
        initialParams={{university: tutorUniversity}}
        options={{title: 'All Courses'}}>
        {(props) => (
          <TutorCoursesScreen
            {...props}
            authenticationToken={authenticationToken}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="PastQuestions"
        initialParams={{university: tutorUniversity}}
        options={{title: 'Past Questions'}}>
        {(props) => (
          <TutorPastQuestionScreen
            {...props}
            authenticationToken={authenticationToken}
          />
        )}
      </Tab.Screen>
      {/* <Tab.Screen
        name="Earnings"
        component={EarningScreen}
        options={{title: 'Earnings'}}
      /> */}
      <Tab.Screen name="Earnings">
        {(props) => (
          <EarningScreen
            {...props}
            tutorName={tutorName}
            authenticationToken={authenticationToken}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Account">
        {(props) => (
          <TutorAccountScreen
            {...props}
            tutorName={tutorName}
            tutorUniversity={tutorUniversity}
            tutorVerification={tutorVerification}
            tutorProfilePicture={tutorProfilePicture}
            authenticationToken={authenticationToken}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TutorDrawerComponent;
