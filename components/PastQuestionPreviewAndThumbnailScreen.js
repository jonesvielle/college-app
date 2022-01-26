import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  DevSettings,
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
  dimension,
  awsOptions,
  retrieveToken,
} from './modules';
// import UploadImage from '../images/uploadImage.png';
import DocumentPicker from 'react-native-document-picker';
import {RNS3} from 'react-native-aws3';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TutorActiveImage from '../images/tutorActive.png';
import TutorInactiveImage from '../images/tutorInactive.png';
import StudentActiveImage from '../images/studentActive.png';
import StudentInactiveImage from '../images/studentInactive.png';
import LoginAsTutorImage from '../images/lot.png';
import Emoji from '../images/macbookBoy.png';
import LoginAsComponent from './signUpAsComponent';
import TextInputComponent from './TextInputComponent';
import ButtonComponent from './buttonComponent';
import BackButtonComponent from './backButtonComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PickerComponent from './pickerComponent';
import Axios from 'axios';
import * as Progress from 'react-native-progress';
import RNRestart from 'react-native-restart';

const PastQuestionPreviewAndThumbnailScreen = ({route, navigation}) => {
  const {
    title,
    university,
    selectedLevel,
    selectedFaculty,
    department,
    courseCode,
    authenticationToken,
    solutionDocumentOutlines,
    solutionVideoOutlines,
  } = route.params;
  const [updateStates, setUpdateStates] = useState({});
  const [file, setFile] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [dataUploaded, setDataUploaded] = useState(0);
  // const [fileType, setFileType] = useState('');
  // const [showFile, setShowFile] = useState(false);
  // const [fileObject, setFileObject] = useState('');
  const [previewUploaded, setPreviewUploaded] = useState(false);
  const [previewVideo, setPreviewVideo] = useState('');
  const [previewVideoFileObject, setPreviewVideoFileObject] = useState('');
  const [thumbnailUploaded, setThumbnailUplaoded] = useState('');
  const [thumbnailImage, setThumbnailImage] = useState('');
  const [thumbnailImageFileObject, setThumbnailImageFileObject] = useState('');
  const [previewUploadFile, setPreviewUploadFile] = useState('');
  const [thumbnailUploadFile, setThumbnailUploadFile] = useState('');

  const classTestArray = [
    // {
    //   // courseTitle: 'course tile',
    //   classTitle: 'class tile',
    //   file: 'file.mp4',
    // },
    // {
    //   // courseTitle: 'course tile1',
    //   classTitle: 'class tile1',
    //   file: 'file.mp41',
    // },
  ];

  useEffect(() => {}, []);

  const handleUploadPreviewVideo = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
      });
      console.log(res);
      const fileObj = {
        type: res.type,
        name: res.name,
        uri: res.uri,
      };
      setPreviewUploaded(true);
      setPreviewVideo(fileObj.uri);
      setPreviewVideoFileObject(fileObj);
      setUpdateStates({});
      // console.warn(awsParams);
      // handleUploadFileToS3(fileObj);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.warn('cancelled');
      } else {
        throw error;
      }
    }
  };

  const handleUploadThumbnailImage = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(res);
      const fileObj = {
        type: res.type,
        name: res.name,
        uri: res.uri,
      };
      setThumbnailUplaoded(true);
      setThumbnailImage(fileObj.uri);
      setThumbnailImageFileObject(fileObj);
      setUpdateStates({});
      // console.warn(awsParams);
      // handleUploadFileToS3(fileObj);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.warn('cancelled');
      } else {
        throw error;
      }
    }
  };

  const handleUploadFileToS3 = (f, j) => {
    // setShowFile(false);
    setIsUploading(true);
    console.warn(f);
    const awsParams = awsOptions();
    RNS3.put(f, awsParams)
      .progress((e) => {
        setIsUploading(true);
        // console.log(e.loaded / e.total);
        console.log(Math.round((e.loaded * 100) / e.total));
        setDataUploaded(Math.round((e.loaded * 100) / e.total));
      })
      .then((response) => {
        console.log('result', response);
        // setIsUploading(false);
        // setDataUploaded(0);
        // setShowFile(true);
        // setFile(response.body.postResponse.location);
        console.log(response.body.postResponse.location);
        setPreviewUploadFile(response.body.postResponse.location);
        const ff = response.body.postResponse.location;
        setUpdateStates({});
        // new request
        RNS3.put(j, awsParams)
          .progress((e) => {
            setIsUploading(true);
            // console.log(e.loaded / e.total);
            console.log(Math.round((e.loaded * 100) / e.total));
            setDataUploaded(Math.round((e.loaded * 100) / e.total));
          })
          .then((response) => {
            console.log('result', response);
            setIsUploading(false);
            // setDataUploaded(0);
            // setShowFile(true);
            // setFile(response.body.postResponse.location);
            console.log(response.body.postResponse.location);
            setThumbnailUploadFile(response.body.postResponse.location);
            const tt = response.body.postResponse.location;
            setUpdateStates({});
            console.log(
              'ppppfff',
              previewUploadFile + ', ' + thumbnailUploadFile,
            );
            handleUploadLecture(ff, tt);
          })
          .catch((e) => {
            setIsUploading(false);
            setDataUploaded(0);
            console.warn(e);
            alert('something went wrong');
          });
      })
      .catch((e) => {
        setIsUploading(false);
        setDataUploaded(0);
        console.warn(e);
        alert('something went wrong');
      });
  };

  const handleCancleFileUpload = (f, j) => {
    const awsParams = awsOptions();
    // console.warn(awsParams);
    RNS3.put(f, awsParams)
      .abort()
      .then((e) => {
        RNS3.put(j, awsParams)
          .abort()
          .then((e) => {
            setIsUploading(false);
          })
          .catch((e) => {
            throw e;
          });
      })
      .catch((e) => {
        // throw e;
      });
    setIsUploading(false);
  };

  useEffect(() => {
    // fetchCourseCode();
    // token = retrieveToken()
  }, [previewUploadFile, thumbnailUploadFile]);

  const handleUploadLecture = (f, t) => {
    var data = JSON.stringify({
      university: university,
      faculty_name: selectedFaculty,
      department: department,
      level: selectedLevel,
      course_code: courseCode,
      title: title,
      solution_videos: solutionVideoOutlines,
      solving_sheet: solutionDocumentOutlines,
      preview_video: f,
      thumbnail: t,
      token: authenticationToken,
    });

    var config = {
      method: 'post',
      url: 'https://collageapi.herokuapp.com/api/upload_past_questions/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert('Uploaded successfully!');
        RNRestart.Restart();
      })
      .catch(function (error) {
        console.log(error);
        alert('something went wrong!');
      });
  };
  const handleContinueButton = async () => {
    if (thumbnailImage.length < 1 || previewVideo.length < 1) {
      alert('fill all fields');
    } else {
      setIsUploading(true);
      // alert('continue');
      handleUploadFileToS3(previewVideoFileObject, thumbnailImageFileObject);
      // setIsUploading(false);

      // console.log(JSON.stringify(courseOutlines));
      // navigation.navigate('FinalCourseTargetScreen', {
      //   selectedFaculty,
      //   department,
      //   selectedLevel,
      //   title,
      //   description,
      //   university,
      //   courseObjective,
      //   courseCode,
      // });
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={{flex: 1, backgroundColor: 'white'}}
      contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
      {isUploading ? (
        <View
          style={{
            backgroundColor: 'rgba(250, 249, 249, 0.8)',
            width: width,
            height: height,
            position: 'absolute',
            marginTop: '25%',
            zIndex: 1,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={brandColor} size={50} />
          <TouchableOpacity
            onPress={() => {
              handleCancleFileUpload(
                previewVideoFileObject,
                thumbnailImageFileObject,
              );
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ionicons
              onPress={handleUploadPreviewVideo}
              // onPress={() => {
              //   alert('hello');
              // }}
              name="close"
              size={deviceSize * 0.0001}
              color={'grey'}
            />
            <Text style={{fontSize: dimension.fontScale * 15}}>
              Cancel upload
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
      <View
        style={{
          marginTop: '5%',
          width: width * 0.85,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          // backgroundColor: 'blue',
        }}>
        <BackButtonComponent
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={{color: 'rgb(114, 112, 112)'}}>Step 5/5</Text>
      </View>
      <View
        style={{
          // backgroundColor: 'green',
          marginTop: '10%',
          // marginLeft: '5%',
          flexDirection: 'row',
          alignItems: 'center',
          //   justifyContent: 'space-around',
          width: width * 0.8,
        }}>
        <Text style={{fontSize: dimension.fontScale * 20}}>Previews</Text>
        <Image
          style={{width: width * 0.15, height: height * 0.05}}
          source={Emoji}
          resizeMode="center"
        />
      </View>
      {/* for preview */}
      <>
        <View style={{width: width * 0.8, marginVertical: '5%'}}>
          <Text
            style={{fontSize: dimension.fontScale * 15, marginVertical: '1%'}}>
            Preview video
          </Text>
          <Text
            style={{
              fontSize: dimension.fontScale * 12,
              color: 'grey',
              marginVertical: '1%',
            }}>
            This video is what would be used to display when the course is
            clicked. It improves conversation
          </Text>
        </View>

        {previewUploaded ? (
          <View
            style={{
              width: width * 0.8,
              marginVertical: '5%',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: width * 0.001,
              height: height * 0.3,
              borderRadius: 10,
              backgroundColor: 'rbga(0,0,0,0.5)',
            }}>
            <View
              style={{
                position: 'absolute',
                backgroundColor: 'rgba(3,3,3,0.4)',
                height: height * 0.3,
                width: width * 0.8,
                borderRadius: 10,
              }}></View>
            <Ionicons
              onPress={handleUploadPreviewVideo}
              // onPress={() => {
              //   alert('hello');
              // }}
              name="cloud-upload-outline"
              size={deviceSize * 0.00017}
              color={'rgb(220, 220, 220)'}
            />
            <Text
              style={{
                textAlign: 'center',
                width: '75%',
                color: 'rgb(220, 220, 220)',
              }}>
              Click to change preview video .mp4 format
            </Text>
            <Image
              style={{
                width: width * 0.8,
                height: height * 0.3,
                position: 'absolute',
                zIndex: -1,
                borderRadius: 10,
              }}
              source={{
                uri: previewVideo,
              }}
            />
          </View>
        ) : (
          <View
            style={{
              width: width * 0.8,
              marginVertical: '5%',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: width * 0.001,
              height: height * 0.3,
              borderRadius: 10,
              // backgroundColor: 'rbga(0,0,0,0.5)',
            }}>
            <View
              style={{
                position: 'absolute',
                //   backgroundColor: 'rgba(3,3,3,0.3)',
                height: height * 0.3,
                width: width * 0.8,
                borderRadius: 10,
              }}></View>
            <Ionicons
              onPress={handleUploadPreviewVideo}
              name="cloud-upload-outline"
              size={deviceSize * 0.00017}
              color={'rgb(220, 220, 220)'}
            />
            <Text
              style={{
                textAlign: 'center',
                width: '75%',
                color: 'rgb(220, 220, 220)',
              }}>
              Click to change preview video .mp4 format
            </Text>
          </View>
        )}

        {/* for thumbnail */}

        <View style={{width: width * 0.8, marginVertical: '5%'}}>
          <Text
            style={{fontSize: dimension.fontScale * 15, marginVertical: '1%'}}>
            Thumbnail image
          </Text>
          <Text
            style={{
              fontSize: dimension.fontScale * 12,
              color: 'grey',
              marginVertical: '1%',
            }}>
            The image is what would be used to display the course to the student
          </Text>
        </View>

        {thumbnailUploaded ? (
          <View
            style={{
              width: width * 0.8,
              marginVertical: '5%',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: width * 0.001,
              height: height * 0.3,
              borderRadius: 10,
            }}>
            <View
              style={{
                position: 'absolute',
                //   backgroundColor: 'rgba(3,3,3,0.3)',
                height: height * 0.3,
                width: width * 0.8,
                borderRadius: 10,
              }}></View>
            <Ionicons
              onPress={handleUploadThumbnailImage}
              name="cloud-upload-outline"
              size={deviceSize * 0.00017}
              color={'rgb(220, 220, 220)'}
            />
            <Text
              style={{
                textAlign: 'center',
                width: '75%',
                color: 'rgb(220, 220, 220)',
              }}>
              Click to change thumbnail image .jpeg .png format
            </Text>
            <Image
              style={{
                width: width * 0.8,
                height: height * 0.3,
                position: 'absolute',
                zIndex: -1,
                borderRadius: 10,
              }}
              source={{
                uri: thumbnailImage,
              }}
            />
          </View>
        ) : (
          <View
            style={{
              width: width * 0.8,
              marginVertical: '5%',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: width * 0.001,
              height: height * 0.3,
              borderRadius: 10,
            }}>
            <View
              style={{
                position: 'absolute',
                //   backgroundColor: 'rgba(3,3,3,0.3)',
                height: height * 0.3,
                width: width * 0.8,
                borderRadius: 10,
              }}></View>
            <Ionicons
              onPress={handleUploadThumbnailImage}
              name="cloud-upload-outline"
              size={deviceSize * 0.00017}
              color={'rgb(220, 220, 220)'}
            />
            <Text
              style={{
                textAlign: 'center',
                width: '75%',
                color: 'rgb(220, 220, 220)',
              }}>
              Click to change thumbnail image .jpeg .png format
            </Text>
          </View>
        )}
      </>
      {/* footer */}
      <View
        style={{
          width: width * 0.8,
          // backgroundColor: 'blue',
          alignItems: 'flex-end',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: '20%',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            width: '40%',
            marginTop: '10%',
            backgroundColor: 'white',
            paddingHorizontal: '9%',
            paddingVertical: '3%',
            borderRadius: deviceSize * 0.0005,
            borderColor: brandColor,
            borderWidth: 2,
            //   color: brandColor,
          }}>
          <Text style={{color: brandColor}}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleContinueButton}
          style={{
            width: '40%',
            marginTop: '10%',
            backgroundColor: brandColor,
            paddingHorizontal: '9%',
            paddingVertical: '3%',
            borderRadius: deviceSize * 0.0005,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text style={{color: 'white'}}>Submit</Text>
          {/* <ActivityIndicator color={'white'} /> */}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PastQuestionPreviewAndThumbnailScreen;
