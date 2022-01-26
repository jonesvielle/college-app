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
import Ionicons from 'react-native-vector-icons/Ionicons';
import PickerComponent from './pickerComponent';
import Axios from 'axios';
const FinalCourseTargetScreen = ({route, navigation}) => {
  const {
    title,
    description,
    courseObjective,
    university,
    selectedLevel,
    selectedFaculty,
    department,
    authenticationToken,
  } = route.params;
  const [updateStates, setUpdateStates] = useState({});
  const [courseCode, setCourseCode] = useState([]);
  const [courseCodee, setCourseCodee] = useState([]);
  const [selectedCourseCode, setSelectedCourseCode] = useState('');
  const list = ['engineering', 'science'];
  const list1 = ['MEE321', 'CHE511'];
  const list2 = ['100', '200', '300', '400', '500'];
  const facultyList = [];
  const departments = [
    'all',
    'mechanical engineering',
    'chemical engineering',
    'marine engineering',
  ];
  // console.log('uniiiiii', university);
  const fetchCourseCode = () => {
    var data = JSON.stringify({
      university: university,
      faculty_name: selectedFaculty,
      department: department,
    });

    var config = {
      method: 'post',
      url: 'https://collageapi.herokuapp.com/api/get_courses/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data.message));
        // setCourseCode(response.data.message);
        response.data.message.map((c) => {
          courseCodee.push(c.course_code);
        });
        // setCourseCode(courseCodee);
        console.log('done');
        setUpdateStates({});
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCourseCode();
  }, []);
  const courseCodePickerFunction = (itemValue, itemIndex) => {
    setCourseCode(itemValue);
    console.log(itemValue);
  };

  const handleContinueButton = () => {
    if (courseCode.length < 1) {
      alert('fill all fields');
    } else {
      //   alert('continue');
      navigation.navigate('CourseOutlineScreen', {
        authenticationToken,
        selectedFaculty,
        department,
        selectedLevel,
        title,
        description,
        university,
        courseObjective,
        courseCode,
      });
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={{flex: 1, backgroundColor: 'white'}}
      contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
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
        <Text style={{color: 'rgb(114, 112, 112)'}}>Step 3/5</Text>
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
          Who is this course for
        </Text>
        <Image
          style={{width: width * 0.15, height: height * 0.05}}
          source={Emoji}
          resizeMode="center"
        />
      </View>
      <View style={{marginTop: '5%', width: width * 0.8}}>
        <View style={{marginBottom: '5%'}}>
          <Text>Course code</Text>
        </View>
        <PickerComponent
          itemList={courseCodee}
          placeholder={'Enter course code'}
          pickerFunction={courseCodePickerFunction}
          selectedValue={courseCode}
        />
      </View>

      {/* <View style={{marginTop: '10%', width: width * 0.8}}>
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
        </View> */}
      <View
        style={{
          width: width * 0.8,
          // backgroundColor: 'blue',
          alignItems: 'flex-end',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: '20%',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            width: '30%',
            marginTop: '10%',
            backgroundColor: 'white',
            paddingHorizontal: '9%',
            paddingVertical: '3%',
            borderRadius: deviceSize * 0.0005,
            borderColor: brandColor,
            borderWidth: 2,
            //   color: brandColor,
          }}>
          <Text style={{color: brandColor}}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleContinueButton}
          style={{
            width: '30%',
            marginTop: '10%',
            backgroundColor: brandColor,
            paddingHorizontal: '9%',
            paddingVertical: '3%',
            borderRadius: deviceSize * 0.0005,
          }}>
          <Text style={{color: 'white'}}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FinalCourseTargetScreen;
