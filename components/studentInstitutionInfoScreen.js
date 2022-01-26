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
import NoNetworkModalComponent from './NoNetworkModalComponent';

const StudentInstitutionInfoScreen = ({route, navigation}) => {
  const {email, password} = route.params;
  const university = ['fupre', 'uniben'];
  // console.log('route', password);
  const [selectedValue, setSelectedValue] = useState('');
  const [continueButtonDisabled, setContinueButtonDisabled] = useState(true);
  const [universities, setUniversities] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [updateState, setUpdateState] = useState({});
  const [showNoNetworkModal, setShowNoNetworkModal] = useState(false);

  const levels = ['100', '200', '300', '400', '500', 'POST UTME'];

  const reloadScreen = () => {
    setShowNoNetworkModal(false);
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
        if (e.toJSON().message === 'Network Error') {
          // alert('no internet connection');
          // dispatch({type: RELOAD});
          setShowNoNetworkModal(true);
        }
      });
  };

  const getDepartments = (faculty) => {
    console.log('started');
    var data = JSON.stringify({
      university: selectedValue,
      //   university: 'uniben',
      faculty_name: faculty,
    });

    var config = {
      method: 'post',
      url: 'https://collageapi.herokuapp.com/api/get_department/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data.message));
        response.data.message.map((c) => {
          departments.push(c.department);
        });
        setUpdateState({});
      })
      .catch(function (error) {
        console.log(error);
        if (error.toJSON().message === 'Network Error') {
          // alert('no internet connection');
          setShowNoNetworkModal(true);
        }
      });
  };

  const getFaculties = (university) => {
    var data = JSON.stringify({
      university: university,
    });
    // console.log('faculty list', facultyList);

    var config = {
      method: 'post',
      url: 'https://collageapi.herokuapp.com/api/get_faculty/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log('falculty data', JSON.stringify(response.data.message));
        // console.log('type', typeof response.data.message);
        // setFaculties(response.data.message);
        response.data.message.map((c) => {
          faculties.push(c.faculty_name);
        });
        setUpdateState({});
      })
      .catch(function (error) {
        console.log(error);
        if (error.toJSON().message === 'Network Error') {
          // alert('no internet connection');
          // dispatch({type: RELOAD});
          setShowNoNetworkModal(true);
        }
      });
  };

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
        if (e.toJSON().message === 'Network Error') {
          // alert('no internet connection');
          // dispatch({type: RELOAD});
          setShowNoNetworkModal(true);
        }
      });
  }, []);

  const pickerFunction = async (itemValue, itemIndex) => {
    setSelectedValue(itemValue);
    getFaculties(itemValue);
    if (
      itemValue.length > 0 &&
      selectedDepartment.length > 0 &&
      selectedFaculty.length > 0 &&
      selectedLevel.length > 0
    ) {
      setContinueButtonDisabled(false);
    } else {
      setContinueButtonDisabled(true);
    }
  };

  const facultyPickerFunction = (itemValue, itemIndex) => {
    setSelectedFaculty(itemValue);
    getDepartments(itemValue);
    if (
      itemValue.length > 0 &&
      selectedDepartment.length > 0 &&
      selectedValue.length > 0 &&
      selectedLevel.length > 0
    ) {
      setContinueButtonDisabled(false);
    } else {
      setContinueButtonDisabled(true);
    }
  };

  const departmentPickerFunction = (itemValue, itemIndex) => {
    setSelectedDepartment(itemValue);
    if (
      itemValue.length > 0 &&
      selectedValue.length > 0 &&
      selectedFaculty.length > 0 &&
      selectedLevel.length > 0
    ) {
      setContinueButtonDisabled(false);
    } else {
      setContinueButtonDisabled(true);
    }
  };

  const levelPickerFunction = (itemValue, itemIndex) => {
    setSelectedLevel(itemValue);
    if (
      itemValue.length > 0 &&
      selectedDepartment.length > 0 &&
      selectedFaculty.length > 0 &&
      selectedValue.length > 0
    ) {
      setContinueButtonDisabled(false);
    } else {
      setContinueButtonDisabled(true);
    }
  };
  return (
    <ScrollView
      style={{flex: 1, backgroundColor: 'white'}}
      contentContainerStyle={{flexGrow: 1}}>
      <NoNetworkModalComponent
        showModal={showNoNetworkModal}
        refreshHandler={reloadScreen}
      />
      <View
        style={{
          padding: '5%',
          // padding: '10%',
          backgroundColor: 'white',
          //   height: height,
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
        <View style={{marginBottom: '10%', width: '100%', marginTop: '10%'}}>
          <View style={{width: width * 0.85, marginBottom: '5%'}}>
            <Text style={{color: 'rgb(114, 112, 112)'}}>Institution</Text>
          </View>
          <PickerComponent
            placeholder="Select school"
            selectedValue={selectedValue}
            pickerFunction={pickerFunction}
            itemList={universities}
          />
        </View>

        <View style={{marginBottom: '10%', width: '100%'}}>
          <View style={{width: width * 0.85, marginBottom: '5%'}}>
            <Text style={{color: 'rgb(114, 112, 112)'}}>Faculty</Text>
          </View>
          <PickerComponent
            placeholder="Select faculty"
            selectedValue={selectedFaculty}
            pickerFunction={facultyPickerFunction}
            itemList={faculties}
          />
        </View>

        <View style={{marginBottom: '10%', width: '100%'}}>
          <View style={{width: width * 0.85, marginBottom: '5%'}}>
            <Text style={{color: 'rgb(114, 112, 112)'}}>Department</Text>
          </View>
          <PickerComponent
            placeholder="Select department"
            selectedValue={selectedDepartment}
            pickerFunction={departmentPickerFunction}
            itemList={departments}
          />
        </View>

        <View style={{marginBottom: '10%', width: '100%'}}>
          <View style={{width: width * 0.85, marginBottom: '5%'}}>
            <Text style={{color: 'rgb(114, 112, 112)'}}>Level</Text>
          </View>
          <PickerComponent
            placeholder="Select level"
            selectedValue={selectedLevel}
            pickerFunction={levelPickerFunction}
            itemList={levels}
          />
        </View>

        <ButtonComponent
          onPress={() => {
            navigation.navigate('StudentPersonalInfoScreen', {
              university: selectedValue,
              email: email,
              password: password,
              selectedDepartment,
              selectedFaculty,
              selectedLevel,
            });
          }}
          buttonText="Continue"
          isDisabled={continueButtonDisabled}
        />
      </View>
    </ScrollView>
  );
};

export default StudentInstitutionInfoScreen;
