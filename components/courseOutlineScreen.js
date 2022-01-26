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

const CourseOutlineScreen = ({route, navigation}) => {
  const {
    title,
    description,
    courseObjective,
    university,
    selectedLevel,
    selectedFaculty,
    department,
    courseCode,
    authenticationToken,
  } = route.params;
  const [updateStates, setUpdateStates] = useState({});
  const [courseOutlines, setCourseOutlines] = useState([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [classTitle, setClassTitle] = useState('');
  const [file, setFile] = useState('');
  const [classObjectArray, setClassObjectArray] = useState([]);

  const [isUploading, setIsUploading] = useState(false);
  const [dataUploaded, setDataUploaded] = useState(0);
  const [fileType, setFileType] = useState('');
  const [showFile, setShowFile] = useState(false);
  const [fileObject, setFileObject] = useState('');

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

  const handleUploadFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
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
  };

  const createCourseOutline = () => {
    const courseOutlineObject = {
      courseTitle,
      classObjectArray,
    };
    if (courseTitle.length < 1 || classObjectArray < 1) {
      alert('fill all necessary details');
    } else {
      courseOutlines.push(courseOutlineObject);
      setClassObjectArray([]);
      setCourseTitle('');
      setUpdateStates({});

      // setFileObject({});
    }
  };
  const createClassObject = (classTitle, file, fileObject) => {
    const classObject = {
      classTitle,
      file,
      fileObject,
    };
    classObjectArray.push(classObject);
    // setClassTitle()
    setUpdateStates({});
  };
  useEffect(() => {
    // fetchCourseCode();
  }, []);

  const handleOnChangeCourseTitle = (e) => {
    setCourseTitle(e);
  };
  const handleOnChangeClassTitle = (e) => {
    setClassTitle(e);
  };

  const handleAddNewClass = () => {
    if (classTitle.length < 1 || file.length < 1) {
      alert('fill required fields');
    } else {
      createClassObject(classTitle, file, fileObject);
      setShowFile(false);
      // setClassTitle('');
      // setFile('');
    }
  };

  const removeClassFromArray = (value) => {
    // const arrayCopy = [...classObjectArray];
    classObjectArray.splice(value, 1);
    setUpdateStates({});
  };

  const removeCourseFromArray = (value) => {
    courseOutlines.splice(value, 1);
    setUpdateStates({});
  };

  const handleContinueButton = () => {
    if (courseOutlines.length < 1) {
      alert('fill all fields');
    } else {
      // alert('continue');
      console.log(JSON.stringify(courseOutlines));
      navigation.navigate('CoursePreviewAndThumbnailScreen', {
        authenticationToken,
        selectedFaculty,
        department,
        selectedLevel,
        title,
        description,
        university,
        courseObjective,
        courseCode,
        courseOutlines,
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
        <Text style={{fontSize: dimension.fontScale * 20}}>Course Outline</Text>
        <Image
          style={{width: width * 0.15, height: height * 0.05}}
          source={Emoji}
          resizeMode="center"
        />
      </View>
      {/* arrays of topics */}
      {courseOutlines.map((c, i) => (
        <View style={{marginVertical: '5%', width: width * 0.8}} key={i}>
          <Text style={{fontSize: dimension.fontScale * 17}}>
            Topic {i + 1}
          </Text>
          <TextInputComponent
            placeHolder={c.courseTitle}
            //   activeState={true}
            //   showCounter={true}
            //   counterValue={counterValue}
            // onFocus={true}
            editable={false}
            //   onChange={handleOnChangeTitle}
            maxLength={32}
            // value={titleValue}
          />
          {c.classObjectArray.map((j, k) => (
            <View
              key={k}
              style={{
                width: width * 0.8,
                marginVertical: '2%',
                borderWidth: width * 0.001,
                borderRadius: 4,
                backgroundColor: 'rgb(253, 253, 253)',
              }}>
              <View
                style={{
                  marginTop: '5%',
                  marginLeft: '2%',
                  // marginRight: '2%',
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: '3%',
                }}>
                <Text style={{color: 'grey'}}>Class {k + 1}</Text>
                {/* <Ionicons
              onPress={() => {
                removeClassFromArray(i);
              }}
              name="trash"
              size={deviceSize * 0.0001}
              color={'grey'}
            /> */}
              </View>
              <View
                style={{
                  width: '100%',
                  height: height * 0.0015,
                  backgroundColor: 'grey',
                  marginVertical: '5%',
                }}></View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: '90%',
                    margin: '2%',
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderWidth: width * 0.001,
                    paddingVertical: '5%',
                    paddingHorizontal: '2%',
                  }}>
                  <Text style={{color: 'grey'}}>{j.classTitle}</Text>
                </View>

                <View
                  style={{
                    width: '90%',
                    margin: '2%',
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderWidth: width * 0.001,
                    paddingVertical: '5%',
                    paddingHorizontal: '2%',
                  }}>
                  <Text style={{color: 'grey', width: '85%'}}>
                    {j.fileObject.name}
                  </Text>
                  <Ionicons
                    name="checkmark"
                    size={deviceSize * 0.0001}
                    color={'green'}
                  />
                </View>
              </View>
            </View>
          ))}
          <View
            style={{
              width: '100%',
              marginVertical: '3%',
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={() => {
                removeCourseFromArray(i);
              }}
              style={{
                marginTop: '5%',
                // width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                // backgroundColor: 'blue',
              }}>
              <Ionicons
                name="remove-circle"
                size={deviceSize * 0.0001}
                color={'grey'}
              />
              <Text
                style={{
                  marginLeft: '2%',
                  color: 'grey',
                  fontWeight: 'bold',
                }}>
                Delete topic
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      {/* *** */}
      <View style={{marginVertical: '5%', width: width * 0.8}}>
        <Text style={{fontSize: dimension.fontScale * 17}}>
          Topic {courseOutlines.length + 1}
        </Text>
        <TextInputComponent
          placeHolder="Enter title"
          //   activeState={true}
          //   showCounter={true}
          //   counterValue={counterValue}
          // onFocus={true}
          // editable={titleEditable}
          onChange={handleOnChangeCourseTitle}
          maxLength={32}
          // value={titleValue}
        />
        {/* class rayy */}
        {classObjectArray.map((c, i) => (
          <View
            key={i}
            style={{
              width: width * 0.8,
              marginVertical: '2%',
              borderWidth: width * 0.001,
              borderRadius: 4,
              backgroundColor: 'rgb(253, 253, 253)',
            }}>
            <View
              style={{
                marginTop: '5%',
                marginLeft: '2%',
                // marginRight: '2%',
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: '3%',
              }}>
              <Text style={{color: 'grey'}}>Class {i + 1}</Text>
              <Ionicons
                onPress={() => {
                  removeClassFromArray(i);
                }}
                name="trash"
                size={deviceSize * 0.0001}
                color={'grey'}
              />
            </View>
            <View
              style={{
                width: '100%',
                height: height * 0.0015,
                backgroundColor: 'grey',
                marginVertical: '5%',
              }}></View>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '90%',
                  margin: '2%',
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderWidth: width * 0.001,
                  paddingVertical: '5%',
                  paddingHorizontal: '2%',
                }}>
                <Text style={{color: 'grey'}}>{c.classTitle}</Text>
              </View>

              <View
                style={{
                  width: '90%',
                  margin: '2%',
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderWidth: width * 0.001,
                  paddingVertical: '5%',
                  paddingHorizontal: '2%',
                }}>
                <Text style={{color: 'grey', width: '85%'}}>
                  {c.fileObject.name}
                </Text>
                <Ionicons
                  name="checkmark"
                  size={deviceSize * 0.0001}
                  color={'green'}
                />
              </View>
            </View>
          </View>
        ))}
        {/* ---- */}
        <View
          style={{
            width: width * 0.8,
            marginVertical: '2%',
            borderWidth: width * 0.001,
            borderRadius: 4,
            backgroundColor: 'rgb(253, 253, 253)',
          }}>
          <View style={{marginTop: '5%', marginLeft: '2%'}}>
            <Text style={{color: 'grey'}}>
              Class {classObjectArray.length + 1}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              height: height * 0.0015,
              backgroundColor: 'grey',
              marginVertical: '5%',
            }}></View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '90%',
                margin: '2%',
              }}>
              <TextInputComponent
                placeHolder="Enter class title"
                //   activeState={true}
                //   showCounter={true}
                //   counterValue={counterValue}
                // onFocus={true}
                // editable={titleEditable}
                onChange={handleOnChangeClassTitle}
                // maxLength={32}
                // value={titleValue}
              />
            </View>
            {showFile ? (
              <View
                style={{
                  width: '90%',
                  marginVertical: '2%',
                  backgroundColor: 'white',
                  borderWidth: width * 0.001,
                  paddingVertical: '2%',
                  paddingHorizontal: '2%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: 'grey', width: '85%'}}>
                  {fileObject.name}
                </Text>
                <Ionicons
                  name="checkmark"
                  size={deviceSize * 0.0001}
                  color={'green'}
                />
              </View>
            ) : (
              <></>
            )}

            {/* <View
              style={{
                width: '90%',
                margin: '2%',
                backgroundColor: 'white',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                borderWidth: width * 0.001,
                paddingVertical: '2%',
                paddingHorizontal: '2%',
              }}>
              <Text>{dataUploaded}%*</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <View>
                  <Progress.Bar
                    progress={dataUploaded / 100}
                    width={200}
                    color={brandColor}
                  />
                </View>
                <View style={{backgroundColor: brandColor, padding: '1%'}}>
                  <Ionicons
                    name="close"
                    size={deviceSize * 0.0001}
                    color={'white'}
                  />
                </View>
              </View>
            </View> */}

            {isUploading ? (
              <View
                style={{
                  width: '90%',
                  margin: '2%',
                  backgroundColor: 'white',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  borderWidth: width * 0.001,
                  paddingVertical: '2%',
                  paddingHorizontal: '2%',
                }}>
                {/* <Text>{'dataUploaded'}%</Text> */}
                <Text style={{color: 'grey'}}>{dataUploaded - 1}%</Text>
                {/* <Text>{'dataUploaded'}%</Text> */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <View>
                    <Progress.Bar
                      progress={(dataUploaded - 1) / 100}
                      width={200}
                      color={brandColor}
                    />
                  </View>
                  <View style={{backgroundColor: brandColor, padding: '1%'}}>
                    <Ionicons
                      onPress={() => {
                        handleCancleFileUpload(fileObject);
                      }}
                      name="close"
                      size={deviceSize * 0.0001}
                      color={'white'}
                    />
                  </View>
                </View>
              </View>
            ) : (
              <View
                style={{
                  width: '90%',
                  margin: '2%',
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderWidth: width * 0.001,
                  paddingVertical: '2%',
                  paddingHorizontal: '2%',
                }}>
                <Text style={{color: 'grey'}}>.mp4, .pdf, .docs</Text>
                <TouchableOpacity
                  onPress={handleUploadFile}
                  style={{
                    backgroundColor: brandColor,
                    // width: '30%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '3%',
                    borderRadius: 6,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: dimension.fontScale * 15,
                    }}>
                    Upload file
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={{width: '90%', marginVertical: '3%'}}>
              <TouchableOpacity
                onPress={handleAddNewClass}
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
                  Add new class
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={{width: width * 0.85, marginVertical: '0%'}}>
        <TouchableOpacity
          onPress={createCourseOutline}
          style={{
            // marginTop: '1%',
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
            Add new topic
          </Text>
        </TouchableOpacity>
      </View>
      {/*  */}

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
            width: '30%',
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

export default CourseOutlineScreen;
