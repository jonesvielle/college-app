import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {brandColor} from './modules';

const dimension = Dimensions.get('window');
const ThreeDotsIndicators = ({index, inactiveColor, activeColor}) => {
  console.log('index', index);
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: '10%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {index === 0 ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: dimension.width * 0.04,
            width: dimension.width * 0.08,
            borderRadius: dimension.height * dimension.width,
            backgroundColor: activeColor,

            // display: 'none',
            // margin: '1%',
          }}>
          <View
            style={{
              height: dimension.width * 0.02,
              width: dimension.width * 0.02,
              backgroundColor: activeColor,
              borderRadius: dimension.height * dimension.width,
              margin: '1%',
            }}></View>
        </View>
      ) : (
        <View
          style={{
            height: dimension.width * 0.02,
            width: dimension.width * 0.02,
            backgroundColor: inactiveColor,
            borderRadius: dimension.height * dimension.width,
            margin: '1%',
          }}></View>
      )}
      {index === 1 ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: dimension.width * 0.04,
            width: dimension.width * 0.08,
            borderRadius: dimension.height * dimension.width,
            backgroundColor: activeColor,

            // display: 'none',
            // margin: '1%',
          }}>
          <View
            style={{
              height: dimension.width * 0.02,
              width: dimension.width * 0.02,
              backgroundColor: activeColor,
              borderRadius: dimension.height * dimension.width,
              margin: '1%',
            }}></View>
        </View>
      ) : (
        <View
          style={{
            height: dimension.width * 0.02,
            width: dimension.width * 0.02,
            backgroundColor: inactiveColor,
            borderRadius: dimension.height * dimension.width,
            margin: '1%',
          }}></View>
      )}
      {index === 2 ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: dimension.width * 0.04,
            width: dimension.width * 0.08,
            borderRadius: dimension.height * dimension.width,
            backgroundColor: activeColor,
            // display: 'none',
            // margin: '1%',
          }}>
          <View
            style={{
              height: dimension.width * 0.02,
              width: dimension.width * 0.02,
              backgroundColor: activeColor,
              borderRadius: dimension.height * dimension.width,
              margin: '1%',
            }}></View>
        </View>
      ) : (
        <View
          style={{
            height: dimension.width * 0.02,
            width: dimension.width * 0.02,
            backgroundColor: inactiveColor,
            borderRadius: dimension.height * dimension.width,
            margin: '1%',
          }}></View>
      )}
    </View>
  );
};

export default ThreeDotsIndicators;
