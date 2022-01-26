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
import Car1 from '../images/board1.png';
import Car2 from '../images/board2.png';
import Car3 from '../images/board3.png';
import {brandColor, height} from './modules';
import ButtonComponent from './buttonComponent';

const dimension = Dimensions.get('window');
const DATA = [
  {
    index: 0,
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title:
      'Watch world-class instructors share their skills and years of working experience with you',
    images: Car1,
  },
  {
    index: 1,
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title:
      'Have access to download the teaching materials at anytime and learn at your own pace',
    images: Car2,
  },
  {
    index: 2,
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title:
      'Complete your courses and be certified to succeed in any area of study taken',
    images: Car3,
  },
];

const Item = ({title, id, index, images}) => (
  <View
    style={{
      // paddingHorizontal: '10%',
      marginTop: '30%',
      backgroundColor: 'white',
      height: dimension.height * 0.5,
      width: dimension.width,
      justifyContent: 'center',
      alignItems: 'center',
      //   margin: ,
    }}>
    <Image
      style={{
        width: dimension.width * 0.8,
        height: dimension.width * 0.8,
      }}
      source={images}
      resizeMode="center"
    />
    <Text
      style={{
        width: dimension.width * 0.8,
        textAlign: 'center',
        marginTop: '10%',
      }}>
      {title}
    </Text>

    {/* <View
      style={{
        marginTop: '30%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        style={{
          padding: '3%',
          backgroundColor: 'red',
          width: dimension.width * 0.8,
          alignItems: 'center',
          justifyContent: 'center',
          margin: '2%',
        }}>
        <Text style={{color: 'white'}}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: '3%',
          backgroundColor: 'white',
          width: dimension.width * 0.8,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'red'}}>Login</Text>
      </TouchableOpacity>
    </View> */}
  </View>
);
const TourScreen = ({route, navigation}) => {
  // const buttonAnimationValue = useRef(new Animated.Value(0.3)).current;
  // console.log(navigation);

  const [index, setIndex] = useState(0);
  const [isNoMansLandState, setIsNoMansLand] = useState(false);
  const [showGetStarted, setShowGetStarted] = useState(false);

  const [size, setSize] = useState(new Animated.Value(showGetStarted ? 0 : 1));

  const indexRef = useRef(index);
  indexRef.current = index;
  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
    setIsNoMansLand(isNoMansLand);
    // console.log('is no mans land state', isNoMansLandState);
  }, []);

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback((e) => e.id, []),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: dimension.width,
        offset: index * dimension.width,
      }),
      [],
    ),
  };

  const animateButton = () => {
    // buttonAnimationValue.setValue()
    Animated.spring(size, {
      toValue: showGetStarted ? 1 : 0,
      useNativeDriver: false,
    }).start();
  };

  const handleNavigateToSignUpSignInScreen = () => {
    navigation.navigate('SignInAndSignUpScreen');
  };

  useEffect(() => {
    // console.warn(index);
    if (index === 1) {
      setShowGetStarted(true);
    }
    animateButton();
  }, [isNoMansLandState]);

  const renderItem = ({item}) => (
    <Item
      title={item.title}
      id={item.id}
      index={item.index}
      images={item.images}
    />
  );
  return (
    <View
      style={{
        // padding: '5%',
        // flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: 'white',
        height: height,
      }}>
      <View
        style={{
          width: '100%',
          alignItems: 'flex-end',
          padding: '5%',
        }}>
        <Text onPress={handleNavigateToSignUpSignInScreen}>skip</Text>
      </View>
      {/* <View style={{alignItems: 'stretch'}}> */}
      <FlatList
        pagingEnabled
        contentContainerStyle={{justifyContent: 'center'}}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}
        // style={{height: 3000}}
        {...flatListOptimizationProps}
      />
      {/* <Text>{index}</Text> */}
      <View style={{width: '100%'}}>
        <ThreeDotsIndicators
          index={index}
          activeColor={brandColor}
          inactiveColor={'grey'}
        />
      </View>
      {/* </View> */}

      <View
        style={{
          marginTop: '20%',
          marginBottom: '15%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {showGetStarted ? (
          // <View >
          <Animated.View style={{width: '100%', transform: [{scale: size}]}}>
            <ButtonComponent
              buttonText="Get Started"
              onPress={handleNavigateToSignUpSignInScreen}
            />
          </Animated.View>
        ) : (
          // </View>
          <View
            style={{
              paddingVertical: '4%',
              backgroundColor: 'blue',
            }}>
            <Text>{''}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default TourScreen;
