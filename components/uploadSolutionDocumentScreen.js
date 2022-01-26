import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
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

const UploadSolutionDocumentScreen = ({route, navigation}) => {
  const {
    title,
    university,
    selectedLevel,
    selectedFaculty,
    department,
    courseCode,
    authenticationToken,
    solutionVideoOutlines,
  } = route.params;
  const [updateStates, setUpdateStates] = useState({});
  const [file, setFile] = useState('');
  const [classObjectArray, setClassObjectArray] = useState([]);

  const [isUploading, setIsUploading] = useState(false);
  const [dataUploaded, setDataUploaded] = useState(0);
  const [fileType, setFileType] = useState('');
  const [showFile, setShowFile] = useState(false);
  const [fileObject, setFileObject] = useState('');
  const [solutionDocumentOutlines, setSolutionDocumentOultlines] = useState([]);

  const handleCreateSolutionVideoOutline = () => {
    const solutionVideoObject = {
      file,
    };
    if (file.length < 1) {
      alert('fill all necessary details');
    } else {
      solutionDocumentOutlines.push(solutionVideoObject);
      // setClassObjectArray([]);
      // setCourseTitle('');
      setFileObject({name: '.mp4'});
      setFile('');
      setUpdateStates({});
      console.log('output=>', solutionDocumentOutlines);

      // setFileObject({});
    }
  };
  const removeSolutionVideoFromArray = (value) => {
    solutionDocumentOutlines.splice(value, 1);
    setUpdateStates({});
  };
  const handleUploadFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      console.log(res);
      const fileObj = {
        type: res.type,
        name: res.name,
        uri: res.uri,
      };
      setFileType(fileObj.type);
      // const awsParams = awsOptions(fileType);
      setFileObject(fileObj);

      setUpdateStates({});
      // console.warn(awsParams);
      handleUploadFileToS3(fileObj);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.warn('cancelled');
      } else {
        throw error;
      }
    }
  };

  const handleUploadFileToS3 = (f) => {
    setShowFile(false);
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
        setIsUploading(false);
        setDataUploaded(0);
        setShowFile(true);
        setFile(response.body.postResponse.location);
        console.log(response.body.postResponse.location);
      })
      .catch((e) => {
        setIsUploading(false);
        setDataUploaded(0);
        console.warn(e);
        alert('something went wrong');
      });
  };

  const handleCancleFileUpload = (f) => {
    const awsParams = awsOptions();
    // console.warn(awsParams);
    RNS3.put(f, awsParams)
      .abort()
      .catch((e) => {
        // throw e;
      });
    setIsUploading(false);
    setDataUploaded(0);
    setShowFile(false);
    setFileObject({name: '.mp4'});
    setFile('');
    setUpdateStates({});
  };
  const handleContinueButton = () => {
    if (solutionDocumentOutlines.length < 1) {
      alert('fill all fields');
    } else {
      // alert('continue');
      console.log(JSON.stringify(solutionDocumentOutlines));
      navigation.navigate('PastQuestionPreviewAndThumbnailScreen', {
        authenticationToken,
        selectedFaculty,
        department,
        selectedLevel,
        title,
        university,
        courseCode,
        solutionDocumentOutlines,
        solutionVideoOutlines,
      });
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={{flex: 1, backgroundColor: 'white'}}
      contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
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
        <Text style={{color: 'rgb(114, 112, 112)'}}>Step 4/5</Text>
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
        <Text style={{fontSize: dimension.fontScale * 20}}>
          Upload solving sheet
        </Text>
        <Image
          style={{width: width * 0.15, height: height * 0.05}}
          source={Emoji}
          resizeMode="center"
        />
      </View>
      {solutionDocumentOutlines.map((c, i) => (
        <View style={{marginTop: '10%'}} key={i}>
          <View
            style={{
              width: width * 0.8,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text>Solution {i + 1}</Text>
            <Ionicons
              onPress={() => {
                removeSolutionVideoFromArray(i);
              }}
              name="trash-outline"
              size={deviceSize * 0.0001}
              color={'grey'}
            />
          </View>
          <View
            style={{
              width: width * 0.8,
              borderWidth: width * 0.001,
              padding: '3%',
              marginTop: '5%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: dimension.fontScale * 15,
                color: 'grey',
                width: '90%',
              }}>
              {c.file}
            </Text>
            <Ionicons
              name="checkmark-outline"
              size={deviceSize * 0.0001}
              color={'grey'}
            />
          </View>
        </View>
      ))}

      <View style={{marginTop: '10%'}}>
        <View
          style={{
            width: width * 0.8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text>Solution {solutionDocumentOutlines.length + 1}</Text>
        </View>

        {showFile ? (
          <View
            style={{
              width: width * 0.8,
              marginTop: '5%',
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderWidth: width * 0.001,
              paddingVertical: '3%',
              paddingHorizontal: '3%',
            }}>
            {isUploading ? (
              <View
                style={{
                  flexDirection: 'column',
                  width: '80%',
                  //   backgroundColor: 'yellow',
                }}>
                {/* <Text>{'dataUploaded'}%</Text> */}
                <Text style={{color: 'grey'}}>{dataUploaded - 1}%</Text>
                {/* <Text>{'dataUploaded'}%</Text> */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: width * 0.8,
                    // backgroundColor: 'green',
                  }}>
                  <View style={{width: '70%'}}>
                    <Progress.Bar
                      progress={(dataUploaded - 1) / 100}
                      width={200}
                      color={brandColor}
                    />
                  </View>
                  {/* <View style={{width: '10%'}}> */}
                  <View
                    style={{
                      backgroundColor: brandColor,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '10%',
                    }}>
                    <Ionicons
                      onPress={() => {
                        handleCancleFileUpload(fileObject);
                      }}
                      name="close"
                      size={deviceSize * 0.0001}
                      color={'white'}
                    />
                    {/* </View> */}
                  </View>
                </View>
              </View>
            ) : (
              <>
                <Text style={{color: 'grey', width: '60%'}}>
                  {fileObject.name}
                </Text>
                <TouchableOpacity
                  onPress={handleUploadFile}
                  style={{
                    backgroundColor: brandColor,
                    width: '38%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '3%',
                    borderRadius: 6,
                    marginLeft: '2%',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: dimension.fontScale * 15,
                    }}>
                    Upload file
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        ) : (
          <View
            style={{
              width: width * 0.8,
              marginTop: '5%',
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderWidth: width * 0.001,
              paddingVertical: '3%',
              paddingHorizontal: '3%',
            }}>
            {isUploading ? (
              <View
                style={{
                  flexDirection: 'column',
                  width: '80%',
                  //   backgroundColor: 'yellow',
                }}>
                {/* <Text>{'dataUploaded'}%</Text> */}
                <Text style={{color: 'grey'}}>{dataUploaded - 1}%</Text>
                {/* <Text>{'dataUploaded'}%</Text> */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: width * 0.8,
                    // backgroundColor: 'green',
                  }}>
                  <View style={{width: '70%'}}>
                    <Progress.Bar
                      progress={(dataUploaded - 1) / 100}
                      width={200}
                      color={brandColor}
                    />
                  </View>
                  {/* <View style={{width: '10%'}}> */}
                  <View
                    style={{
                      backgroundColor: brandColor,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '10%',
                    }}>
                    <Ionicons
                      onPress={() => {
                        handleCancleFileUpload(fileObject);
                      }}
                      name="close"
                      size={deviceSize * 0.0001}
                      color={'white'}
                    />
                    {/* </View> */}
                  </View>
                </View>
              </View>
            ) : (
              <>
                <Text style={{color: 'grey', width: '60%'}}>.pdf, .doc</Text>
                <TouchableOpacity
                  onPress={handleUploadFile}
                  style={{
                    backgroundColor: brandColor,
                    width: '38%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '3%',
                    borderRadius: 6,
                    marginLeft: '2%',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: dimension.fontScale * 15,
                    }}>
                    Upload file
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
        <View style={{width: width * 0.8, marginVertical: '3%'}}>
          <TouchableOpacity
            onPress={handleCreateSolutionVideoOutline}
            style={{
              marginTop: '5%',
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              // backgroundColor: 'blue',
            }}>
            <Ionicons
              name="add-circle"
              size={deviceSize * 0.0001}
              color={brandColor}
            />
            <Text
              style={{
                marginLeft: '2%',
                color: brandColor,
                fontWeight: 'bold',
              }}>
              Add solving sheet
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
            width: '30%',
            marginTop: '10%',
            backgroundColor: brandColor,
            paddingHorizontal: '9%',
            paddingVertical: '3%',
            borderRadius: deviceSize * 0.0005,
          }}>
          <Text style={{color: 'white'}}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UploadSolutionDocumentScreen;
