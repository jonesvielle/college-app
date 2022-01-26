import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import ThreeDotsIndicators from './threeDotsIndicator';
import Welcome from '../images/welcome.png';
import {brandColor, height, dimension, darkTextColor} from './modules';
import ButtonComponent from './buttonComponent';

const SignInAndSignUpScreen = ({route, navigation}) => {
  //   const [size, setSize] = useState(new Animated.Value(0));
  const size = useRef(new Animated.Value(0)).current;
  //   const [showGetStarted, setShowGetStarted] = useState(false);
  const animateButton = () => {
    // buttonAnimationValue.setValue()
    Animated.timing(size, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    animateButton();
  });
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: height,
        padding: '5%',
        alignItems: 'center',
      }}>
      <View style={{width: '100%'}}>
        {/* <Text
          style={{
            fontSize: dimension.fontScale * 25,
            fontWeight: 'bold',
            color: darkTextColor,
          }}>
          Hello dear,
        </Text> */}
        <Text
          style={{
            fontSize: dimension.fontScale * 25,
            fontWeight: 'bold',
            color: darkTextColor,
          }}>
          Start your journey with college
        </Text>
      </View>
      <Animated.Image
        style={{
          opacity: size,
          width: dimension.width * 0.9,
          height: dimension.width * 0.9,
          marginVertical: '25%',
        }}
        source={Welcome}
        resizeMode="center"
      />
      <Animated.View style={{marginBottom: '10%', transform: [{scale: 1}]}}>
        <ButtonComponent
          buttonText="Sign In"
          onPress={() => {
            navigation.navigate('StudentLoginScreen');
          }}
        />
      </Animated.View>
      <Animated.View style={{marginBottom: '0%', transform: [{scale: 1}]}}>
        <ButtonComponent
          buttonText="Sign Up"
          onPress={() => {
            navigation.navigate('StudentSignUpScreen');
          }}
        />
      </Animated.View>
    </View>
  );
};

export default SignInAndSignUpScreen;
