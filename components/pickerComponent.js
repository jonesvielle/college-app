import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
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
} from './modules';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Picker} from '@react-native-picker/picker';
import TutorActiveImage from '../images/tutorActive.png';
import TutorInactiveImage from '../images/tutorInactive.png';
import StudentActiveImage from '../images/studentActive.png';
import StudentInactiveImage from '../images/studentInactive.png';
import LoginAsTutorImage from '../images/lot.png';
import Emoji from '../images/schoolStudent.png';
import LoginAsComponent from './signUpAsComponent';
import TextInputComponent from './TextInputComponent';
import ButtonComponent from './buttonComponent';

const PickerComponent = ({
  selectedValue,
  pickerFunction,
  itemList,
  placeholder,
  rounded,
}) => {
  // conso
  return (
    <View
      style={{
        // marginTop: '5%',
        width: '100%',
        borderWidth: deviceSize * 0.0000025,
        borderRadius: rounded ? 10 : 0,
        borderColor: rounded ? 'grey' : 'black',
      }}>
      <Picker
        selectedValue={selectedValue}
        itemStyle={{color: 'red'}}
        onValueChange={pickerFunction}>
        <Picker.Item
          label={placeholder}
          style={{color: 'rgb(114, 112, 112)'}}
          value=""
        />
        {itemList.map((c, i) => (
          <Picker.Item
            key={i}
            label={c}
            style={{color: 'rgb(114, 112, 112)'}}
            value={c}
          />
        ))}
      </Picker>
    </View>
  );
};

export default PickerComponent;
