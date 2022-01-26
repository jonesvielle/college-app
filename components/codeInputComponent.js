import React, {useState} from 'react';
import {View, Text, KeyboardAvoidingView, TextInput} from 'react-native';
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
  dimension,
} from './modules';

const CodeInputComponent = ({
  input1Active,
  input2Active,
  input3Active,
  input4Active,
  onChangeInput1,
  onChangeInput2,
  onChangeInput3,
  onChangeInput4,
  onFocusInput1,
  onFocusInput2,
  onFocusInput3,
  onFocusInput4,
  input1,
  input2,
  input3,
  input4,
}) => {
  return (
    <View
      style={{
        marginBottom: height * 0.02,
        flexDirection: 'row',
        width: width * 0.85,
        marginTop: height * 0.02,
        justifyContent: 'space-between',
      }}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          borderColor: input1Active ? brandColor : 'rgb(114, 112, 112)',
          borderWidth: deviceSize * 0.0000025,
          backgroundColor: 'white',
          borderRadius: deviceSize * 0.00002,
          width: width * 0.15,
          marginHorizontal: width * 0.02,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,

          elevation: input1Active ? 6 : 0,
        }}>
        <TextInput
          onChangeText={onChangeInput1}
          onFocus={onFocusInput1}
          maxLength={1}
          style={{fontSize: dimension.fontScale * 25}}
          textAlign="center"
          keyboardType="numeric"
        />
      </KeyboardAvoidingView>
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          borderColor: input2Active ? brandColor : 'rgb(114, 112, 112)',
          borderWidth: deviceSize * 0.0000025,
          backgroundColor: 'white',
          borderRadius: deviceSize * 0.00002,
          width: width * 0.15,
          marginHorizontal: width * 0.02,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,

          elevation: input2Active ? 6 : 0,
        }}>
        <TextInput
          onChangeText={onChangeInput2}
          onFocus={onFocusInput2}
          maxLength={1}
          style={{fontSize: dimension.fontScale * 25}}
          textAlign="center"
          keyboardType="numeric"
        />
      </KeyboardAvoidingView>
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          //   backgroundColor: 'blue',
          borderColor: input3Active ? brandColor : 'rgb(114, 112, 112)',
          borderWidth: deviceSize * 0.0000025,
          width: width * 0.15,
          marginHorizontal: width * 0.02,
          backgroundColor: 'white',
          borderRadius: deviceSize * 0.00002,
          width: width * 0.15,
          marginHorizontal: width * 0.02,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,

          elevation: input3Active ? 6 : 0,
        }}>
        <TextInput
          onChangeText={onChangeInput3}
          onFocus={onFocusInput3}
          maxLength={1}
          style={{fontSize: dimension.fontScale * 25}}
          textAlign="center"
          keyboardType="numeric"
        />
      </KeyboardAvoidingView>
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          //   backgroundColor: 'blue',
          width: width * 0.15,
          marginHorizontal: width * 0.02,
          borderColor: input4Active ? brandColor : 'rgb(114, 112, 112)',
          borderWidth: deviceSize * 0.0000025,
          backgroundColor: 'white',
          borderRadius: deviceSize * 0.00002,
          width: width * 0.15,
          marginHorizontal: width * 0.02,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,

          elevation: input4Active ? 6 : 0,
        }}>
        <TextInput
          onChangeText={onChangeInput4}
          onFocus={onFocusInput4}
          maxLength={1}
          style={{fontSize: dimension.fontScale * 25}}
          textAlign="center"
          keyboardType="numeric"
        />
      </KeyboardAvoidingView>
      {/* <Text>{verificationCode}</Text> */}
    </View>
  );
};

export default CodeInputComponent;
