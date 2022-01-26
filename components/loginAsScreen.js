import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {
  deviceSize,
  height,
  width,
  brandColor,
  // studentLoginAs,
  // tutorLoginAs,
} from './modules';
import TutorActiveImage from '../images/tutorActive.png';
import TutorInactiveImage from '../images/tutorInactive.png';
import StudentActiveImage from '../images/studentActive.png';
import StudentInactiveImage from '../images/studentInactive.png';
import LoginAsTutorImage from '../images/lot.png';
import LoginAsComponent from './signUpAsComponent';

const LoginAsScreen = ({route, navigation}) => {
  // console.log('route', route.params.navigation);
  console.log('navigation', navigation);
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
  const tutorLoginAs = () => {
    navigation.navigate('TutorLoginScreen');
  };
  const studentLoginAs = () => {
    navigation.navigate('StudentLoginScreen');
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
          Login As
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'rgb(114, 112, 112)'}}>
            I don't have an account?
          </Text>
          <TouchableOpacity
            style={{marginLeft: '1%'}}
            onPress={() => {
              navigation.navigate('SignUpAsScreen');
            }}>
            <Text style={{color: '#fb3846', fontWeight: 'bold'}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <LoginAsComponent
        iconPress={studentLoginAs}
        activeState={studentActiveState}
        onPressIn={studentActive}
        // icon={LoginAsTutorImage}
        description="Student account to have access to the courses"
        title="Student"
        borderColor={brandColor}
        backgroundColor="rgb(255, 246, 246)"
        activeIcon={StudentActiveImage}
        inactiveIcon={StudentInactiveImage}
      />
      <LoginAsComponent
        iconPress={tutorLoginAs}
        activeState={tutorActiveState}
        onPressIn={tutorActive}
        // icon={LoginAsTutorImage}
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

export default LoginAsScreen;
