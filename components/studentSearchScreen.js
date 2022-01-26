import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  FlatList,
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
  titleCase,
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
import EmptySearch from '../images/search.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TutorHeaderComponent from './tutorHeaderComponent';
import axios from 'axios';
import StudentLectureCarouselCard from './studentLectureCarouselCard';
import TutorPastQuestionCarouselCard from './tutorPastQuestionCarouselCard';
import StudentPastQuestionCarouselCard from './studentPastQuestionCarouselCard';
import StudentHeaderComponent from './studentHeaderComponent';
import {useNavigation} from '@react-navigation/core';
import StudentCoursesCardComponent from './studentCoursesCardComponent';
import StudentPastQuestionCardComponent from './studentPastQuestionCardComponent';
// import {Picker} from '@react-native-picker/picker';

const StudentSearchScreen = ({route, navigation}) => {
  //   const navigation = useNavigation();
  const {
    studentDepartment,
    studentUniversity,
    studentEmail,
    studentId,
    studentLevel,
    authenticationToken,
    pastQuestionAmount,
    lectureAmount,
  } = route.params;
  const [pastQuestion, setPastQuestion] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [pastQuestionLastId, setPastQuestionLastId] = useState('none');
  const [lectureLastId, setLectureLastId] = useState('none');
  const [updateStates, setUpdateState] = useState({});
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredLectures, setFilteredLectures] = useState([]);
  const [filteredPastQuestions, setFilteredPastQuestions] = useState([]);
  const [selectedMode, setSelectedMode] = useState('');

  //   const [search, setSearch]

  const getData = () => {
    var data = JSON.stringify({
      page_size: 10,
      department: studentDepartment,
      university: studentUniversity,
    });

    var config = {
      method: 'post',
      url:
        'https://collageapi.herokuapp.com/api/get_past_questions_student_full/' +
        pastQuestionLastId,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data.data));
        setPastQuestion(pastQuestion.concat(response.data.data));
        setMasterDataSource(masterDataSource.concat(response.data.data));
        setPastQuestionLastId(response.data.last_id);
        getLectures();
        // setUpdateState({});
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getLectures = () => {
    var data = JSON.stringify({
      page_size: 10,
      department: studentDepartment,
      university: studentUniversity,
    });

    var config = {
      method: 'post',
      url:
        'https://collageapi.herokuapp.com/api/get_lectures_student_full/' +
        pastQuestionLastId,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log('lectures', JSON.stringify(response.data.data));
        setLectures(lectures.concat(response.data.data));
        masterDataSource.concat(response.data.data);
        setLectureLastId(response.data.last_id);
        // masterDataSource.concat()
        // console.log('added array', [1, 2, 3, 4].concat([8, 5, 7, 6]));
        // setUpdateState({});
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const searchLectureFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = lectures.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredLectures(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredLectures(lectures);
      setSearch('');
    }
  };

  const searchPastQuestionFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = pastQuestion.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredPastQuestions(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredPastQuestions(pastQuestion);
      setSearch('');
    }
  };

  const renderItem = ({item}) => (
    <StudentCoursesCardComponent
      route={route}
      navigation={navigation}
      date={item.date}
      title={item.title}
      course_code={item.course_code}
      thumbnail={item.thumbnail}
      id={item.id}
      rating={item.rating}
      tutorProfilePicture={item.tutor_profile_picture}
      tutorName={item.tutor_name}
      preview_video={item.preview_video}
      course_outline={item.course_outline}
      description={item.description}
      studentEmail={studentEmail}
      studentId={studentId}
      studentUniversity={studentUniversity}
      studentLevel={studentLevel}
      tutorId={item.tutor_id}
      authenticationToken={authenticationToken}
      lectureAmount={lectureAmount}
    />
  );

  const renderItem2 = ({item}) => (
    // <StudentPastQuestionCardComponent
    //   //   route={route}
    //   //   navigation={navigation}
    //   date={item.date}
    //   title={item.title}
    //   course_code={item.course_code}
    //   thumbnail={item.thumbnail}
    //   id={item.id}
    //   rating={item.rating}
    //   tutorProfilePicture={item.tutor_profile_picture}
    //   tutorName={item.tutor_name}
    //   pastQuestionAmount={pastQuestionAmount}
    // />
    <StudentPastQuestionCardComponent
      route={route}
      navigation={navigation}
      date={item.date}
      title={item.title}
      course_code={item.course_code}
      thumbnail={item.thumbnail}
      id={item.id}
      rating={item.rating}
      tutorProfilePicture={item.tutor_profile_picture}
      tutorName={item.tutor_name}
      preview_video={item.preview_video}
      // course_outline={item.course_outline}
      // description={item.description}
      studentEmail={studentEmail}
      studentId={studentId}
      studentUniversity={studentUniversity}
      studentLevel={studentLevel}
      tutorId={item.tutor_id}
      authenticationToken={authenticationToken}
      pastQuestionAmount={pastQuestionAmount}
    />
  );

  const chooseSearchToRender = () => {
    if (selectedMode === 'courses') {
      return (
        <View style={{marginTop: '5%'}}>
          {/* <Text
            style={{
              color: 'grey',
              fontSize: dimension.fontScale * 15,
              textAlign: 'center',
            }}>
            Courses
          </Text> */}
          {filteredLectures.length < 1 ? (
            <View
              style={{
                width: '100%',
                paddingVertical: '20%',
                alignItems: 'center',
              }}>
              <Image
                // resizeMethod="scale"
                style={{
                  width: width * 0.1,
                  height: width * 0.1,
                  // borderRadius: deviceSize * 0.0003,
                }}
                source={EmptySearch}
                resizeMode="stretch"
              />
              <Text style={{marginTop: '5%', color: 'grey'}}>
                Try something more matching
              </Text>
            </View>
          ) : (
            <FlatList
              style={{marginTop: '5%'}}
              data={filteredLectures}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              // horizontal={true}
            />
          )}
        </View>
      );
    } else if (selectedMode === 'pastQuestions') {
      return (
        <View style={{marginTop: '5%'}}>
          {/* <Text
            style={{
              color: 'grey',
              fontSize: dimension.fontScale * 15,
              textAlign: 'center',
            }}>
            Past questions
          </Text> */}
          {filteredPastQuestions.length < 1 ? (
            <View
              style={{
                width: '100%',
                paddingVertical: '20%',
                alignItems: 'center',
              }}>
              <Image
                // resizeMethod="scale"
                style={{
                  width: width * 0.1,
                  height: width * 0.1,
                  // borderRadius: deviceSize * 0.0003,
                }}
                source={EmptySearch}
                resizeMode="stretch"
              />
              <Text style={{marginTop: '5%', color: 'grey'}}>
                Try something more matching
              </Text>
            </View>
          ) : (
            <FlatList
              style={{marginTop: '5%'}}
              data={filteredPastQuestions}
              renderItem={renderItem2}
              keyExtractor={(item) => item.id}
              // horizontal={true}
            />
          )}
        </View>
      );
    } else {
      return (
        <View
          style={{
            width: '100%',
            paddingVertical: '20%',
            alignItems: 'center',
          }}>
          <Image
            // resizeMethod="scale"
            style={{
              width: width * 0.1,
              height: width * 0.1,
              // borderRadius: deviceSize * 0.0003,
            }}
            source={EmptySearch}
            resizeMode="stretch"
          />
          <Text style={{marginTop: '5%', color: 'grey'}}>
            Select a search mode
          </Text>
        </View>
      );
    }
  };
  return (
    <View
      style={{flex: 1, backgroundColor: 'white', padding: '5%', width: '100%'}}>
      <View style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
        <Ionicons
          //   onPress={() => {
          //     navigation.goBack();
          //   }}
          style={{marginRight: '5%'}}
          name="chevron-back-outline"
          size={deviceSize * 0.00012}
          color={'grey'}
        />
        <TextInput
          autoFocus={true}
          onChangeText={(text) => {
            if (selectedMode === 'courses') {
              searchLectureFilterFunction(text);
            } else if (selectedMode === 'pastQuestions') {
              searchPastQuestionFilterFunction(text);
            } else {
              console.warn('none');
            }
          }}
          placeholder={'Search'}
          style={{
            // backgroundColor: 'red',
            width: '80%',
            paddingHorizontal: '5%',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'grey',
          }}
        />
      </View>
      <View style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
        <Ionicons
          //   onPress={() => {
          //     navigation.goBack();
          //   }}
          style={{marginRight: '5%', width: '10%'}}
          name="funnel-outline"
          size={deviceSize * 0.00008}
          color={'grey'}
        />
        <Picker
          style={{width: '85%'}}
          selectedValue={selectedMode}
          onValueChange={(itemValue, itemIndex) => setSelectedMode(itemValue)}>
          <Picker.Item
            label="Select search filter mode"
            value="java"
            style={{color: 'grey'}}
          />
          <Picker.Item
            label="Courses"
            value="courses"
            style={{color: 'grey'}}
          />
          <Picker.Item
            label="Past questions"
            value="pastQuestions"
            style={{color: 'grey'}}
          />
        </Picker>
      </View>
      <View
        style={{
          backgroundColor: 'grey',
          height: 1,
          width: '100%',
          marginLeft: 0,
        }}></View>
      {chooseSearchToRender()}
    </View>
  );
};

export default StudentSearchScreen;
