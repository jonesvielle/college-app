import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
// import Icon from 'react-native-ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
// const myIcon = ;

import {width, height, deviceSize, brandColor} from './modules';
import SignUpAsTutorImage from '../images/lot.png';

const SignUpAsComponent = ({
  borderColor,
  activeIcon,
  inactiveIcon,
  title,
  description,
  backgroundColor,
  activeState,
  onPressIn,
  iconPress,
}) => {
  // const IconBar = () => (
  //   <View>
  //     <Icon name="add" />

  //     <Icon ios="ios-add" android="md-add" />
  //   </View>
  // );
  return (
    <TouchableOpacity
      onPressIn={onPressIn}
      activeOpacity={0.9}
      style={{
        backgroundColor: activeState ? backgroundColor : 'white',
        paddingTop: '3%',
        paddingBottom: '3%',
        paddingLeft: '5%',
        paddingRight: '5%',
        // marginTop: '15%',
        flexDirection: 'row',
        width: width * 0.9,
        borderColor: borderColor,
        borderWidth: width * 0.003,
        borderRadius: deviceSize * 0.00002,
        marginBottom: '2%',
        marginBottom: '8%',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: activeState ? 6 : 0,
        // flexWrap: 'wrap',
      }}>
      <Image
        style={{width: width * 0.14, height: height * 0.1}}
        source={activeState ? activeIcon : inactiveIcon}
        resizeMode="center"
      />
      <View
        style={{
          paddingLeft: '5%',
          paddingRight: '10%',
          paddingTop: '3%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{width: width * 0.5}}>
          <Text style={{fontWeight: 'bold'}}>{title}</Text>
          <Text
            style={{
              flexWrap: 'wrap',
              marginTop: '3%',
              color: 'rgb(114, 112, 112)',
            }}>
            {description}
          </Text>
        </View>
        {/* <Text>TEST</Text> */}
        <Icon
          onPress={iconPress}
          name="arrow-right"
          size={activeState ? deviceSize * 0.00005 : 0}
          color={brandColor}
          style={{marginLeft: '10%'}}
        />
      </View>
      {/* <Text>TEST</Text> */}
      {/* <Icon name="sync" size={30} color="green" /> */}
      {/* <Image
        style={{
          width: width * 0.0004,
          height: height * 0.08,
          backgroundColor: 'blue',
        }}
        source={icon}
        resizeMode="center"
      /> */}

      {/* <Icon name="add" size={40} color="green" /> */}
    </TouchableOpacity>
  );
};

export default SignUpAsComponent;
