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

const PastQuestionDetailsOverviewScreen = ({title, courseCode, date}) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        // height: 1000,
        width: '100%',
        // flex: 1,
        // flexGrow: 1,
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          marginVertical: '5%',
          fontSize: dimension.fontScale * 17,
        }}>
        {title}
      </Text>
      <Text style={{marginBottom: '2%'}}>
        Course code: <Text style={{fontWeight: 'bold'}}>{courseCode}</Text>
      </Text>
      <Text style={{marginBottom: '2%'}}>
        Date uploaded: <Text style={{fontWeight: 'bold'}}>{date}</Text>
      </Text>
    </View>
  );
};

export default PastQuestionDetailsOverviewScreen;
