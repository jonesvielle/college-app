import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import TutorHeaderComponent from './tutorHeaderComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Axios from 'axios';
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
import CoursesCardComponent from './coursesCardComponent';
import EmptyCourses from '../images/emptyCourses.png';

const TutorCoursesScreen = ({route, authenticationToken, navigation}) => {
  const {university} = route.params;
  const [lectures, setLectures] = useState([]);
  useEffect(() => {
    Axios({
      method: 'post',
      url: 'http://collageapi.herokuapp.com/api/get_lectures_tutor/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        token: authenticationToken,
      }),
    })
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setLectures(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const renderItem = ({item}) => (
    <CoursesCardComponent
      route={route}
      navigation={navigation}
      date={item.date}
      title={item.title}
      course_code={item.course_code}
      thumbnail={item.thumbnail}
      id={item.id}
      rating={item.rating}
      authenticationToken={authenticationToken}
    />
  );
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: height,
        padding: '5%',
        width: width,
      }}>
      <TutorHeaderComponent title="My courses" />
      {/* <FlatList
        style={{marginTop: '10%'}}
        data={lectures}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        // horizontal={true}
      /> */}
      {lectures < 1 ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: height * 0.5,
          }}>
          <Image
            style={{
              width: width * 0.4,
              height: width * 0.4,
            }}
            source={EmptyCourses}
            resizeMode="center"
          />
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text>You have not published any course.</Text>
            <Text
              style={{fontWeight: 'bold', color: brandColor}}
              onPress={() => {
                navigation.navigate('AddLecturesScreen', {
                  university,
                  authenticationToken,
                });
              }}>
              Click to add.
            </Text>
          </View>
        </View>
      ) : (
        <FlatList
          style={{marginTop: '10%'}}
          data={lectures}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          // horizontal={true}
        />
      )}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddLecturesScreen', {
            university,
            authenticationToken,
          });
        }}
        style={{
          position: 'absolute',
          padding: '4%',
          backgroundColor: brandColor,
          // width: width * 0.2,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: height * 0.8,
          borderRadius: deviceSize * 0.3,
          marginLeft: '80%',
          shadowColor: brandColor,
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.41,
          shadowRadius: 9.11,

          elevation: 5,
        }}>
        <Ionicons name="add" size={deviceSize * 0.0001} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

export default TutorCoursesScreen;
