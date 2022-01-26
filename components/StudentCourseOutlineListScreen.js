import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  useWindowDimensions,
  StyleSheet,
  Animated,
  PermissionsAndroid,
  ToastAndroid,
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
import LectureDetailsOverviewScreen from './lectureDetailsOverviewScreen';
import LectureDetailOutlineScreen from './LectureDetailsOutlineScreen';
import {ScrollView} from 'react-native-gesture-handler';
import ScrollableTabView, {
  // DefaultTabBar,
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view-forked';
import LecturesDetailsReviewScreen from './lecturesDetailsReviewScreen';
import LectureDetailsQandAScreen from './lectureDetailsQandAscreen';
import * as Progress from 'react-native-progress';
import moment from 'moment';
import Slider from '@react-native-community/slider';
// import { Orientation } from 'react-native-pager-view';
import Orientation from 'react-native-orientation-locker';
import LinearGradient from 'react-native-linear-gradient';
import StudentLectureAccessCourseOutlineScreen from './studentLectureAccessCourseOutlineScreen';
import ProgressCircle from 'react-native-progress-circle';
import RNFetchBlob from 'react-native-fetch-blob';
// const {getVideoDurationInSeconds} = require('get-video-duration');
import MediaMeta from 'react-native-media-meta';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonComponent from './buttonComponent';

const StudentCourseOutlineListScreen = ({route, navigation}) => {
  const {title, courseOutline, numberOfTopics, thumbnail, id} = route.params;

  const [updateStates, setUpdateStates] = useState({});
  const [activeListState, setActiveListState] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadingIndexList, setDownloadingIndexList] = useState([]);
  const [isDownloaded, setIsDownloaded] = useState(false);
  //   const [LectureArray, setLectureArray] = useState([]);
  const [downloadedIndexList, setDownloadedIndexList] = useState([]);
  const [localLecturesStorage, setLocalLecturesStorage] = useState([]);

  let dirs = RNFetchBlob.fs.dirs;

  const checkDownloadingIndexList = (i) => {
    downloadingIndexList.map((c) => {
      if (true) {
        console.warn(c);
        return 1;
      }
    });
  };
  const fileFetchTask = (fileLink) => {
    RNFetchBlob.config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache: true,
      path: dirs.DocumentDir + '/college',
      //   appendExt: Math.random(),
    }).fetch('GET', fileLink, {
      //some headers ..
    });
  };

  const handleDownloadTask = async (fileLink, i, type, title) => {
    ToastAndroid.show(title + ' IS DOWNLOADING', ToastAndroid.LONG);
    // --------
    setIsDownloading(true);
    setIsDownloaded(false);
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Camera permission request',
          message: 'College wants to write to your external storage',
          // buttonNeutral: "Ask Me Later",
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const getLocalLectures = async () => {
          return AsyncStorage.getItem('@lectures')
            .then((req) => JSON.parse(req))
            .then((json) => {
              console.log('lectures local', json);
              if (json === null) {
                console.log('used null to array');
                setLocalLecturesStorage([]);
                setUpdateStates({});
              } else {
                console.log('used like that');
                setLocalLecturesStorage(json);
                setUpdateStates({});
              }
              // return json;
            })
            .catch((error) => console.log('error!'));
        };
        setActiveListState(i);
        console.log('started');
        getLocalLectures();
        console.log('LOCAL LECTURES ====', localLecturesStorage);

        RNFetchBlob.fs
          .mkdir(dirs.DocumentDir + '/CLDATA')
          .then(() => console.log(' Dir Created '))
          .catch((e) => {
            console.log(e);
          });
        RNFetchBlob.config({
          // addAndroidDownloads: {
          //   useDownloadManager: true, // <-- this is the only thing required
          //   // Optional, override notification setting (default to true)
          //   notification: false,
          //   // Optional, but recommended since android DownloadManager will fail when
          //   // the url does not contains a file extension, by default the mime type will be text/plain
          //   mime: type,
          //   description: 'File downloaded by download manager.',
          // },

          // add this option that makes response data to be stored as a file,
          // this is much more performant.
          fileCache: true,
          path: dirs.DocumentDir + '/CLDATA/' + Math.random(),

          //   appendExt: Math.random(),
        })
          .fetch('GET', fileLink, {
            //some headers ..
          })
          .progress((received, total) => {
            console.log(received / total);
            setDownloadProgress(received / total);
            setDownloadingIndexList(downloadingIndexList.concat(fileLink));
            console.log(downloadingIndexList);
            setUpdateStates({});
          })
          .then((res) => {
            // the temp file path
            console.log('The file saved to ', res.path());
            // MediaMeta.get('file//' + res.path())
            //   .then((metadata) => console.log('metadata', metadata))
            //   .catch((err) => console.error(err));

            setIsDownloaded(true);
            setIsDownloading(false);
            setDownloadProgress(1);

            setLocalLecturesStorage(
              localLecturesStorage.concat({
                date: Date.now(),
                title,
                type,
                file: 'file//' + res.path(),
              }),
            );
            setUpdateStates({});

            const storeLectures = async (object) => {
              try {
                await AsyncStorage.setItem(
                  '@lectures',
                  JSON.stringify(
                    localLecturesStorage.concat({
                      date: Date.now(),
                      title,
                      type,
                      file: res.path(),
                      thumbnail,
                    }),
                  ),
                );
              } catch (error) {
                // Error saving data
              }
            };
            storeLectures();
            setUpdateStates({});
            // try {
            //   await AsyncStorage.setItem(
            //     '@lectures',
            //     JSON.stringify([])
            //   );
            // } catch (error) {
            //   // Error saving data
            // }
            ToastAndroid.show(title + ' IS DOWNLOADED', ToastAndroid.LONG);
            // setIsDownloaded(true);
          })
          .catch((e) => {
            console.log(e);
            setIsDownloading(false);
            // setIsDownloaded(false);
            ToastAndroid.show('SOMETHING WENT WRONG', ToastAndroid.LONG);
          });
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }

    // ---------
  };

  useEffect(() => {
    const getLocalLectures = async () => {
      return AsyncStorage.getItem('@lectures')
        .then((req) => JSON.parse(req))
        .then((json) => {
          console.log('lectures local', json);
          if (json === null) {
            console.log('used null to array');
            setLocalLecturesStorage([]);
            setUpdateStates({});
          } else {
            console.log('used like that');
            setLocalLecturesStorage(json);
            setUpdateStates({});
          }
          // return json;
        })
        .catch((error) => console.log('error!'));
    };
    getLocalLectures();
    setUpdateStates({});
  }, []);

  const handleCheckDownloaded = (file, dataArray) => {
    console.log('loccococococ', localLecturesStorage + ',   ---file== ' + file);
    if (dataArray !== null) {
      return dataArray.some(function (el) {
        return el.title === file;
      });
    }
  };

  const removeFromLocalStorage = (file) => {
    const getLocalLectures = async () => {
      return AsyncStorage.getItem('@lectures')
        .then((req) => JSON.parse(req))
        .then((json) => {
          // console.log('lectures local', json);
          setLocalLecturesStorage(json);
          setUpdateStates({});
          // return json;
        })
        .catch((error) => console.log('error!'));
    };
    getLocalLectures();

    const newLocalStorage = removeByAttr(localLecturesStorage, 'title', file);
    const storeLectures = async (object) => {
      try {
        await AsyncStorage.setItem(
          '@lectures',
          JSON.stringify(newLocalStorage),
        );
      } catch (error) {
        // Error saving data
      }
    };
    storeLectures();
    setUpdateStates();

    getLocalLectures();
    setUpdateStates({});
    setIsDownloaded(false);
    setDownloadProgress(0);
  };

  const removeByAttr = function (arr, attr, value) {
    let i = arr.length;
    while (i--) {
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr) &&
        arguments.length > 2 &&
        arr[i][attr] === value
      ) {
        arr.splice(i, 1);
      }
    }
    return arr;
  };

  const handlePlayVideo = (file) => {
    // alert(file);
    navigation.navigate('CollegeVideoPlayerComponent', {
      thumbnail,
      preview_video: file,
    });
  };

  //   console.log('outline', courseOutline[0].classObjectArray);
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      {/* <Image
        // resizeMethod="scale"
        style={{
          width: width,
          height: height * 0.4,
          // borderRadius: deviceSize * 0.0003,
          zIndex: -1,
        }}
        source={{
          uri: 'file:///storage/emulated/0/Download/0.04383054505556172',
        }}
        resizeMode="stretch"
      /> */}
      <View>
        <View>
          <LinearGradient colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 1)']}>
            <Image
              // resizeMethod="scale"
              style={{
                width: width,
                height: height * 0.4,
                // borderRadius: deviceSize * 0.0003,
                zIndex: -1,
              }}
              source={{
                uri: thumbnail,
              }}
              resizeMode="stretch"
            />
          </LinearGradient>

          <View
            style={{
              width: width,
              height: height * 0.4,
              // backgroundColor: 'rgba(0, 0, 0, 0.521)',
              position: 'absolute',
              // borderRadius: deviceSize * 0.0003,
              paddingHorizontal: '10%',
              justifyContent: 'flex-end',
            }}>
            <Text
              style={{
                color: 'white',
                marginBottom: '5%',
                fontWeight: 'bold',
              }}>
              {title.toUpperCase()}
            </Text>
            <View
              style={{
                width: '100%',
                marginBottom: '10%',
                flexDirection: 'row',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons
                  onPress={() => {
                    // navigation.goBack();
                    // alert('GGgg');
                  }}
                  name="book-outline"
                  size={18}
                  color={'white'}
                />
                <Text style={{color: 'white'}}>
                  {' '}
                  {courseOutline.length} Lectures
                </Text>
              </View>
              {/* <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: '10%',
                }}>
                <Ionicons
                  onPress={() => {
                    navigation.goBack();
                    // alert('GGgg');
                  }}
                  name="book-outline"
                  size={18}
                  color={'white'}
                />
                <Text style={{color: 'white'}}> 12 Topics</Text>
              </View> */}
            </View>
          </View>
        </View>
        <View style={{padding: '5%'}}>
          <Text>
            Download lectures and visit the download page to watch videos
            offline
          </Text>
        </View>
      </View>
      {courseOutline.map((c, i) => (
        <View key={i}>
          <View
            style={{
              paddingVertical: '2%',
              marginTop: '5%',
              marginHorizontal: '5%',
              paddingHorizontal: '5%',
              flexDirection: 'row',
              borderWidth: 0.5,
              borderRadius: 10,
              //   marginBottom: '5%',
              // alignItems: 'center',
            }}>
            {/* <Text
              style={{
                width: '10%',
                // fontWeight: 'bold',
                fontSize: dimension.fontScale * 15,
              }}>
              {i + 1}
            </Text> */}
            {/* <Image
              paused={true}
              // resizeMethod="scale"
              style={{
                width: '20%',
                height: width * 0.2,
                marginRight: '5%',
                borderRadius: 50,
                // borderRadius: deviceSize * 0.0003,
                // zIndex: -1,
              }}
              source={{
                uri: c.file,
              }}
              resizeMode="stretch"
            /> */}

            <View style={{width: '90%'}}>
              <Text
                onPress={() => {
                  handlePlayVideo(c.file);
                }}
                style={{
                  fontSize: dimension.fontScale * 15,
                  fontWeight: 'bold',
                }}>
                {c.classTitle.toUpperCase()}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons
                  onPress={() => {
                    // navigation.goBack();
                    // alert('GGgg');
                  }}
                  name="folder-open"
                  size={18}
                  color={'grey'}
                />
                <Text
                  style={{marginTop: '2%', color: 'grey', marginLeft: '5%'}}>
                  {c.fileObject.type}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              disabled={
                isDownloading ||
                handleCheckDownloaded(
                  c.classTitle.toUpperCase(),
                  localLecturesStorage,
                )
                  ? true
                  : false
              }
              activeOpacity={0.9}
              onPress={() => {
                handleDownloadTask(
                  c.file,
                  i,
                  c.fileObject.type,
                  c.classTitle.toUpperCase(),
                );
              }}
              style={{backgroundColor: 'white'}}>
              {handleCheckDownloaded(
                c.classTitle.toUpperCase(),
                localLecturesStorage,
              ) ? (
                <Ionicons
                  onPress={() => {
                    removeFromLocalStorage(c.classTitle.toUpperCase());
                  }}
                  name={'trash-outline'}
                  // size={500}
                  color={'grey'}
                  style={{
                    //   width: '10%',
                    fontWeight: 'bold',
                    fontSize: dimension.fontScale * 30,
                    //   marginLeft: '2%',
                  }}
                />
              ) : (
                <ProgressCircle
                  containerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 0,
                  }}
                  outerCircleStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 0,
                  }}
                  percent={activeListState === i ? downloadProgress * 100 : 0}
                  radius={15}
                  borderWidth={2}
                  color={brandColor}
                  //   shadowColor="#999"
                  bgColor="white">
                  {/* {console.log(checkDownloadingIndexList(9))} */}
                  {activeListState === i && isDownloading ? (
                    <Ionicons
                      //   onPress={handleAccordion}
                      name={'pause-outline'}
                      size={10}
                      color={brandColor}
                      style={{
                        //   width: '10%',
                        fontWeight: 'bold',
                        fontSize: dimension.fontScale * 17,
                        //   marginLeft: '2%',
                      }}
                    />
                  ) : activeListState === i && isDownloaded ? (
                    <Ionicons
                      //   onPress={handleAccordion}
                      name={'checkmark-outline'}
                      size={10}
                      color={brandColor}
                      style={{
                        //   width: '10%',
                        fontWeight: 'bold',
                        fontSize: dimension.fontScale * 17,
                        //   marginLeft: '2%',
                      }}
                    />
                  ) : (
                    <Ionicons
                      //   onPress={handleAccordion}
                      name={'arrow-down-outline'}
                      size={10}
                      color={brandColor}
                      style={{
                        //   width: '10%',
                        fontWeight: 'bold',
                        fontSize: dimension.fontScale * 17,
                        //   marginLeft: '2%',
                      }}
                    />
                  )}
                  {/* <Text>ggg</Text> */}
                </ProgressCircle>
              )}
            </TouchableOpacity>
          </View>
          {/* {c.classObjectArray.map((j, k) => (
            <View
              //   key={i}
              style={{
                display: heightState === i ? 'flex' : 'none',
                // backgroundColor: 'red',
                marginHorizontal: '15%',
                marginTop: '2%',
                flexDirection: 'row',
                // width: '100%',
              }}>
              <Text style={{color: 'black', width: '10%'}}>{k + 1}</Text>
              <Text style={{color: 'black', width: '90%'}}>{j.classTitle}</Text>
            </View>
          ))} */}
        </View>
      ))}
      <View style={{padding: '5%'}}>
        <ButtonComponent
          buttonText="Go to downloads"
          onPress={() => {
            navigation.navigate('StudentDownloadScreen');
          }}
        />
      </View>
    </ScrollView>
  );
};

export default StudentCourseOutlineListScreen;
