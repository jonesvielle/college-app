import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  useWindowDimensions,
  StyleSheet,
  // ScrollView,
} from 'react-native';
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
import Video from 'react-native-video';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import ScrollableTabView, {
  // DefaultTabBar,
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view-forked';

const PastQuestionDetailsSolutionScreen = ({solutionVideos}) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        // height: 1000,
        width: '100%',
        // flex: 1,
        // flexGrow: 1,
      }}>
      {/* <Text
        style={{
          fontWeight: 'bold',
          marginVertical: '5%',
          fontSize: dimension.fontScale * 17,
        }}>
        Thermodynamics past question
      </Text>
      <Text style={{marginBottom: '2%'}}>
        Course code: <Text style={{fontWeight: 'bold'}}>MEE411</Text>
      </Text>
      <Text style={{marginBottom: '2%'}}>
        Date uploaded: <Text style={{fontWeight: 'bold'}}>Sept 12 2014</Text>
      </Text> */}
      {solutionVideos.map((c, i) => (
        <View
          key={i}
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '5%',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: dimension.fontScale * 15,
              width: '5%',
            }}>
            {i + 1}.{'  '}
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: dimension.fontScale * 15,
              width: '80%',
            }}>
            {c.solutionVideoTitle}
          </Text>
          <Ionicons
            style={{marginLeft: '3%'}}
            name="create-outline"
            size={deviceSize * 0.0001}
            color={'black'}
          />
        </View>
      ))}
    </View>
  );
};

export default PastQuestionDetailsSolutionScreen;
