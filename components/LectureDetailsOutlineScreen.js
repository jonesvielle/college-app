import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
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
import ButtonComponent from './buttonComponent';
// import {ScrollView} from 'react-native-gesture-handler';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const LectureDetailOutlineScreen = ({courseOutline, isLoading}) => {
  return (
    <View style={{backgroundColor: 'white', flex: 1, paddingVertical: '5%'}}>
      {isLoading ? (
        <View
          style={{
            // height: '100%',
            // width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '40%',
          }}>
          <ActivityIndicator color={brandColor} size={40} />
        </View>
      ) : (
        courseOutline.map((c, i) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: '2%',
            }}>
            <Image
              resizeMode="cover"
              //   paused={true}
              source={{
                uri: 'https://collageapi.s3.amazonaws.com/videos%2Fimages+-+2021-09-11T131741.170.jpeg',
              }} // Can be a URL or a local file.
              //    ref={(ref) => {
              //      this.player = ref
              //    }}                                      // Store reference
              //    onBuffer={this.onBuffer}                // Callback when remote video is buffering
              //    onError={this.videoError}               // Callback when video cannot be loaded
              style={{
                width: width * 0.2,
                height: height * 0.09,
                borderRadius: 10,
              }}
            />
            <View style={{paddingHorizontal: '2%', width: '80%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  width: '100%',
                  //   alignItems: 'center',
                }}>
                <Text
                  style={{fontSize: dimension.fontScale * 14, width: '85%'}}>
                  <Text style={{fontWeight: 'bold'}}>Topic {i + 1}:</Text>
                  {c.courseTitle}
                </Text>

                <Ionicons
                  style={{marginLeft: '3%', width: '11%'}}
                  name="create-outline"
                  size={deviceSize * 0.0001}
                  color={'black'}
                />
              </View>
              <Text style={{color: 'grey'}}>
                Sub topics:{' '}
                <Text style={{fontWeight: 'bold', color: 'black'}}>
                  {c.classObjectArray.length}
                </Text>
              </Text>
            </View>

            {/* <Text>ggfgf</Text> */}
          </View>
        ))
      )}
    </View>
  );
};

export default LectureDetailOutlineScreen;
