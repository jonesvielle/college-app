import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  FlatList,
  ToastAndroid,
  RefreshControl,
  StatusBar,
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
  awsOptions,
  dimension,
  titleCase,
  apiDomain,
} from './modules';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Picker} from '@react-native-picker/picker';
import TutorActiveImage from '../images/tutorActive.png';
import TutorInactiveImage from '../images/tutorInactive.png';
import StudentActiveImage from '../images/studentActive.png';
import StudentInactiveImage from '../images/studentInactive.png';
import LoginAsTutorImage from '../images/lot.png';
import Emoji from '../images/mem.png';
import UploadImage from '../images/uploadImage.png';
import Nigeria from '../images/nigeria.png';
import LoginAsComponent from './signUpAsComponent';
import TextInputComponent from './TextInputComponent';
import ButtonComponent from './buttonComponent';
import PickerComponent from './pickerComponent';
import Axios from 'axios';
// import axios from 'axios';
import DocumentPicker from 'react-native-document-picker';
import {RNS3} from 'react-native-aws3';
import BackButtonComponent from './backButtonComponent';
import Brand from '../images/lot.png';
import EmptyCourses from '../images/emptyCourses.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TutorHeaderComponent from './tutorHeaderComponent';
import axios from 'axios';
import StudentLectureCarouselCard from './studentLectureCarouselCard';
import TutorPastQuestionCarouselCard from './tutorPastQuestionCarouselCard';
import StudentPastQuestionCarouselCard from './studentPastQuestionCarouselCard';
import StudentHeaderComponent from './studentHeaderComponent';
import StudentCoursesCardComponent from './studentCoursesCardComponent';
import Tm from '../images/tm.png';
import LinearGradient from 'react-native-linear-gradient';
import FocusAwareStatusBar from './FocuseAwareStatusBar';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const DATA2 = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item2 = ({title, thumbnail, course_code, id, rating}) => (
  <TouchableOpacity
    onPress={() => {
      alert(id);
    }}
    style={{
      // backgroundColor: '#f9c2ff',
      height: height * 0.4,
      width: width * 0.7,
      paddingRight: '8%',
      justifyContent: 'center',
      alignItems: 'center',
      // marginHorizontal: '2%',
    }}>
    {/* <View style={{width: '80%'}}> */}
    <Image
      style={{
        width: '100%',
        height: '60%',
        borderRadius: deviceSize * 0.0002,
      }}
      source={{
        uri: thumbnail,
      }}
      resizeMode="center"
    />
    <View
      style={{
        paddingHorizontal: '3%',
        justifyContent: 'center',
        // paddingHorizontal: '5%',
        width: '95%',
      }}>
      <Text style={{fontSize: dimension.fontScale * 15, fontWeight: 'bold'}}>
        {titleCase(title)}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'center',
          alignItems: 'center',
          marginVertical: '3%',
        }}>
        <Text
          style={{
            fontSize: dimension.fontScale * 10,
            fontWeight: 'bold',
            color: 'grey',
          }}>
          Course code:
        </Text>
        <Text
          style={{
            fontSize: dimension.fontScale * 10,
            fontWeight: 'bold',
            color: 'black',
            marginHorizontal: '2%',
            // color: 'grey',
          }}>
          {course_code}
        </Text>
      </View>
    </View>
    <View
      style={{
        width: '89%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Text
        style={{
          fontSize: dimension.fontScale * 15,
          fontWeight: 'bold',
          color: 'green',
        }}>
        $5.00
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{color: 'grey'}}>Ratings:</Text>
        <Text style={{fontWeight: 'bold'}}>{rating}</Text>
        <Ionicons name="star" size={deviceSize * 0.00006} color={'#FCAA11'} />
      </View>
    </View>
    {/* </View> */}
  </TouchableOpacity>
);

