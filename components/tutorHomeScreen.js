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
import TutorLectureCarouselCard from './tutorLectureCarouselCard';
import TutorPastQuestionCarouselCard from './tutorPastQuestionCarouselCard';

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

const TutorHomeScreen = ({
  navigation,
  tutorName,
  tutorUniversity,
  tutorVerification,
  tutorProfilePicture,
  authenticationToken,
  lectureAmount,
  pastQuestionAmount,
}) => {
  console.log('amount----', lectureAmount);
  const [earning, setEarning] = useState(0);
  const [lectures, setLectures] = useState([]);
  const [pastQuestions, setPastQuestions] = useState([]);
  const getData = () => {
    const earningRequest = Axios({
      method: 'post',
      url: 'http://collageapi.herokuapp.com/api/get_earnings/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        token: authenticationToken,
      }),
    })
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setEarning(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });

    const lecturesRequest = Axios({
      method: 'post',
      url: 'http://collageapi.herokuapp.com/api/get_lectures_tutor/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        token: authenticationToken,
      }),
    })
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setLectures(response.data.message);
      })
      .catch(function (error) {
        console.log('here', error);
      });

    const pastQuestionsRequest = Axios({
      method: 'post',
      url: 'http://collageapi.herokuapp.com/api/get_past_questions_tutor/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        token: authenticationToken,
      }),
    })
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setPastQuestions(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });

    // Axios.all([earningRequest])
    //   .then(
    //     Axios.spread((...response) => {
    //       console.log(response);
    //     }),
    //   )
    //   .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);
  const renderItem = ({item}) => (
    <TutorLectureCarouselCard
      title={item.title}
      course_code={item.course_code}
      thumbnail={item.thumbnail}
      id={item.id}
      rating={item.rating}
      navigation={navigation}
      lectureAmount={lectureAmount}
      authenticationToken={authenticationToken}
    />
  );
  const renderItem2 = ({item}) => (
    <TutorPastQuestionCarouselCard
      title={item.title}
      course_code={item.course_code}
      thumbnail={item.thumbnail}
      id={item.id}
      rating={item.rating}
      navigation={navigation}
      pastQuestionAmount={pastQuestionAmount}
      authenticationToken={authenticationToken}
    />
  );
  return (
    <View style={{backgroundColor: 'white', height: height, padding: '5%'}}>
      <TutorHeaderComponent title="Dashboard" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View
          style={{
            marginVertical: '10%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            // resizeMethod="scale"
            style={{
              width: width * 0.3,
              height: width * 0.3,
              borderRadius: deviceSize * 0.0003,
            }}
            source={{
              uri: tutorProfilePicture,
            }}
            resizeMode="stretch"
          />
          <View style={{marginHorizontal: '3%', flexWrap: 'wrap'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: dimension.fontScale * 20,
              }}>
              {titleCase(tutorName)}
            </Text>
            <Text style={{color: 'grey', fontSize: dimension.fontScale * 15}}>
              {titleCase(tutorUniversity)}
            </Text>
            <View style={{width: '100%'}}>
              <Text
                style={{
                  // width: 40,
                  padding: '5%',
                  backgroundColor: '#FCAA11',
                  margin: '1%',
                  borderRadius: deviceSize * 0.0003,
                  color: 'white',
                  textAlign: 'center',
                  fontSize: dimension.fontScale * 10,
                }}>
                {tutorVerification === 0 ? 'Not activated' : 'Activated'}
              </Text>
            </View>
            {/* if activated */}
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons
                name="star"
                size={deviceSize * 0.00006}
                color={'#FCAA11'}
              />
              <Ionicons
                name="star"
                size={deviceSize * 0.00006}
                color={'#FCAA11'}
              />
              <Ionicons
                name="star"
                size={deviceSize * 0.00006}
                color={'#FCAA11'}
              />
              <Ionicons
                name="star"
                size={deviceSize * 0.00006}
                color={'#FCAA11'}
              />
              <Ionicons
                name="star"
                size={deviceSize * 0.00006}
                color={'#FCAA11'}
              />
            </View> */}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              style={{fontWeight: 'bold', fontSize: dimension.fontScale * 15}}>
              {lectures.length}
            </Text>
            <Text style={{color: 'grey'}}>Courses</Text>
          </View>
          <View
            style={{
              backgroundColor: 'grey',
              width: width * 0.003,
              height: height * 0.1,
              marginHorizontal: '5%',
            }}></View>
          <View>
            <Text
              style={{fontWeight: 'bold', fontSize: dimension.fontScale * 15}}>
              {pastQuestions.length}
            </Text>
            <Text style={{color: 'grey'}}>Past Questions</Text>
          </View>
          <View
            style={{
              backgroundColor: 'grey',
              width: width * 0.003,
              height: height * 0.1,
              marginHorizontal: '5%',
            }}></View>
          <View>
            <Text
              style={{fontWeight: 'bold', fontSize: dimension.fontScale * 15}}>
              ${(earning / 385).toFixed(2)}
            </Text>
            <Text style={{color: 'grey'}}>Earnings</Text>
          </View>
        </View>
        <View
          style={{
            marginVertical: '5%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{fontWeight: 'bold', fontSize: dimension.fontScale * 15}}>
            My courses
          </Text>
          <Text
            onPress={() => {
              console.log(
                navigation.navigate('Courses', {university: tutorUniversity}),
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
                <Text>You have not published any course.</Text>
                <Text
                  style={{fontWeight: 'bold', color: brandColor}}
                  onPress={() => {
                    navigation.navigate('AddLecturesScreen', {
                      university,
                      authenticationToken,
                    });
                  }}>
                  Click to add.
                </Text>
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
          {/* if data exists */}
          {/* <FlatList
            // style={{marginBottom: '20%'}}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal={true}
          /> */}
        </View>
        <View
          style={{
            marginVertical: '5%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{fontWeight: 'bold', fontSize: dimension.fontScale * 15}}>
            Past questions
          </Text>
          <Text
            onPress={() => {
              console.log(navigation.navigate('PastQuestions'));
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
                <Text>You have not published any past question.</Text>
                <Text
                  style={{fontWeight: 'bold', color: brandColor}}
                  onPress={() => {
                    navigation.navigate('TutorPastQuestionTitle', {
                      university: tutorUniversity,
                      authenticationToken,
                    });
                  }}>
                  Click to add.
                </Text>
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
        </View>
      </ScrollView>
    </View>
  );
};

export default TutorHomeScreen;
