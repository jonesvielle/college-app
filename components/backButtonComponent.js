import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
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
import {useNavigation} from '@react-navigation/core';
const BackButtonComponent = ({onPress}) => {
  const navigation = useNavigation();
  return (
    <Icon
      onPress={() => {
        navigation.goBack();
      }}
      name="chevron-left"
      size={deviceSize * 0.00009}
      color="black"
      style={{marginTop: '5%'}}
    />
  );
};

export default BackButtonComponent;
