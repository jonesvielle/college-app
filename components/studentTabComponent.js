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
import StudentHomeScreen from './studentHomeScreen';
import StudentDownloadScreen from './studentDownloadScreen';
import StudentCoursesScreen from './studentCoursesScreen';
import FavouriteScreen from './favouriteScreen';
import StudentPastQuestionScreen from './studentPastQuestionScreen';
import StudentAccountScreen from './studentAccountScreen';
// import TutorAccountScreen from './TutorAccountScreen';
// import TutorAccountScreen from './TutorAccountScreen';

// import {createDrawerNavigator} from '@react-navigation/drawer';
// import CustomDrawerComponent from './customDrawerComponent';

// const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();

const StudentDrawerComponent = ({
  studentName,
  studentUniversity,
  studentVerification,
  studentProfilePicture,
  authenticationToken,
  studentDepartment,
  studentLevel,
  studentEmail,
  studentId,
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
          } else if (route.name === 'Downloads') {
            iconName = focused ? 'ios-download' : 'ios-download-outline';
          } else if (route.name === 'All Courses') {
            iconName = focused ? 'ios-play-circle' : 'ios-play-circle-outline';
          } else if (route.name === 'Past Questions') {
            iconName = focused ? 'ios-business' : 'ios-business-outline';
          } else if (route.name === 'Favourites') {
            iconName = focused ? 'ios-star' : 'ios-star-outline';
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
          <StudentHomeScreen
            {...props}
            studentName={studentName}
            studentUniversity={studentUniversity}
            studentVerification={studentVerification}
            studentProfilePicture={studentProfilePicture}
            authenticationToken={authenticationToken}
            studentDepartment={studentDepartment}
            studentLevel={studentLevel}
            studentEmail={studentEmail}
            studentId={studentId}
            lectureAmount={lectureAmount}
            pastQuestionAmount={pastQuestionAmount}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="All Courses"
        initialParams={{
          university: studentUniversity,
          authenticationToken,
          department: studentDepartment,
          level: studentLevel,
          studentEmail,
          studentId,
          lectureAmount,
        }}>
        {(props) => <StudentCoursesScreen {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="Past Questions"
        initialParams={{
          university: studentUniversity,
          authenticationToken,
          department: studentDepartment,
          level: studentLevel,
          studentEmail,
          studentId,
          pastQuestionAmount,
        }}>
        {(props) => <StudentPastQuestionScreen {...props} />}
      </Tab.Screen>
      <Tab.Screen name="Downloads">
        {(props) => <StudentDownloadScreen {...props} />}
      </Tab.Screen>
      {/* <Tab.Screen name="Favourites">
        {(props) => <FavouriteScreen {...props} />}
      </Tab.Screen> */}
      <Tab.Screen name="Account">
        {(props) => (
          <StudentAccountScreen
            authenticationToken={authenticationToken}
            studentName={studentName}
            studentUniversity={studentUniversity}
            studentProfilePicture={studentProfilePicture}
            studentDepartment={studentDepartment}
            studentLevel={studentLevel}
            {...props}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default StudentDrawerComponent;
