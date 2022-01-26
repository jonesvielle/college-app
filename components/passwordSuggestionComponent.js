import React from 'react';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import {
  deviceSize,
  height,
  width,
  brandColor,
  studentLoginAs,
  tutorLoginAs,
} from './modules';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TutorActiveImage from '../images/tutorActive.png';
import TutorInactiveImage from '../images/tutorInactive.png';
import StudentActiveImage from '../images/studentActive.png';
import StudentInactiveImage from '../images/studentInactive.png';
import LoginAsTutorImage from '../images/lot.png';
import Emoji from '../images/macbookBoy.png';
import LoginAsComponent from './signUpAsComponent';
const PasswordSuggestionComponent = ({show, content}) => {
  return (
    <>
      {show ? (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              marginTop: '5%',
              width: width * 0.07,
              height: height * 0.032,
              // backgroundColor: 'red',
              padding: '2%',
              borderRadius: deviceSize,
              borderWidth: deviceSize * 0.000003,
            }}></View>
          <Text style={{marginHorizontal: '5%', marginTop: '5%'}}>
            {content}
          </Text>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default PasswordSuggestionComponent;