const StudentHomeScreen = ({
  route,
  studentName,
  studentUniversity,
  studentVerification,
  studentProfilePicture,
  authenticationToken,
  studentDepartment,
  studentLevel,
  studentEmail,
  studentId,
  navigation,
  lectureAmount,
  pastQuestionAmount,
}) => {
  const [earning, setEarning] = useState(0);
  const [lectures, setLectures] = useState([]);
  const [pastQuestions, setPastQuestions] = useState([]);
  const [lectureLastId, setLectuureLastId] = useState('none');
  const [pastQuestionLastId, setPastQuestionLastId] = useState('none');
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [updateStates, setUpdateStates] = useState({});
  const [lectureFavourites, setLectureFavourites] = useState([]);
  const [pastQuestionFavourites, setPastQuestionFavourites] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const getData = () => {
    const lecturesRequest = Axios({
      method: 'post',
      url: apiDomain + '/api/get_lectures_student/' + 'none',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        university: studentUniversity,
        page_size: 1000,
        department: studentDepartment,
        level: studentLevel,
      }),
    })
      .then(function (response) {
        console.log('resp lecs', response.data);
        if (response.data.message) {
          setLectures([]);
          setUpdateStates({});
        } else {
          console.log('resp lectures', JSON.stringify(response.data.data));
          setLectures(response.data.data);
          setLectuureLastId(response.data.last_id);
          setUpdateStates({});
        }
      })
      .catch(function (error) {
        console.log('here lecture request', error);
      });

    const pastQuestionsRequest = Axios({
      method: 'post',
      url: apiDomain + '/api/get_past_questions_student/' + 'none',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        university: studentUniversity,
        page_size: 10,
        department: studentDepartment,
        level: studentLevel,
      }),
    })
      .then(function (response) {
        console.log('PQ', JSON.stringify(response.data));
        if (response.data.message) {
          setPastQuestions([]);
          setUpdateStates({});
        } else {
          setPastQuestions(response.data.data);
          setPastQuestionLastId(response.data.last_id);
          setUpdateStates({});
        }
      })
      .catch(function (error) {
        console.log('here', error);
      });

    const lectureFavouritesRequest = Axios({
      method: 'post',
      url: apiDomain + '/api/get_lecture_favourites/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        token: authenticationToken,
      }),
    })
      .then(function (response) {
        console.log('lecture favourites', JSON.stringify(response.data));
        setLectureFavourites(response.data.message);
        setUpdateStates({});
      })
      .catch(function (error) {
        console.log('here', error);
        // ToastAndroid.show('')
      });

    const pastQuestionFavouritesRequest = Axios({
      method: 'post',
      url: apiDomain + '/api/get_past_questions_favourites/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        token: authenticationToken,
      }),
    })
      .then(function (response) {
        console.log('past question favourites', JSON.stringify(response.data));
        setPastQuestionFavourites(response.data.message);
        setUpdateStates({});
      })
      .catch(function (error) {
        console.log('here', error);
        // ToastAndroid.show('')
      });
    // setMasterDataSource(pastQuestions.concat(lectures));
    // Axios.all([earningRequest])
    //   .then(
    //     Axios.spread((...response) => {
    //       console.log(response);
    //     }),
    //   )
    //   .catch((err) => console.log(err));
  };
  const capitalizeFirstLetter = (word) => {
    const result = word.charAt(1).toUpperCase() + word.slice(1);
    return result;
  };

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    setUpdateStates({});
    // StatusBar.setBackgroundColor('transparent');
    // StatusBar.setTranslucent(true);
    getData();
  }, []);
  const renderItem = ({item}) => (
    <StudentLectureCarouselCard
      route={route}
      navigation={navigation}
      date={item.date}
      title={item.title}
      course_code={item.course_code}
      thumbnail={item.thumbnail}
      id={item.id}
      rating={item.rating}
      tutorProfilePicture={item.tutor_profile_picture}
      tutorName={item.tutor_name}
      preview_video={item.preview_video}
      course_outline={item.course_outline}
      description={item.description}
      studentEmail={studentEmail}
      studentId={studentId}
      studentUniversity={studentUniversity}
      studentLevel={studentLevel}
      tutorId={item.tutor_id}
      authenticationToken={authenticationToken}
      lectureAmount={lectureAmount}
    />
  );
  const renderItem2 = ({item}) => (
    <StudentPastQuestionCarouselCard
      route={route}
      navigation={navigation}
      date={item.date}
      title={item.title}
      course_code={item.course_code}
      thumbnail={item.thumbnail}
      id={item.id}
      rating={item.rating}
      // tutorProfilePicture={item.tutor_profile_picture}
      // tutorName={item.tutor_name}
      preview_video={item.preview_video}
      // course_outline={item.course_outline}
      // description={item.description}
      studentEmail={studentEmail}
      studentId={studentId}
      studentUniversity={studentUniversity}
      studentLevel={studentLevel}
      tutorId={item.tutor_id}
      authenticationToken={authenticationToken}
      pastQuestionAmount={pastQuestionAmount}
    />
  );

  const renderItem3 = ({item}) => (
    <StudentLectureCarouselCard
      route={route}
      navigation={navigation}
      date={item.date}
      title={item.title}
      course_code={item.course_code}
      thumbnail={item.thumbnail}
      id={item.id}
      rating={item.rating}
      tutorProfilePicture={item.tutor_profile_picture}
      tutorName={item.tutor_name}
      preview_video={item.preview_video}
      course_outline={item.course_outline}
      description={item.description}
      studentEmail={studentEmail}
      studentId={studentId}
      studentUniversity={studentUniversity}
      studentLevel={studentLevel}
      tutorId={item.tutor_id}
      authenticationToken={authenticationToken}
      lectureAmount={lectureAmount}
    />
  );
  const renderItem4 = ({item}) => (
    <StudentPastQuestionCarouselCard
      route={route}
      navigation={navigation}
      date={item.date}
      title={item.title}
      course_code={item.course_code}
      thumbnail={item.thumbnail}
      id={item.id}
      rating={item.rating}
      // tutorProfilePicture={item.tutor_profile_picture}
      // tutorName={item.tutor_name}
      preview_video={item.preview_video}
      // course_outline={item.course_outline}
      // description={item.description}
      studentEmail={studentEmail}
      studentId={studentId}
      studentUniversity={studentUniversity}
      studentLevel={studentLevel}
      tutorId={item.tutor_id}
      authenticationToken={authenticationToken}
      pastQuestionAmount={pastQuestionAmount}
    />
  );

  return (
    <View style={{backgroundColor: 'black', height: height, padding: '0%'}}>
      <FocusAwareStatusBar
        currentHeight={0}
        translucent
        backgroundColor="transparent"
      />
      <ScrollView
        onScroll={(e) => {
          // console.log(e.nativeEvent.contentOffset.y);
          if (e.nativeEvent.contentOffset.y > 100) {
            StatusBar.setTranslucent(false);
            StatusBar.setBackgroundColor(brandColor);
          } else {
            StatusBar.setTranslucent(true);
            StatusBar.setBackgroundColor('transparent');
          }
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={{width: width}}>
          <LinearGradient
            style={{height: height * 0.5}}
            // start={{x: 0, y: 0}}
            // end={{x: 1, y: 0}}
            colors={['rgba(50,0,0,1)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,1)']}>
            <Image
              source={Tm}
              style={{
                height: height * 0.5,
                width: width,
                position: 'absolute',
                zIndex: -1,
              }}
              resizeMode="stretch"
            />
          </LinearGradient>

          <View
            style={{
              // marginBottom: height * 0.25,
              margin: '5%',
              marginTop: -height * 0.44,
              justifyContent: 'space-between',
              // backgroundColor: 'green',
              height: height * 0.56,
              marginBottom: '2%',
            }}>
            <StudentHeaderComponent
              isHomesScreen
              title="COLLEGE"
              onPressSearch={() => {
                navigation.navigate('StudentSearchScreen', {
                  studentUniversity,
                  studentDepartment,
                  studentEmail,
                  studentId,
                  studentLevel,
                  authenticationToken,
                  pastQuestionAmount,
                  lectureAmount,
                });
              }}
            />
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  marginBottom: '5%',
                }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    // backgroundColor: 'green',
                    // flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Ionicons
                    // onPress={onPressSearch}
                    name="information-circle-outline"
                    size={deviceSize * 0.00008}
                    color="white"
                    style={{marginRight: '2%'}}
                  />
                  <Text
                    style={{
                      fontSize: dimension.fontScale * 13,
                      color: 'white',
                    }}>
                    More info
                  </Text>
                </TouchableOpacity>
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={{
                      backgroundColor: 'white',
                      paddingVertical: '10%',
                      paddingHorizontal: '10%',
                      borderRadius: 100,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '15%',
                    }}>
                    <Ionicons
                      // onPress={onPressSearch}
                      name="play"
                      size={deviceSize * 0.00008}
                      // color={isHomesScreen ? 'white' : 'grey'}
                      style={{marginRight: '2%'}}
                    />
                    <Text style={{fontWeight: 'bold'}}>Preview</Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: dimension.fontScale * 13,
                    }}>
                    MEE411
                  </Text>
                </View>

                <View
                  style={{
                    // backgroundColor: 'green',
                    // flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Ionicons
                    // onPress={onPressSearch}
                    name="time-outline"
                    size={deviceSize * 0.00008}
                    color="white"
                    style={{marginRight: '2%'}}
                  />
                  <Text
                    style={{
                      fontSize: dimension.fontScale * 13,
                      color: 'white',
                    }}>
                    40 Hours
                  </Text>
                </View>
              </View>

              {/* info course */}
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0%',
                }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    // backgroundColor: 'green',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '70%',
                  }}>
                  <Ionicons
                    // onPress={onPressSearch}
                    name="person-outline"
                    size={dimension.fontScale * 13}
                    color="white"
                    style={{marginRight: '5%'}}
                  />
                  <Text
                    style={{
                      fontSize: dimension.fontScale * 13,
                      color: 'white',
                    }}>
                    Hassan Adebanwo
                  </Text>
                </TouchableOpacity>
                {/* <View
                  style={{
                    // backgroundColor: 'green',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Ionicons
                    // onPress={onPressSearch}
                    name="time-outline"
                    size={deviceSize * 0.00008}
                    color="white"
                    style={{marginRight: '2%'}}
                  />
                  <Text
                    style={{
                      fontSize: dimension.fontScale * 13,
                      color: 'white',
                    }}>
                    40 Hours
                  </Text>
                </View> */}
                <View
                  style={{
                    // backgroundColor: 'green',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '25%',
                  }}>
                  <Text style={{color: brandColor}}>Rating: </Text>

                  <Ionicons
                    // onPress={onPressSearch}
                    name="star-outline"
                    size={dimension.fontScale * 13}
                    color="white"
                    style={{marginRight: '2%'}}
                  />
                  <Text
                    style={{
                      fontSize: dimension.fontScale * 13,
                      color: 'white',
                    }}>
                    4.6
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            padding: '5%',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.1)',
              width: '100%',
              borderTopRightRadius: 100,
              borderBottomRightRadius: 100,
            }}>
            <Text
              style={{
                marginVertical: '2%',
                // fontWeight: 'bold',
                fontSize: dimension.fontScale * 15,
                // backgroundColor: 'red',
                // width: '80%',
                marginHorizontal: '5%',
                color: 'black',
              }}>
              Hello, {studentName.toLowerCase()}
            </Text>
          </View>

          <View
            style={{
              marginVertical: '5%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: dimension.fontScale * 15,
                color: 'black',
              }}>
              Popular courses for your level
            </Text>
            <Text
              onPress={() => {
                console.log(
                  navigation.navigate('StudentCoursesScreen', {
                    university: studentUniversity,
                    authenticationToken,
                    department: studentDepartment,
                    level: studentLevel,
                    studentEmail,
                    studentId,
                    lectureAmount,
                  }),
                );
              }}
              style={{
                fontWeight: 'bold',
                fontSize: dimension.fontScale * 15,
                color: brandColor,
              }}>
              Show all
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              // padding: '5%',
            }}>
            {console.log('array here', lectures)}
            {lectures.length < 1 ? (
              <>
                <Image
                  style={{
                    width: width * 0.4,
                    height: width * 0.4,
                  }}
                  source={EmptyCourses}
                  resizeMode="center"
                />
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text>No lectures available yet</Text>
                </View>
              </>
            ) : (
              <View style={{width: '100%'}}>
                <FlatList
                  // style={{marginBottom: '20%'}}
                  data={lectures.reverse()}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            )}
          </View>
          {/* if data exists
        {/* <FlatList
            // style={{marginBottom: '20%'}}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal={true}
          /> 
        </View> */}
          <View
            style={{
              marginVertical: '5%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{fontWeight: 'bold', fontSize: dimension.fontScale * 15}}>
              Past questions for your level
            </Text>
            <Text
              onPress={() => {
                console.log(
                  navigation.navigate('StudentPastQuestionScreen', {
                    university: studentUniversity,
                    authenticationToken,
                    department: studentDepartment,
                    level: studentLevel,
                    studentEmail,
                    studentId,
                    pastQuestionAmount,
                  }),
                );
              }}
              style={{
                fontWeight: 'bold',
                fontSize: dimension.fontScale * 15,
                color: brandColor,
              }}>
              Show all
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '10%',
              // padding: '5%',
            }}>
            {pastQuestions.length < 1 ? (
              <>
                <Image
                  style={{
                    width: width * 0.4,
                    height: width * 0.4,
                  }}
                  source={EmptyCourses}
                  resizeMode="center"
                />
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text>No past question available yet</Text>
                  </View>
                </View>
              </>
            ) : (
              <View style={{width: '100%'}}>
                <FlatList
                  // style={{marginBottom: '20%'}}
                  data={pastQuestions.reverse()}
                  renderItem={renderItem2}
                  keyExtractor={(item) => item.id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  onEndReachedThreshold={width * 20}
                  onEndReached={() => {
                    console.warn('end reached');
                  }}
                />
              </View>
            )}
            {/* if data exists */}
            {/* <FlatList
            // style={{marginBottom: '20%'}}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal={true}
          /> */}

            <View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  // backgroundColor: 'red',
                  marginVertical: '5%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: dimension.fontScale * 15,
                    width: '100%',
                  }}>
                  Favourite past questions
                </Text>
              </View>
              <View style={{width: '100%', flexDirection: 'row'}}>
                {pastQuestionFavourites.length < 1 ? (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      // backgroundColor: 'red',
                      width: '100%',
                    }}>
                    <Image
                      style={{
                        width: width * 0.4,
                        height: width * 0.4,
                      }}
                      source={EmptyCourses}
                      resizeMode="center"
                    />
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text>Fetching... No favourite past question yet</Text>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View style={{width: '100%'}}>
                    <FlatList
                      // style={{marginBottom: '20%'}}
                      data={pastQuestionFavourites.reverse()}
                      renderItem={renderItem4}
                      keyExtractor={(item) => item.id}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      onEndReachedThreshold={width * 20}
                      onEndReached={() => {
                        console.warn('end reached');
                      }}
                    />
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default StudentHomeScreen;
