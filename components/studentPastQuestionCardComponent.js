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
import Moment from 'moment';

const StudentPastQuestionCardComponent = ({
  //   route,
  title,
  course_code,
  thumbnail,
  id,
  rating,
  date,
  navigation,
  preview_video,
  // course_outline,
  description,
  studentEmail,
  studentId,
  studentUniversity,
  studentLevel,
  tutorId,
  authenticationToken,
  tutorProfilePicture,
  tutorName,
  pastQuestionAmount,
}) => {
  const checkSubscription = () => {
    // console.log('id,', id);
    var data = JSON.stringify({
      token: authenticationToken,
      past_questions_id: id,
    });

    var config = {
      method: 'post',
      url: 'https://collageapi.herokuapp.com/api/check_past_questions_subscription/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data.message));
        // handleSubscribe();
        navigation.navigate('StudentPastQuestionAccessScreen', {
          lecture_id: id,
          tutorId,
          authenticationToken,
          studentUniversity,
        });
      })
      .catch(function (error) {
        console.log('error', error.response.data);
        if (
          error.response.data.message === 'subscription does not exist' ||
          error.response.data.message === 'subscription expired'
        ) {
          navigation.navigate('StudentPastQuestionDetailsScreen', {
            id,
            thumbnail,
            title,
            course_code,
            date,
            rating,
            preview_video,
            // course_outline,
            description,
            studentEmail,
            studentId,
            studentUniversity,
            studentLevel,
            tutorId,
            authenticationToken,
            pastQuestionAmount,
          });
        }
      });
  };
  return (
    <TouchableOpacity
      onPress={checkSubscription}
      style={{
        marginTop: '0%',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-around',
        // flexShrink: 1,
        // paddingHorizontal: '1%',
        // backgroundColor: 'red',
        // width: width * 0.3,
        marginVertical: '5%',
      }}>
      <Image
        style={{
          width: width * 0.3,
          height: height * 0.11,
          borderRadius: 10,
        }}
        source={{
          uri: thumbnail,
        }}
        // resizeMode="center"
      />
      <View style={{flexDirection: 'column', flexShrink: 1, marginLeft: '3%'}}>
        <Text
          style={{
            flexShrink: 1,
            fontSize: dimension.fontScale * 15,
            fontWeight: 'bold',
          }}>
          {title}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'grey', fontSize: dimension.fontScale * 13}}>
            Ratings:
          </Text>
          <Text
            style={{
              marginLeft: '2%',
              fontSize: dimension.fontScale * 13,
              fontWeight: 'bold',
            }}>
            {rating}
          </Text>
          <Ionicons name="star" size={deviceSize * 0.00006} color={'#FCAA11'} />
        </View>
        <View
          style={{flexDirection: 'row', marginTop: '3%', alignItems: 'center'}}>
          <Image
            style={{
              width: width * 0.1,
              height: width * 0.1,
              borderRadius: deviceSize,
            }}
            source={{
              uri: tutorProfilePicture,
            }}
            // resizeMode="center"
          />
          <Text
            style={{
              marginLeft: '5%',
              fontSize: dimension.fontScale * 15,
              fontWeight: 'bold',
              color: 'grey',
            }}>
            {tutorName}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StudentPastQuestionCardComponent;
