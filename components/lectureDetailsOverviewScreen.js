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
// import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const LectureDetailsOverviewScreen = ({
  title,
  courseCode,
  date,
  description,
  objective,
  isLoading,
}) => {
  const [readMore, setReadMore] = useState(false);
  const [openOption, setOpenOption] = useState(false);
  const handleReadMore = () => {
    if (readMore) {
      setReadMore(false);
    } else {
      setReadMore(true);
    }
  };

  const showOption = () => {
    if (openOption) {
      setOpenOption(false);
    } else {
      setOpenOption(true);
    }
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        // height: 1000,
        width: '100%',
        // flex: 1,
        // flexGrow: 1,
      }}>
      {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{flexGrow: 1}}> */}
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
        <>
          <View
            style={{
              width: '100%',
              marginVertical: '5%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: dimension.fontScale * 18, width: '80%'}}>
              {title}
            </Text>
            <Ionicons
              onPress={showOption}
              name="ellipsis-vertical"
              size={deviceSize * 0.0001}
              color={'black'}
            />
          </View>
          <View style={{flexDirection: 'row', marginVertical: '1%'}}>
            <Text style={{fontSize: dimension.fontScale * 14, color: 'grey'}}>
              Course code:
            </Text>
            <Text style={{fontSize: dimension.fontScale * 14}}>
              {' '}
              {courseCode}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginVertical: '1%'}}>
            <Text style={{fontSize: dimension.fontScale * 14, color: 'grey'}}>
              Date uploaded:
            </Text>
            <Text style={{fontSize: dimension.fontScale * 14}}> {date}</Text>
          </View>
          <View
            style={{
              width: '100%',
              marginVertical: '3%',
              flexDirection: 'row',
              // justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: dimension.fontScale * 18}}>
              Description
            </Text>
            <Ionicons
              style={{marginLeft: '3%'}}
              name="create-outline"
              size={deviceSize * 0.0001}
              color={'black'}
            />
          </View>
          {openOption ? (
            <View
              style={{
                position: 'absolute',
                zIndex: 1,
                backgroundColor: 'white',
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,
                width: width * 0.4,
                paddingVertical: '3%',
                marginLeft: width * 0.47,
                marginTop: '15%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: '2%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: '2%',
                }}>
                <Ionicons
                  style={{width: '20%'}}
                  name="share-social-outline"
                  size={deviceSize * 0.00008}
                  color={'grey'}
                />
                <Text style={{color: 'grey', width: '80%'}}>Share course</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: '2%',
                }}>
                <Ionicons
                  style={{width: '20%'}}
                  name="create-outline"
                  size={deviceSize * 0.00008}
                  color={'grey'}
                />
                <Text style={{color: 'grey', width: '80%'}}>Edit course</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: '2%',
                }}>
                <Ionicons
                  style={{width: '20%'}}
                  name="trash-outline"
                  size={deviceSize * 0.00008}
                  color={'grey'}
                />
                <Text style={{color: 'grey', width: '80%'}}>Delete course</Text>
              </View>
            </View>
          ) : (
            <></>
          )}
          <View>
            <Text style={{fontSize: dimension.fontScale * 15, color: 'grey'}}>
              {console.log('descript****', description)}
              {description.length > 120 && !readMore ? (
                <>
                  {description.slice(0, 120)}{' '}
                  <Text
                    onPress={handleReadMore}
                    // onPress={() => {
                    //   alert('ggg');
                    // }}
                    style={{
                      fontSize: dimension.fontScale * 15,
                      color: 'black',
                      fontWeight: 'bold',
                    }}>
                    ...read more
                  </Text>
                </>
              ) : (
                <>
                  {description}
                  <Text
                    onPress={handleReadMore}
                    // onPress={() => {
                    //   alert('ggg');
                    // }}
                    style={{
                      fontSize: dimension.fontScale * 15,
                      color: 'black',
                      fontWeight: 'bold',
                    }}>
                    ........
                  </Text>
                </>
              )}
            </Text>
          </View>

          <View
            style={{
              //   flex: 1,
              width: '100%',
              marginVertical: '3%',
              flexDirection: 'row',
              // justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: dimension.fontScale * 18}}>
              What you will learn
            </Text>
            <Ionicons
              style={{marginLeft: '3%'}}
              name="create-outline"
              size={deviceSize * 0.0001}
              color={'black'}
            />
          </View>

          {objective.map((c, i) => (
            <View
              key={i}
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: height * 0.001,
              }}>
              <Ionicons
                style={{width: '10%'}}
                name="checkmark-outline"
                size={deviceSize * 0.0001}
                color={'green'}
              />
              <Text style={{width: '90%', fontSize: dimension.fontScale * 12}}>
                {c}
              </Text>
            </View>
          ))}

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: height * 0.05,
            }}></View>
          <View style={{marginBottom: '10%'}}>
            <ButtonComponent buttonText={'Edit Course'} />
          </View>
        </>
      )}

      {/* </ScrollView> */}
    </View>
  );
};

export default LectureDetailsOverviewScreen;
