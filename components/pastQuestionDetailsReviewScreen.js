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

const PastQuestionDetailsReviewScreen = () => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: '5%',
        }}>
        <Text style={{fontSize: dimension.fontScale * 17, fontWeight: 'bold'}}>
          Average rating
        </Text>
        <Ionicons
          //   onPress={handleVideoPause}
          name="star"
          size={deviceSize * 0.00008}
          color={'rgb(218, 188, 19)'}
          style={{marginLeft: '5%'}}
        />
        <Text style={{fontSize: dimension.fontScale * 17, marginLeft: '2%'}}>
          4/5
        </Text>
      </View>
      <View>
        <Text>
          hellow how is it now ok, now ths is it, come toeat,hellow how is it
          now ok, now ths is it, come toeat hellow how is it now ok, now ths is
          it, come toeat hellow how is it now ok, now ths is it, come toeat
        </Text>
        <View
          style={{
            marginVertical: '2%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: dimension.fontScale * 15, color: 'grey'}}>
            John thomas
          </Text>
          <Ionicons
            //   onPress={handleVideoPause}
            name="star"
            size={deviceSize * 0.00008}
            color={'rgb(218, 188, 19)'}
            style={{marginLeft: '1%'}}
          />
          <Ionicons
            //   onPress={handleVideoPause}
            name="star"
            size={deviceSize * 0.00008}
            color={'rgb(218, 188, 19)'}
            style={{marginLeft: '1%'}}
          />
          <Ionicons
            //   onPress={handleVideoPause}
            name="star"
            size={deviceSize * 0.00008}
            color={'rgb(218, 188, 19)'}
            style={{marginLeft: '1%'}}
          />
          <Ionicons
            //   onPress={handleVideoPause}
            name="star"
            size={deviceSize * 0.00008}
            color={'rgb(218, 188, 19)'}
            style={{marginLeft: '1%'}}
          />
          <Text style={{fontSize: dimension.fontScale * 15, color: 'grey'}}>
            4/5
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'rgb(214, 214, 214)',
            height: height * 0.002,
            width: '100%',
            marginVertical: '5%',
          }}></View>
      </View>

      <View>
        <Text>
          hellow how is it now ok, now ths is it, come toeat,hellow how is it
          now ok, now ths is it, come toeat hellow how is it now ok, now ths is
          it, come toeat hellow how is it now ok, now ths is it, come toeat
        </Text>
        <View
          style={{
            marginVertical: '2%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: dimension.fontScale * 15, color: 'grey'}}>
            John thomas
          </Text>
          <Ionicons
            //   onPress={handleVideoPause}
            name="star"
            size={deviceSize * 0.00008}
            color={'rgb(218, 188, 19)'}
            style={{marginLeft: '1%'}}
          />
          <Ionicons
            //   onPress={handleVideoPause}
            name="star"
            size={deviceSize * 0.00008}
            color={'rgb(218, 188, 19)'}
            style={{marginLeft: '1%'}}
          />
          <Ionicons
            //   onPress={handleVideoPause}
            name="star"
            size={deviceSize * 0.00008}
            color={'rgb(218, 188, 19)'}
            style={{marginLeft: '1%'}}
          />
          <Ionicons
            //   onPress={handleVideoPause}
            name="star"
            size={deviceSize * 0.00008}
            color={'rgb(218, 188, 19)'}
            style={{marginLeft: '1%'}}
          />
          <Text style={{fontSize: dimension.fontScale * 15, color: 'grey'}}>
            4/5
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'rgb(214, 214, 214)',
            height: height * 0.002,
            width: '100%',
            marginVertical: '5%',
          }}></View>
      </View>

      <View>
        <Text>
          hellow how is it now ok, now ths is it, come toeat,hellow how is it
          now ok, now ths is it, come toeat hellow how is it now ok, now ths is
          it, come toeat hellow how is it now ok, now ths is it, come toeat
        </Text>
        <View
          style={{
            marginVertical: '2%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: dimension.fontScale * 15, color: 'grey'}}>
            John thomas
          </Text>
          <Ionicons
            //   onPress={handleVideoPause}
            name="star"
            size={deviceSize * 0.00008}
            color={'rgb(218, 188, 19)'}
            style={{marginLeft: '1%'}}
          />
          <Ionicons
            //   onPress={handleVideoPause}
            name="star"
            size={deviceSize * 0.00008}
            color={'rgb(218, 188, 19)'}
            style={{marginLeft: '1%'}}
          />
          <Ionicons
            //   onPress={handleVideoPause}
            name="star"
            size={deviceSize * 0.00008}
            color={'rgb(218, 188, 19)'}
            style={{marginLeft: '1%'}}
          />
          <Ionicons
            //   onPress={handleVideoPause}
            name="star"
            size={deviceSize * 0.00008}
            color={'rgb(218, 188, 19)'}
            style={{marginLeft: '1%'}}
          />
          <Text style={{fontSize: dimension.fontScale * 15, color: 'grey'}}>
            4/5
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'rgb(214, 214, 214)',
            height: height * 0.002,
            width: '100%',
            marginVertical: '5%',
          }}></View>
      </View>
    </View>
  );
};

export default PastQuestionDetailsReviewScreen;
