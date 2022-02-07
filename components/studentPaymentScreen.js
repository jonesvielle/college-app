import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  ToastAndroid,
  // ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Axios from 'axios';
import {
  width,
  brandColor,
  dimension,
  apiDomain,
  makeid,
  errorHandler,
} from './modules';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
// import { Orientation } from 'react-native-pager-view';
import RNPaystack from 'react-native-paystack';
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
  const [bankName, setBankName] = useState('');
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
  const [expiryDate, setExpiryDate] = useState('');
  const [ccvFocus, setCcvFocus] = useState(false);
  const [activatePayWithCard, setActivatePayWithCard] = useState(true);
  const [activatePayWithTransfer, setActivatePayWithTransfer] = useState(false);
  const [bankList, setBankList] = useState([]);
  const [rawBankData, setRawBankData] = useState([]);
  const [selectedBankObject, setSelectedBankObject] = useState([]);
  const [ussdCode, setUSSDCode] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showUSSDCode, setShowUSSDCode] = useState(false);
  const [transferUSSDCode, setTransferUSSDCode] = useState(true);

  const expiryDateTextInputRef = useRef(null);
  const ccvTextInputRef = useRef(null);

  // const groupStrings = (e) => {
  //   for (let i = 0; i < e.length; i++) {
  //     cardNumberDisplay.push(e[i]);
  //   }
  // };
  const supportedUSSDBanks = [
    'Guaranty Trust Bank',
    'United Bank of Africa',
    'Sterling Bank',
    'Zenith Bank',
  ];

  useEffect(() => {
    // fetchBanks();
  }, []);

  const fetchBanks = () => {
    var config = {
      method: 'get',
      url: 'https://api.paystack.co/bank',
      headers: {
        Authorization: 'Bearer ' + process.env.PAYSTACK_SECRET,
        Cookie:
          'sails.sid=s%3AvabYwpLzjeBUBD1pvYuvwMrhxCBkOvoK.hOeNvTC29Uo0irehDpMjNmAx5m8WtiD6ITz%2BmQirR2E',
      },
    };

    Axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        setRawBankData(response.data.data);
        let temp = new Array();
        for (let i in response.data.data) {
          temp.push(response.data.data[i].name);
        }
        // console.log(temp);
        setBankList(temp);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handlePayWithCard = () => {
    setActivatePayWithCard(true);
    setActivatePayWithTransfer(false);
  };

  const handlePayWithTransfer = () => {
    setActivatePayWithCard(false);
    setActivatePayWithTransfer(true);
  };

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
        console.log('came here', error.response.data.message);
        // alert(error.response.data.message);
        setIsLoading(false);
        errorHandler(error);
      });
  };

  //   const bankList = ['GT BANK', 'FIRST BANK'];

  //   const handleBankName = (e, i) => {
  //     setBankName(e);
  //   };
  const handleCardNumber = (e) => {
    console.log(e.length, e);
    // console.log(e.length);
    if (e.length > 0 && expiryDate.length > 0 && cardCvv.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
    let formattedText = e.split(' ').join('');
    if (formattedText.length > 0) {
      formattedText = formattedText.match(new RegExp('.{1,4}', 'g')).join(' ');
    }
    setCardNumberDisplay(formattedText);
    if (e.length > 19) {
      expiryDateTextInputRef.current.focus();
    }
    let tempString = new Array();
    for (let i in e) {
      // console.log(e[i]);
      if (e[i] !== ' ') {
        tempString.push(e[i]);
      }
    }
    let formattedString = tempString.join('');
    setCardNumber(formattedString);
    // console.log('temp string', d);
  };
  const handleCardCvv = (e) => {
    if (e.length > 0 && expiryDate.length > 0 && cardNumber.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
    console.log('cvv', e);
    setCardCvv(e);
  };

  const handleCardExpMonth = (e) => {
    if (e.length > 0 && cardNumber.length > 0 && cardCvv.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
    if (e.length < 6) {
      setExpiryDateDisplay(
        e.length === 3 && !e.includes('/')
          ? `${e.substring(0, 2)}/${e.substring(2)}`
          : e,
      );
      console.log(e);
      setExpiryDate(e);
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

  const handleBankName = (e) => {
    setBankName(e);
    // let temp = new Array();
    // console.log(rawBankData.includes(e));
    // let bf = new Array();
    // for (i in rawBankData) {
    //   if (rawBankData[i].name === e) {
    //     bf.push(rawBankData[i]);
    //   }
    // }
    // console.log('bf', bf);
    // setSelectedBankObject(bf);
    if (e === 'Guaranty Trust Bank') {
      setUSSDCode('737');
    }
    if (e === 'United Bank of Africa') {
      setUSSDCode('919');
    }
    if (e === 'Sterling Bank') {
      setUSSDCode('822');
    }
    if (e === 'Zenith Bank') {
      setUSSDCode('966');
    }
    if (activatePayWithTransfer === true && e.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  const handlePayNowButton = () => {
    // alert('ok');
    setIsLoading(true);
    setButtonDisabled(true);
    // alert('ok');
    // alert(cardNumber);
    if (
      //   accountName.length < 1 ||
      //   accountNumber < 1 ||
      cardNumber.length < 1 ||
      cardCvv.length < 1 ||
      expiryDate.length < 1
    ) {
      setButtonDisabled(false);
      setIsLoading(false);
    } else {
      setButtonDisabled(true);
      setIsLoading(true);
      //   alert('grd');
      initializeTransaction();
    }
  };

  function chargeCard(access_code) {
    RNPaystack.chargeCardWithAccessCode({
      cardNumber: cardNumber,
      expiryMonth: expiryDateDispley.substring(0, 2),
      expiryYear: expiryDateDispley.substring(3),
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
        console.log('charge card', error.message);
        // alert(error.message);
        setIsLoading(false);
        setButtonDisabled(false);
        errorHandler({response: {data: {message: error.message}}});
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
      url: apiDomain + '/api/subscribe_lecture/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setIsLoading(false);
        setButtonDisabled(false);
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
        setButtonDisabled(false);
        setIsLoading(false);
        errorHandler(error);
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
        setButtonDisabled(false);
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
        setButtonDisabled(false);
        setIsLoading(false);
        errorHandler(error);
      });
  };
  // for(let i in '12474906')

  const handlePayWithUSSDCode = () => {
    setIsLoading(true);
    setButtonDisabled(true);
    var data = JSON.stringify({
      email: studentEmail,
      amount: (amount * 100) / amount,
      ussd: {
        type: ussdCode,
      },
      metadata: {
        token: authenticationToken,
        tutor_id: tutorId,
        lecture_id: lectureId,
        payment_reference: makeid(30),
        university: studentUniversity,
        level: studentLevel,
        payment_channel: 'USSD',
        payment_type: role === 'pastQuestion' ? 'past_questions' : 'lectures',
      },
    });

    var config = {
      method: 'post',
      url: 'https://api.paystack.co/charge',
      headers: {
        Authorization:
          'Bearer ' + 'sk_live_c088456ae14839425ace6ad020beda6bbdcd44a5',
        'Content-Type': 'application/json',
        Cookie:
          'sails.sid=s%3AjjiXi6mEscfV34eNle-2-vDy45JRudra.mcairEF%2FltYCwbd1q2iZMg%2BStDIFi7Gx9lIFJympkuw',
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setShowUSSDCode(true);
        setTransferUSSDCode(response.data.data.ussd_code);
        setIsLoading(false);
        setButtonDisabled(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        errorHandler(error);
        setButtonDisabled(false);
      });
  };
  const makeCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };
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
        {/* <Text>{expiryDateDispley.substring(3)}</Text> */}

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handlePayWithCard}
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '5%',
            padding: '5%',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.1)',
            backgroundColor: activatePayWithCard ? '#FFF9F9' : 'transparent',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Ionicons
              //   onPress={handleVideoPause}
              name={activatePayWithCard ? 'ellipse' : 'ellipse-outline'}
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
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handlePayWithTransfer}
          activeOpacity={0.9}
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '5%',
            padding: '5%',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.1)',
            backgroundColor: activatePayWithTransfer
              ? '#FFF9F9'
              : 'transparent',
          }}>
          <View style={{flexDirection: 'row', width: '85%'}}>
            <Ionicons
              //   onPress={handleVideoPause}
              name={activatePayWithTransfer ? 'ellipse' : 'ellipse-outline'}
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
        </TouchableOpacity>

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

        {activatePayWithCard ? (
          <>
            <View style={{padding: '0%', width: '100%', marginTop: '10%'}}>
              <Text style={{fontSize: dimension.fontScale * 13}}>
                Card Number
              </Text>
              <TextInputComponent
                rounded={true}
                value={cardNumberDisplay}
                hideCursor={true}
                isNumeric={true}
                placeHolder="0000-0000-0000-0000"
                onChange={handleCardNumber}
                maxLength={22}
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
                    maxLength={3}
                  />
                </View>
              </View>

              {/* <TextInput /> */}
            </View>
          </>
        ) : (
          <>
            {/* <View style={{padding: '0%', width: '100%', marginTop: '10%'}}>
              <Text style={{fontSize: dimension.fontScale * 13}}>
                Account Name
              </Text>
              <TextInputComponent
                rounded={true}
                hideCursor={true}
                placeHolder="Enter account name"
                onChange={handleAccountName}
              />
            </View> */}
            <View
              style={{
                padding: '0%',
                flexDirection: 'column',
                marginVertical: '10%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {showUSSDCode ? (
                <View
                  style={{
                    padding: '5%',
                    backgroundColor: 'rgba(0,20,200,0.05)',
                    width: '100%',
                  }}>
                  <Text style={{fontWeight: 'bold', marginTop: '5%'}}>
                    Almost done!
                  </Text>
                  <Text
                    onPress={() => {
                      makeCall(transferUSSDCode);
                    }}
                    style={{
                      marginTop: '5%',
                      fontWeight: 'bold',
                      color: 'rgba(1,100,200,1)',
                      fontSize: dimension.fontScale * 20,
                    }}>
                    <Text>Dial</Text> ({transferUSSDCode})
                  </Text>
                  <Text style={{marginTop: '5%'}}>
                    Click the code above to copy and dial it on your phone to
                    complete the process
                  </Text>
                  <Text style={{marginTop: '5%'}}>
                    When the payment is completed via USSD, you will have to
                    restart your app to access and enjoy your course,{' '}
                    <Text style={{fontWeight: 'bold', color: 'green'}}>
                      CHEERS
                    </Text>
                  </Text>
                </View>
              ) : (
                <></>
              )}
              <View style={{width: '100%', backgroundColor: 'transparent'}}>
                <Text style={{marginVertical: '1%', marginLeft: '2%'}}>
                  Bank
                </Text>
                <View
                  style={{
                    padding: '2%',
                    width: '100%',
                    borderColor: 'grey',
                  }}>
                  <PickerComponent
                    rounded={true}
                    itemList={supportedUSSDBanks}
                    selectedValue={bankName}
                    pickerFunction={handleBankName}
                    placeholder={'Select'}
                  />
                </View>
              </View>

              {/* <View style={{width: '45%', backgroundColor: 'transparent'}}>
                <Text style={{marginVertical: '5%'}}>Account Number</Text>
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
                    maxLength={10}
                    keyboardType={'numeric'}
                  />
                </View>
              </View> */}

              {/* <TextInput /> */}
            </View>
          </>
        )}

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
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ButtonComponent
            showLoader={isLoading}
            isDisabled={buttonDisabled}
            onPress={
              activatePayWithTransfer
                ? handlePayWithUSSDCode
                : handlePayNowButton
            }
            // onPress={handlePayNowButton}
            buttonText={'Pay $' + amount / 500 + ' Now'}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default StudentPaymentScreen;
