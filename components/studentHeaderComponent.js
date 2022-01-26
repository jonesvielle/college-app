import React from 'react';
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
  dimension,
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
import Brand from '../images/lot.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/core';
const StudentHeaderComponent = ({
  title,
  onPressSearch,
  notShowSearch,
  isHomesScreen,
}) => {
  //   const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Image
        style={{
          width: width * 0.1,
          height: width * 0.1,
        }}
        source={Brand}
        resizeMode="center"
      />
      <View style={{flexDirection: 'row'}}>
        {/* <Ionicons
          onPress={onPressSearch}
          name="search"
          size={deviceSize * 0.00008}
          color={isHomesScreen ? 'white' : 'grey'}
        /> */}
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: dimension.fontScale * 17,
            color: isHomesScreen ? 'white' : 'black',
          }}>
          {title.toUpperCase()}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '20%',
          backgroundColor: isHomesScreen ? 'rgba(0,0,0,0)' : 'white',
          justifyContent: 'flex-end',
        }}>
        {notShowSearch ? (
          <></>
        ) : (
          <Ionicons
            onPress={onPressSearch}
            style={{marginRight: '40%'}}
            name="search"
            size={deviceSize * 0.00008}
            color={isHomesScreen ? 'white' : 'grey'}
          />
        )}
        <Ionicons
          name="notifications-outline"
          size={deviceSize * 0.00008}
          color={isHomesScreen ? 'white' : 'grey'}
        />
      </View>
    </View>
  );
};

export default StudentHeaderComponent;
