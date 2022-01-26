import React from 'react';
import {Dimensions, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const dimension = Dimensions.get('window');
export const deviceSize = dimension.width * dimension.height;
export const height = dimension.height;
export const width = dimension.width;
export const brandColor = '#fb3846';
export const darkTextColor = '#2F2E41';
export const paystackApi = 'pk_live_5695b4545f2c18e250b7ed5721839a289740b0ff';
export const apiDomain = 'https://collageapi.herokuapp.com';
export const errorHandler = (error) => {
  if (error.response !== undefined) {
    // setNetworkError(false);
    // setIsWrongPassword(true);
    ToastAndroid.show(
      error.response.data.message.toUpperCase(),
      ToastAndroid.LONG,
    );
    return error.response.data.message.toUpperCase();
  } else {
    // setIsWrongPassword(false);
    // setNetworkError(true);
    ToastAndroid.show(
      'SOMETHING WENT WRONG, CHECK YOUR CONNECTION',
      ToastAndroid.LONG,
    );
    return 'SOMETHING WENT WRONG, CHECK YOUR CONNECTION';
  }
};
export const retrieveToken = async (setState) => {
  try {
    const value = await AsyncStorage.getItem('@authentication_token');
    console.log(value);
    if (value !== null) {
      // console.log(value);
      // setState(value);
      return value;
    } else {
      return null;
    }
  } catch (error) {
    console.log('error', error);
  }
};

export const storeToken = async () => {
  try {
    await AsyncStorage.setItem('@authentication_token', 'dog');
  } catch (error) {
    console.log(error);
  }
};

export const deleteToken = async () => {
  try {
    await AsyncStorage.removeItem('@authentication_token');
  } catch (error) {
    console.log(error);
  }
};
export const studentSignUpAs = () => {
  console.warn('students sign up');
};

export const tutorSignUpAs = () => {
  console.warn('tutor sign up');
};
export const studentLoginAs = () => {
  console.warn('students login');
};

export const tutorLoginAs = () => {
  console.warn('tutor login');
};

export const checkInputLength = (maxLength, string) => {
  if (string.length > maxLength) {
    return true;
  } else {
    return false;
  }
};

export const awsOptions = (contentType) => {
  return {
    keyPrefix: 'videos/',
    bucket: 'collageapi',
    region: 'us-east-1',
    accessKey: 'AKIAJAHIH4DNH2RHQKVA',
    secretKey: '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',
    successActionStatus: 201,
    // contentType: {},
  };
};

export const checkUpperCase = (string) => {
  return /[A-Z]/.test(string);
};

export const checkNumber = (string) => {
  return /\d/.test(string);
};

export const titleCase = (str) => {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(' ');
};
