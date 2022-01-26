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
import TextInputComponent from './TextInputComponent';
import {Bubbles} from 'react-native-loader';
const ButtonComponent = ({buttonText, isDisabled, onPress, showLoader}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      style={{
        width: width * 0.85,
        alignItems: 'center',
        paddingVertical: '4%',
        backgroundColor: isDisabled ? '#fb384546' : brandColor,
        justifyContent: 'center',
        borderRadius: height,
      }}>
      {showLoader ? (
        <View style={{marginVertical: '1%'}}>
          <Bubbles size={width * 0.015} color="#FFF" />
        </View>
      ) : (
        <>
          <Text style={{color: 'white', fontWeight: 'bold'}}>{buttonText}</Text>
        </>
      )}

      {isDisabled ? (
        <Text style={{color: 'white'}}>
          (please fill all required fields properly)
        </Text>
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
};

export default ButtonComponent;
