import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
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
  dimension,
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
import ButtonComponent from './buttonComponent';
import BackButtonComponent from './backButtonComponent';

const AddLecturesScreen = ({route, navigation}) => {
  const {university, authenticationToken} = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [counterValue, setCounterValue] = useState(32);
  const [titleEditable, setTitleEditable] = useState(true);
  // const [value, setValue]
  const handleOnChangeTitle = (e) => {
    // if (e.length < 33) {
    console.log(e);
    setTitle(e);
    setCounterValue(32 - e.length);
    // }
  };
  const handleOnChangeDescription = (e) => {
    console.log(e);
    setDescription(e);
  };
  const handleContinueButton = () => {
    if (title.length < 1 || description.length < 1) {
      alert('fill necessary details');
    } else {
      navigation.navigate('AddLectureObjectiveScreen', {
        title,
        description,
        university,
        authenticationToken,
      });
    }
  };
  return (
    <ScrollView style={{height: height}}>
      <View
        style={{
          // padding: '10%',
          backgroundColor: 'white',
          height: height,
          //   justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            marginTop: '5%',
            width: width * 0.85,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // backgroundColor: 'blue',
          }}>
          <BackButtonComponent
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={{color: 'rgb(114, 112, 112)'}}>Step 1/5</Text>
        </View>
        <View
          style={{
            // backgroundColor: 'green',
            marginTop: '10%',
            // marginLeft: '5%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: width * 0.8,
          }}>
          <Text style={{fontSize: dimension.fontScale * 20}}>
            Tell us about the course
          </Text>
          <Image
            style={{width: width * 0.15, height: height * 0.05}}
            source={Emoji}
            resizeMode="center"
          />
        </View>
        <View style={{marginTop: '10%', width: width * 0.8}}>
          <View>
            <Text>Title</Text>
          </View>
          <TextInputComponent
            placeHolder="Enter course title"
            activeState={true}
            showCounter={true}
            counterValue={counterValue}
            // onFocus={true}
            // editable={titleEditable}
            onChange={handleOnChangeTitle}
            maxLength={32}
            // value={titleValue}
          />
        </View>
        <View style={{marginTop: '10%', width: width * 0.8}}>
          <View>
            <Text>Description</Text>
          </View>
          <TextInputComponent
            placeHolder="Enter course description"
            activeState={true}
            // showCounter={true}
            // counterValue={counterValue}
            // onFocus={true}
            // editable={titleEditable}
            onChange={handleOnChangeDescription}
            // maxLength={32}
            lines={5}
            multiline={true}
            // value={titleValue}
          />
        </View>
        <View
          style={{
            width: width * 0.8,
            // backgroundColor: 'blue',
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={handleContinueButton}
            style={{
              width: '30%',
              marginTop: '60%',
              backgroundColor: brandColor,
              paddingHorizontal: '9%',
              paddingVertical: '3%',
              borderRadius: deviceSize * 0.0005,
            }}>
            <Text style={{color: 'white'}}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddLecturesScreen;
