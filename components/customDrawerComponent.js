import React from 'react';
import {Image} from 'react-native';
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
} from './modules';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import Emoji from '../images/menu.png';

const Drawer = createDrawerNavigator();

const CustomDrawerComponent = ({navigation}) => {
  return (
    <DrawerContentScrollView>
      <DrawerItem
        label={() => (
          <Image
            style={{
              width: width * 0.1,
              height: height * 0.03,
              // marginVertical: '10%',
            }}
            source={Emoji}
            resizeMode="center"
          />
        )}
        // onPress={() => {
        //   alert('gg');
        // }}
        // labelStyle={{marginVertical: '10%'}}
        // icon={({focused, color, size}) => (
        //   <Icon
        //     color={color}
        //     size={size}
        //     name={focused ? 'heart' : 'heart-outline'}
        //   />
        // )}
      />
      <DrawerItem
        label={'Home'}
        labelStyle={{color: 'white', fontSize: dimension.fontScale * 15}}
        icon={({focused, color, size}) => (
          <Icon
            color={color}
            size={size}
            name={focused ? 'heart' : 'heart-outline'}
          />
        )}
        onPress={() => {
          console.log(navigation.isFocused());
        }}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerComponent;
