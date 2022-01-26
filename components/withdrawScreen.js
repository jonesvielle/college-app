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
import {useNavigation} from '@react-navigation/core';
// import {Picker} from '@react-native-picker/picker';

const WithdrawScreen = ({route}) => {
  const {balance} = route.params;
  const [banks, setBanks] = useState([]);
  const [bankInfo, setBankInfo] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [updateStates, setUpdateStates] = useState({});
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [buttonState, setButtonState] = useState(false);

  const navigation = useNavigation();

  const pickerFunction = (val) => {
    setSelectedBank(val);
    console.log(val);
  };
  const getBanks = () => {
    var config = {
      method: 'get',
      url: 'https://api.paystack.co/bank',
      headers: {
        Authorization:
          'Bearer sk_live_c088456ae14839425ace6ad020beda6bbdcd44a5',
      },
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data.data));
        setBanks(response.data.data);
        setUpdateStates({});
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getAccountDetails = () => {
    var config = {
      method: 'get',
      url:
        'https://api.paystack.co/bank/resolve?account_number=' +
        accountNumber +
        '&bank_code=' +
        selectedBank,
      headers: {
        Authorization:
          'Bearer sk_live_c088456ae14839425ace6ad020beda6bbdcd44a5',
      },
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setAccountName(response.data.data.account_name);
        setButtonState(false);
        setUpdateStates({});
        navigation.navigate('WithdrawFinalScreen', {
          accountName: response.data.data.account_name,
          accountNumber: response.data.data.account_number,
          selectedBank,
          balance,
        });
      })
      .catch(function (error) {
        console.log(error);
        setButtonState(false);
        ToastAndroid.show('something went wrong', ToastAndroid.LONG);
      });
  };
  useEffect(() => {
    getBanks();
  }, []);

  const handleOnchangeAccountNumber = (e) => {
    setAccountNumber(e);
  };

  const handleVerifyAccountDetails = () => {
    setButtonState(true);
    if (selectedBank.length < 1 || accountNumber.length < 1) {
      ToastAndroid.show('Enter all details', ToastAndroid.LONG);
      setButtonState(false);
    } else {
      getAccountDetails();
    }
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
            width: width * 0.9,
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
        <View style={{marginTop: '10%', width: '100%'}}>
          <Text style={{marginBottom: '5%'}}>Banks</Text>
          <View style={{borderWidth: 0.5, borderColor: 'grey'}}>
            {/* <Picker.Item label="Select your bank" value="" /> */}
            <Picker selectedValue={selectedBank} onValueChange={pickerFunction}>
              <Picker.Item label="Select your bank" value="" />
              {banks.map((c, i) => (
                <Picker.Item label={c.name} value={c.code} />
              ))}

              {/* <Picker.Item label="JavaScript" value="js" /> */}
            </Picker>
          </View>
        </View>
        {/* <PickerComponent /> */}
        {/* </View> */}
        <View style={{marginBottom: '40%'}}>
          <View style={{marginTop: '10%', width: width * 0.85}}>
            <Text>Account number</Text>
          </View>
          <TextInputComponent
            placeHolder="Enter your account number"
            isNumeric={true}
            onChange={handleOnchangeAccountNumber}
            // onChange={handleOnPasswordChange}
          />
        </View>
        <ButtonComponent
          onPress={handleVerifyAccountDetails}
          buttonText="Verify account and withdraw"
          //   isDisabled={continueButtonDisabled}
        />
      </View>
    </ScrollView>
  );
};

export default WithdrawScreen;
