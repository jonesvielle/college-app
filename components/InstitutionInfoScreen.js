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
import PickerComponent from './pickerComponent';
import Axios from 'axios';
// import axios from 'axios';
import BackButtonComponent from './backButtonComponent';

const InstitutionInfoScreen = ({route, navigation}) => {
  const {email, password} = route.params;
  const university = ['fupre', 'uniben'];
  // console.log('route', password);
  const [selectedValue, setSelectedValue] = useState('');
  const [continueButtonDisabled, setContinueButtonDisabled] = useState(true);
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    Axios({
      method: 'post',
      url: 'http://collageapi.herokuapp.com/api/get_universities/',
    })
      .then((res) => {
        console.log(res.data.message);
        setUniversities(res.data.message);
      })
      .catch((e) => {
        console.log('error', e);
      });
  }, []);

  const pickerFunction = (itemValue, itemIndex) => {
    setSelectedValue(itemValue);
    if (itemValue.length > 0) {
      setContinueButtonDisabled(false);
    } else {
      setContinueButtonDisabled(true);
    }
  };
  return (
    <View
      style={{
        padding: '5%',
        // padding: '10%',
        backgroundColor: 'white',
        height: height,
        // justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          marginTop: '5%',
          width: width * 0.9,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <BackButtonComponent
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={{color: 'rgb(114, 112, 112)'}}>Step 2/3</Text>
      </View>
      <View
        style={{
          // backgroundColor: 'blue',
          marginTop: '10%',
          // marginLeft: '5%',
          flexDirection: 'row',
          alignItems: 'center',
          width: width * 0.85,
        }}>
        <Text style={{fontSize: deviceSize * 0.00009}}>Institution</Text>
        <Image
          style={{width: width * 0.15, height: height * 0.05}}
          source={Emoji}
          resizeMode="center"
        />
      </View>
      <View style={{marginBottom: height * 0.5, width: '100%'}}>
        <View
          style={{marginTop: '10%', width: width * 0.85, marginBottom: '5%'}}>
          <Text style={{color: 'rgb(114, 112, 112)'}}>Institution</Text>
        </View>
        <PickerComponent
          placeholder="Select school"
          selectedValue={selectedValue}
          pickerFunction={pickerFunction}
          itemList={universities}
        />
      </View>

      <ButtonComponent
        onPress={() => {
          navigation.navigate('TutorPersonalInfoScreen', {
            university: selectedValue,
            email: email,
            password: password,
          });
        }}
        buttonText="Continue"
        isDisabled={continueButtonDisabled}
      />
    </View>
  );
};

export default InstitutionInfoScreen;
