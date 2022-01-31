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
import {ScrollView, TextInput} from 'react-native-gesture-handler';
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
import RNPaystack from 'react-native-paystack';
import EmptySearch from '../images/search.png';
import MasterCard from '../images/mastercard.png';
import TextInputComponent from './TextInputComponent';
import PickerComponent from './pickerComponent';
import BackButtonComponent from './backButtonComponent';
import Bank from '../images/bank.png';
import ButtonComponent from './buttonComponent';
import FocusAwareStatusBar from './FocuseAwareStatusBar';

RNPaystack.init({
  publicKey: 'pk_live_5695b4545f2c18e250b7ed5721839a289740b0ff',
});

const StudentPaymentScreen = ({route, navigation}) => {
  const {
    studentEmail,
    studentId,
    studentUniversity,
    studentLevel,
    tutorId,
    date,
    lectureId,
    authenticationToken,
    role,
    amount,
  } = route.params;
  // const amount = 1000;
  //   const [bankName, setBankName] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardExpMonth, setCardExpMonth] = useState('');
  const [cardExpYear, setCardExpYear] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [updateStates, setUpdateStates] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [reference, setReference] = useState('');
  const [cardNumberDisplay, setCardNumberDisplay] = useState(null);
  const [expiryDateFocus, setExpiryDateFocus] = useState(false);
  const [expiryDateDispley, setExpiryDateDisplay] = useState(null);
  const [ccvFocus, setCcvFocus] = useState(false);

  const expiryDateTextInputRef = useRef(null);
  const ccvTextInputRef = useRef(null);

  // const groupStrings = (e) => {
  //   for (let i = 0; i < e.length; i++) {
  //     cardNumberDisplay.push(e[i]);
  //   }
  // };

  const initializeTransaction = () => {
    var data = JSON.stringify({
      email: studentEmail,
      amount: amount * 100,
    });

    var config = {
      method: 'post',
      url: 'https://api.paystack.co/transaction/initialize',
      headers: {
        Authorization:
          'Bearer sk_live_c088456ae14839425ace6ad020beda6bbdcd44a5',
        'Content-Type': 'application/json',
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data.data.access_code));
        setAccessCode(response.data.data.access_code);
        setUpdateStates({});
        chargeCard(response.data.data.access_code);
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        alert(error.response.data.message);

        setIsLoading(false);
      });
  };

  //   const bankList = ['GT BANK', 'FIRST BANK'];

  //   const handleBankName = (e, i) => {
  //     setBankName(e);
  //   };
  const handleCardNumber = (e) => {
    if (e.length < 23) {
      setCardNumber(e);
      let formattedText = e.split(' ').join('');
      if (formattedText.length > 0) {
        formattedText = formattedText
          .match(new RegExp('.{1,4}', 'g'))
          .join(' ');
      }
      setCardNumberDisplay(formattedText);
      return formattedText;
    } else {
      expiryDateTextInputRef.current.focus();
    }
  };
  const handleCardCvv = (e) => {
    setCardCvv(e);
  };
  const handleCardExpMonth = (e) => {
    if (e.length < 6) {
      setCardExpMonth(e);
      setExpiryDateDisplay(
        e.length === 3 && !e.includes('/')
          ? `${e.substring(0, 2)}/${e.substring(2)}`
          : e,
      );
      console.log(e);
    } else {
      ccvTextInputRef.current.focus();
    }
  };
  const handleCardExpYear = (e) => {
    setCardExpYear(e);
    console.log(e);
  };
  const handleAccountName = (e) => {
    setAccountName(e);
  };

  const handleAccountNumber = (e) => {
    setAccountNumber(e);
  };

  const handlePayNowButton = () => {
    setIsLoading(true);
    // alert(cardNumber);
    if (
      //   accountName.length < 1 ||
      //   accountNumber < 1 ||
      cardNumber.length < 1 ||
      cardCvv.length < 1 ||
      cardExpMonth.length < 1 ||
      cardExpYear.length < 1
    ) {
      alert('fill all neccessary details!');
      setIsLoading(false);
    } else {
      //   alert('grd');
      initializeTransaction();
    }
  };

  function chargeCard(access_code) {
    RNPaystack.chargeCardWithAccessCode({
      cardNumber: cardNumber,
      expiryMonth: cardExpMonth,
      expiryYear: cardExpYear,
      cvc: cardCvv,
      accessCode: access_code,
    })
      .then((response) => {
        console.log(response); // do stuff with the token
        setReference(response.reference);
        setUpdateStates({});
        addLectureSubScriptions(response.reference);
        if (role === 'pastQuestion') {
          addPastQuestionSubScriptions(response.reference);
        } else {
          addLectureSubScriptions(response.reference);
        }
      })
      .catch((error) => {
        //   console.log(error); // error is a javascript Error object
        console.log(error.message);
        alert(error.message);
        setIsLoading(false);
        //   console.log(error.code);
      });
  }
  const addLectureSubScriptions = (payment_reference) => {
    var data = JSON.stringify({
      token: authenticationToken,
      tutor_id: tutorId,
      lecture_id: lectureId,
      payment_reference,
      university: studentUniversity,
      level: studentLevel,
    });

    var config = {
      method: 'post',
      url: 'https://collageapi.herokuapp.com/api/subscribe_lecture/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setIsLoading(false);
        // alert('OK');
        navigation.navigate('StudentLectureAccessScreen', {
          lectureId,
          studentUniversity,
          tutorId,
          authenticationToken,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const addPastQuestionSubScriptions = (payment_reference) => {
    var data = JSON.stringify({
      token: authenticationToken,
      tutor_id: tutorId,
      past_questions_id: lectureId,
      payment_reference,
      university: studentUniversity,
      level: studentLevel,
    });

    var config = {
      method: 'post',
      url: 'https://collageapi.herokuapp.com/api/subscribe_past_questions/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setIsLoading(false);
        // alert('OK');
        navigation.navigate('StudentPastQuestionAccessScreen', {
          lecture_id: lectureId,
          studentUniversity,
          tutorId,
          authenticationToken,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // for(let i in '12474906')
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <FocusAwareStatusBar
        currentHeight={0}
        translucent={false}
        backgroundColor={brandColor}
      />
      <View style={{padding: '5%', backgroundColor: 'white'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            width: '100%',
          }}>
          <View>
            <BackButtonComponent />
          </View>
          <Text
            style={{
              width: '80%',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: dimension.fontScale * 17,
            }}>
            Make payment
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '5%',
            padding: '5%',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.1)',
            backgroundColor: '#FFF9F9',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Ionicons
              //   onPress={handleVideoPause}
              name={'ellipse'}
              size={20}
              color={brandColor}
              style={{marginRight: '5%'}}
            />
            <Text style={{fontSize: dimension.fontScale * 17}}>
              Pay via card
            </Text>
          </View>
          <View
            style={{
              width: '15%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ionicons
              //   onPress={handleVideoPause}
              name={'card-outline'}
              size={30}
              color={'grey'}
              style={{marginRight: '5%'}}
            />
          </View>
        </View>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '5%',
            padding: '5%',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.1)',
          }}>
          <View style={{flexDirection: 'row', width: '85%'}}>
            <Ionicons
              //   onPress={handleVideoPause}
              name={'ellipse-outline'}
              size={20}
              color={brandColor}
              style={{marginRight: '5%'}}
            />
            <Text style={{fontSize: dimension.fontScale * 17}}>
              Pay via Bank transfer
            </Text>
          </View>
          <View
            style={{
              width: '15%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={Bank}
              style={{width: width * 0.08, height: width * 0.08}}
            />
          </View>
        </View>

        {/* <View style={{padding: '5%'}}>
          <Text style={{fontSize: dimension.fontScale * 13}}>Account name</Text>
          <TextInputComponent
            placeHolder="Enter account name"
            onChange={handleAccountName}
          />
        </View> */}
        {/* <View style={{padding: '5%', width: '100%'}}>
          <Text style={{fontSize: dimension.fontScale * 13}}>
            Account Number
          </Text>
          <TextInputComponent
            placeHolder="Enter account number"
            onChange={handleAccountNumber}
          />
        </View> */}
        <View style={{padding: '0%', width: '100%', marginTop: '10%'}}>
          <Text style={{fontSize: dimension.fontScale * 13}}>Card Details</Text>
          <TextInputComponent
            rounded={true}
            value={cardNumberDisplay}
            hideCursor={true}
            isNumeric={true}
            placeHolder="Enter card number"
            onChange={handleCardNumber}
          />
        </View>
        <View
          style={{
            padding: '0%',
            flexDirection: 'row',
            marginVertical: '10%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{width: '45%', backgroundColor: 'transparent'}}>
            <Text style={{marginVertical: '5%'}}>Expiry Date</Text>
            <View
              style={{
                borderWidth: 0.5,
                padding: '2%',
                width: '100%',
                borderColor: 'grey',
                borderRadius: 10,
              }}>
              <TextInput
                ref={expiryDateTextInputRef}
                onChangeText={handleCardExpMonth}
                keyboardType="numeric"
                placeholder="MM/YY"
                value={expiryDateDispley}
              />
            </View>
          </View>

          <View style={{width: '45%', backgroundColor: 'transparent'}}>
            <Text style={{marginVertical: '5%'}}>CCV</Text>
            <View
              style={{
                width: '100%',
                borderWidth: 0.5,
                borderColor: 'grey',
                padding: '2%',
                borderRadius: 10,
              }}>
              <TextInput
                onChangeText={handleCardCvv}
                keyboardType="numeric"
                placeholder="CCV"
                ref={ccvTextInputRef}
              />
            </View>
          </View>

          {/* <TextInput /> */}
        </View>
        {/* <View style={{padding: '5%', width: '100%'}}>
          <Text style={{fontSize: dimension.fontScale * 13}}>Bank</Text>
          <PickerComponent selectedValue={bankName} pickerFunction={handleBankName} itemList={} placeholder="Select Bank"/>
        </View> */}
        {/* <TouchableOpacity
          onPress={handlePayNowButton}
          //   onPress={() => {
          //     alert('ok');
          //   }}
          disabled={isLoading}
          style={{
            width: '100%',
            marginTop: '10%',
            padding: '5%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: brandColor,
            flexDirection: 'row',
          }}>
          <Text style={{color: 'white', fontSize: dimension.fontScale * 17}}>
            Pay ${amount / 500} Now
          </Text>
          {isLoading ? (
            <ActivityIndicator
              size={20}
              color="white"
              style={{marginLeft: '3%'}}
            />
          ) : (
            <></>
          )}
        </TouchableOpacity> */}
        <ButtonComponent
          showLoader={isLoading}
          // onPress={handlePayNowButton}
          onPress={() => {
            groupStrings(cardNumberDisplay);
          }}
          buttonText={'Pay $' + amount / 500 + ' Now'}
        />
      </View>
    </ScrollView>
  );
};

export default StudentPaymentScreen;
