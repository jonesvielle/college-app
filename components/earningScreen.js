import React, {useEffect, useState} from 'react';
import {View, Text, ToastAndroid} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {brandColor, dimension} from './modules';
import TutorHeaderComponent from './tutorHeaderComponent';
import Axios from 'axios';
import {useNavigation} from '@react-navigation/core';

const EarningScreen = ({authenticationToken}) => {
  const [earnings, setEarnings] = useState(0);
  const [withdrawals, setWithdrawals] = useState(0);
  const [updateState, setUpdateState] = useState({});

  const navigation = useNavigation();

  const getEarnings = () => {
    var data = JSON.stringify({
      token: authenticationToken,
    });

    var config = {
      method: 'post',
      url: 'http://collageapi.herokuapp.com/api/get_earnings/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setEarnings(response.data.message);
        setUpdateState({});
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getEarnings();
  }, []);
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={{height: '100%', padding: '5%'}}>
        <TutorHeaderComponent title="Earnings" />
        <View
          style={{
            marginVertical: '10%',
            // marginHorizontal: '5%',
            borderRadius: 10,
            paddingHorizontal: '5%',
            paddingVertical: '10%',
            backgroundColor: brandColor,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: dimension.fontScale * 20,
              }}>
              Total Balance
            </Text>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: dimension.fontScale * 20,
              }}>
              ${((earnings - withdrawals) / 500).toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (earnings - withdrawals === 0 || earnings - withdrawals < 0) {
                ToastAndroid.show('Insufficient balance', ToastAndroid.LONG);
              } else {
                navigation.navigate('WithdrawScreen', {
                  balance: earnings - withdrawals,
                });
              }
            }}
            activeOpacity={0.9}
            style={{
              backgroundColor: 'white',
              paddingVertical: '10%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: '5%',
              borderRadius: 20,
            }}>
            <Text
              style={{
                color: brandColor,
                fontWeight: 'bold',
                fontSize: dimension.fontScale * 17,
              }}>
              Withdraw
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: dimension.fontScale * 20,
          }}>
          Summary
        </Text>
        <View
          style={{
            marginVertical: '10%',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              // borderWidth: 1,
              width: '45%',
              paddingHorizontal: '5%',
              paddingVertical: '5%',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
              borderRadius: 10,
            }}>
            <Text style={{color: 'grey', fontSize: dimension.fontScale * 20}}>
              Earnings
            </Text>
            <Text
              style={{
                marginTop: '2%',
                fontWeight: 'bold',
                color: 'green',
                fontSize: dimension.fontScale * 20,
              }}>
              ${(earnings / 500).toFixed(2)}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              // borderWidth: 1,
              width: '45%',
              paddingHorizontal: '5%',
              paddingVertical: '5%',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
              borderRadius: 10,
            }}>
            <Text style={{color: 'grey', fontSize: dimension.fontScale * 20}}>
              Withdrawals
            </Text>
            <Text
              style={{
                marginTop: '2%',
                fontWeight: 'bold',
                color: 'red',
                fontSize: dimension.fontScale * 20,
              }}>
              ${(withdrawals / 500).toFixed(2)}
            </Text>
          </View>
        </View>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: dimension.fontScale * 20,
          }}>
          Transactions
        </Text>
      </View>
    </ScrollView>
  );
};

export default EarningScreen;
