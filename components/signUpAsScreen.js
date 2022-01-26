import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {
  deviceSize,
  height,
  width,
  brandColor,
  studentSignUpAs,
  tutorSignUpAs,
} from './modules';
import TutorActiveImage from '../images/tutorActive.png';
import TutorInactiveImage from '../images/tutorInactive.png';
import StudentActiveImage from '../images/studentActive.png';
import StudentInactiveImage from '../images/studentInactive.png';
import SignUpAsComponent from './signUpAsComponent';

const SignUpAsScreen = ({navigation}) => {
  const [studentActiveState, setStudentActiveState] = useState(true);
  const [tutorActiveState, setTutorActiveState] = useState(false);
  const studentActive = () => {
    // console.warn('cool student');
    setStudentActiveState(true);
    setTutorActiveState(false);
  };
  const tutorActive = () => {
    // console.warn('cool tutor');
    setStudentActiveState(false);
    setTutorActiveState(true);
  };
  return (
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
          // backgroundColor: 'yellow',
          marginTop: height * 0.06,
          paddingTop: '10%',
          paddingBottom: '5%',
          width: width * 0.9,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: deviceSize * 0.00009,
            marginBottom: '2%',
          }}>
          Sign Up As
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'rgb(114, 112, 112)'}}>
            Already have an account?
          </Text>
          <TouchableOpacity
            style={{marginLeft: '1%'}}
            onPress={() => {
              navigation.navigate('LoginAsScreen', {
                navigation: navigation,
              });
            }}>
            <Text style={{color: '#fb3846', fontWeight: 'bold'}}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <SignUpAsComponent
        iconPress={() => {
          navigation.navigate('StudentSignUpScreen');
        }}
        activeState={studentActiveState}
        onPressIn={studentActive}
        // icon={}
        description="Student account to have access to the courses"
        title="Student"
        borderColor={brandColor}
        backgroundColor="rgb(255, 246, 246)"
        activeIcon={StudentActiveImage}
        inactiveIcon={StudentInactiveImage}
      />
      <SignUpAsComponent
        iconPress={() => {
          navigation.navigate('TutorSignUpScreen');
        }}
        activeState={tutorActiveState}
        onPressIn={tutorActive}
        // icon={SignUpAsTutorImage}
        description="Have your courses hosted in the platform"
        title="Tutor"
        borderColor={brandColor}
        backgroundColor="rgb(255, 246, 246)"
        activeIcon={TutorActiveImage}
        inactiveIcon={TutorInactiveImage}
      />
    </View>
  );
};

export default SignUpAsScreen;
