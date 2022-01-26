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

const AddLectureObjectiveScreen = ({route, navigation}) => {
  const {title, description, university, authenticationToken} = route.params;
  // console.log('title', title);
  const [courseObjective, setCourseObjective] = useState([]);
  const [objectiveValue, setObjectiveValue] = useState('');
  const [updateStates, setUpdateStates] = useState({});
  // const [value, setValue] = useState('');
  // const objectiveArray = ['r', 'r'];

  useEffect(() => {}, [courseObjective]);

  const handleOnChangeObjective = (e) => {
    console.log(e);
    setObjectiveValue(e);
  };

  const addCourseObjective = () => {
    // alert('course object');
    if (objectiveValue.length > 0) {
      setCourseObjective(courseObjective.concat(objectiveValue));
      setObjectiveValue('');
    }
  };
  const handleObjectiveDelete = (value) => {
    // alert(value);
    courseObjective.splice(value, 1);
    // setCourseObjective(newObjectives);
    setUpdateStates({});
  };
  const handleContinueButton = () => {
    if (courseObjective.length < 1) {
      alert('add atleast one objective');
    } else {
      navigation.navigate('CourseTargetScreen', {
        title,
        description,
        courseObjective,
        university,
        authenticationToken,
      });
    }
  };
  return (
    // <View
    //   style={{
    //     //   flexGrow: 1,
    //     // padding: '10%',
    //     backgroundColor: 'white',
    //     height: height,
    //     //   justifyContent: 'center',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //   }}>
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
        <Text style={{color: 'rgb(114, 112, 112)'}}>Step 2/5</Text>
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
          What will students learn
        </Text>
        <Image
          style={{width: width * 0.15, height: height * 0.05}}
          source={Emoji}
          resizeMode="center"
        />
      </View>

      <View
        style={{
          width: width * 0.8,
          marginTop: '10%',
          flexDirection: 'column',
        }}>
        {courseObjective.map((c, i) => (
          <TextInputComponent
            multiline
            showDelete
            value={c}
            editable={false}
            deleteHandler={() => {
              handleObjectiveDelete(i);
            }}
          />
        ))}
      </View>
      <View
        style={{width: width * 0.8, marginTop: '10%', flexDirection: 'row'}}>
        <TextInputComponent
          placeHolder="Enter course objective"
          activeState={true}
          value={objectiveValue}
          // showCounter={true}
          // counterValue={counterValue}
          // onFocus={true}
          // editable={titleEditable}
          onChange={handleOnChangeObjective}
          // maxLength={32}
          // value={titleValue}
        />
      </View>
      <View style={{width: width * 0.8}}>
        <TouchableOpacity
          onPress={addCourseObjective}
          style={{
            marginTop: '5%',
            width: '35%',
            flexDirection: 'row',
            alignItems: 'center',
            // backgroundColor: 'blue',
          }}>
          <Ionicons
            name="add-circle"
            size={deviceSize * 0.0001}
            color={brandColor}
          />
          <Text
            style={{marginLeft: '2%', color: brandColor, fontWeight: 'bold'}}>
            Add new
          </Text>
        </TouchableOpacity>
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
    // </View>
  );
};

export default AddLectureObjectiveScreen;
