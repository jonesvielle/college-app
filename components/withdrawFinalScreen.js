import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ToastAndroid,
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
} from './modules';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TutorActiveImage from '../images/tutorActive.png';
import TutorInactiveImage from '../images/tutorInactive.png';
import StudentActiveImage from '../images/studentActive.png';
import StudentInactiveImage from '../images/studentInactive.png';
import LoginAsTutorImage from '../images/lot.png';
import Emoji from '../images/arab.png';
import LoginAsComponent from './signUpAsComponent';
import TextInputComponent from './TextInputComponent';
import ButtonComponent from './buttonComponent';
import BackButtonComponent from './backButtonComponent';
// import PickerComponent from './pickerComponent';
import {Picker} from '@react-native-picker/picker';
import Axios from 'axios';
// import {Picker} from '@react-native-picker/picker';

const WithdrawFinalScreen = ({route, navigation}) => {
  const {accountName, accountNumber, selectedBank, balance} = route.params;
  const [amount, setAmount] = useState('');
  const [recipientCode, setRecipientCode] = useState('');
  const [updateStates, setUpdateStates] = useState({});
  const [buttonState, setButtonState] = useState(false);

  useEffect(() => {}, []);

  const handleOnchangeAmount = (e) => {
    setAmount(e);
    console.log(e);
  };

  const handleWithdraw = () => {
    setButtonState(true);
    if (amount.length < 1) {
      ToastAndroid.show('Enter all details', ToastAndroid.LONG);
      setButtonState(false);
    } else {
      //   getAccountDetails();
    }
  };

  const createTransferRecipient = () => {
    var data = JSON.stringify({
      type: 'nuban',
      name: accountName,
      account_number: accountNumber,
      bank_code: selectedBank,
      currency: 'NGN',
    });

    var config = {
      method: 'post',
      url: 'https://api.paystack.co/transferrecipient',
      headers: {
        Authorization:
          'Bearer sk_live_c088456ae14839425ace6ad020beda6bbdcd44a5',
        'Content-Type': 'application/json',
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setRecipientCode(response.data.data.recipient_code);
        setUpdateStates({});
        initiateTransfer(response.data.data.recipient_code);
        // setButtonState(false);
      })
      .catch(function (error) {
        console.log(error);
        setButtonState(false);
        ToastAndroid.show('something went wrong', ToastAndroid.LONG);
      });
  };

  const initiateTransfer = (code) => {
    var data = JSON.stringify({
      source: 'balance',
      amount: amount,
      recipient: code,
      reason: 'Requested by tutor',
    });

    var config = {
      method: 'post',
      url: 'https://api.paystack.co/transfer',
      headers: {
        Authorization:
          'Bearer sk_live_c088456ae14839425ace6ad020beda6bbdcd44a5',
        'Content-Type': 'application/json',
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setButtonState(false);
        ToastAndroid.show('Withdrawal successful', ToastAndroid.LONG);
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setButtonState(false);
        ToastAndroid.show('something went wrong', ToastAndroid.LONG);
      });
  };
  return (
    <ScrollView style={{height: height}}>
      <View
        style={{
          padding: '5%',
          backgroundColor: 'white',
          height: height,
          // justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            marginTop: '5%',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <BackButtonComponent
            onPress={() => {
              navigation.goBack();
            }}
          />
          {/* <Text style={{color: 'rgb(114, 112, 112)'}}>Step 1/3</Text> */}
        </View>
        <View
          style={{
            // backgroundColor: 'blue',
            marginTop: '10%',
            // marginLeft: '5%',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}>
          <Text style={{fontSize: deviceSize * 0.00009}}>Withdraw</Text>
          <Image
            style={{width: width * 0.15, height: height * 0.05}}
            source={Emoji}
            resizeMode="center"
          />
        </View>
        {/* <View style={{flexDirection: 'row', width: '100%', marginTop: '2%'}}>
          <Text style={{color: 'rgb(114, 112, 112)'}}>
            Already have an account?
          </Text>
          <TouchableOpacity
            style={{marginLeft: '1%'}}
            onPress={() => {
              navigation.navigate('LoginAsScreen', {
                navigation: navigation,
              });
            }}>
            <Text style={{color: '#fb3846', fontWeight: 'bold'}}>Login</Text>
          </TouchableOpacity>
        </View> */}
        {/* <View> */}
        <View
          style={{
            marginTop: '10%',
            width: '100%',
            backgroundColor: 'rgba(250,0,0,0.2)',
            padding: '3%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              //   marginBottom: '5%',
              fontSize: dimension.fontScale * 16,
              color: 'brown',
              fontWeight: 'bold',
            }}>
            Account name
          </Text>
          <View style={{width: '60%'}}>
            <Text
              style={{
                //   marginBottom: '5%',
                flexWrap: 'wrap',
                fontSize: dimension.fontScale * 16,
                color: 'brown',
                fontWeight: 'bold',
                // flexDirection: 'row-reverse',
              }}>
              {accountName}
            </Text>
          </View>
        </View>
        {/* <PickerComponent /> */}
        {/* </View> */}
        <View style={{marginBottom: '40%'}}>
          <View style={{marginTop: '10%', width: width * 0.85}}>
            <Text>Amount</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: '3%',
              borderColor: 'grey',
              borderWidth: 0.5,
              paddingHorizontal: '2%',
            }}>
            <Text style={{padding: '2%', backgroundColor: 'rgba(0,0,0,0.1)'}}>
              NGN
            </Text>
            <TextInput
              onChangeText={handleOnchangeAmount}
              placeholder="Enter withdrawal amount"
              keyboardType="numeric"
            />
          </View>
        </View>
        <ButtonComponent
          onPress={() => {
            if (balance * 100 < amount) {
              ToastAndroid.show('Insufficient balance', ToastAndroid.LONG);
            } else {
              createTransferRecipient();
            }
          }}
          buttonText="Withdraw"
          //   isDisabled={continueButtonDisabled}
        />
      </View>
    </ScrollView>
  );
};

export default WithdrawFinalScreen;
