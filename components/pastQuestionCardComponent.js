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

const PastQuestionCardComponent = ({
  route,
  title,
  course_code,
  thumbnail,
  id,
  rating,
  date,
  navigation,
  authenticationToken,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('PastQuestionDetailsScreen', {
          id,
          authenticationToken,
        });
      }}
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
            Course code:
          </Text>
          <Text
            style={{
              marginLeft: '2%',
              fontSize: dimension.fontScale * 13,
              fontWeight: 'bold',
            }}>
            {course_code}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'grey', fontSize: dimension.fontScale * 13}}>
            Date created:
          </Text>
          <Text
            style={{
              marginLeft: '2%',
              fontSize: dimension.fontScale * 13,
              fontWeight: 'bold',
            }}>
            {Moment(new Date(date)).format('D MMMM, YYYY')}
            {/* {date} */}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PastQuestionCardComponent;
