import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {
  deviceSize,
  height,
  width,
  brandColor,
  studentLoginAs,
  tutorLoginAs,
  dimension,
} from './modules';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TutorActiveImage from '../images/tutorActive.png';
import TutorInactiveImage from '../images/tutorInactive.png';
import StudentActiveImage from '../images/studentActive.png';
import StudentInactiveImage from '../images/studentInactive.png';
import LoginAsTutorImage from '../images/lot.png';
import Emoji from '../images/nigeria.png';
import LoginAsComponent from './signUpAsComponent';
import PasswordSuggestionComponent from './passwordSuggestionComponent';
import {onChange} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TextInputComponent = ({
  placeHolder,
  activeState,
  onFocus,
  secureTextEntry,
  isPassword,
  handleSecureEntryText,
  isAboveMinimumCharacters,
  atLeastOneUpperCase,
  atLeastOneDigit,
  onChange,
  isNumeric,
  hasImageLeft,
  image,
  hasTextLeft,
  showCounter,
  counterValue,
  editable,
  maxLength,
  lines,
  multiline,
  showDelete,
  value,
  deleteHandler,
  showChips,
  chipsData,
  deleteChip,
  chipIndex,
  hideCursor,
}) => {
  // const chipsData = ['m', 'ffg', 'ddjhhgh'];
  const [ste, setSte] = useState({});
  return (
    <View
      style={{
        flexDirection: 'column',
        width: '100%',
        borderColor: activeState ? brandColor : 'rgb(114, 112, 112)',
        borderWidth: deviceSize * 0.0000025,
        // position: 'relative',
        // height:
        backgroundColor: 'white',
        padding: '1%',
        marginTop: '5%',
        width: '100%',
        // borderColor: activeState ? brandColor : 'rgb(114, 112, 112)',
        // borderWidth: deviceSize * 0.0000025,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: activeState ? 6 : 0,
        alignItems: 'flex-start',
      }}>
      {showChips ? (
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {chipsData.map((c, i) => (
            <View
              style={{
                margin: '3%',
                padding: '3%',
                backgroundColor: 'rgb(228, 228, 228)',
                flexDirection: 'row',
              }}>
              <Text>{c}</Text>
              <Ionicons
                name="close"
                size={deviceSize * 0.00008}
                color={'black'}
                onPress={() => {
                  // alert(i);
                  chipsData.splice(i, 1);
                  setSte({});
                }}
                // chipIndex={i}
              />
            </View>
          ))}
        </View>
      ) : (
        <></>
      )}
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={10}
        enabled={true}
        style={{
          // position: 'relative',
          // height:
          // backgroundColor: 'white',
          // padding: '1%',
          // marginTop: '5%',
          // width: '100%',
          // // borderColor: activeState ? brandColor : 'rgb(114, 112, 112)',
          // // borderWidth: deviceSize * 0.0000025,
          // shadowColor: '#000',
          // shadowOffset: {
          //   width: 0,
          //   height: 3,
          // },
          // shadowOpacity: 0.27,
          // shadowRadius: 4.65,

          // elevation: activeState ? 6 : 0,
          flexDirection: 'row',
          // alignItems: 'center',
          // marginBottom: '40%',
        }}>
        {hasImageLeft ? (
          <View
            style={{
              // backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{width: width * 0.15, height: height * 0.02}}
              source={image}
              resizeMode="center"
            />
          </View>
        ) : (
          <></>
        )}
        {/* <Text>+234</Text> */}
        <TextInput
          caretHidden={hideCursor}
          textAlignVertical="top"
          editable={editable}
          keyboardAppearance="dark"
          // inlineImageLeft="nigeria"
          keyboardType={isNumeric ? 'numeric' : 'default'}
          onChangeText={onChange}
          placeholder={placeHolder}
          style={{
            backgroundColor: 'white',
            flex: 10,
            color: 'grey',
            fontSize: dimension.fontScale * 20,
            textAlign: 'justify',
            // textAlign: 'center',
          }}
          onFocus={onFocus}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          numberOfLines={lines}
          multiline={multiline}
          value={value}
          // onChange
        />
        {showDelete ? (
          <TouchableOpacity
            onPress={deleteHandler}
            style={{
              padding: '3%',
              backgroundColor: brandColor,
              borderRadius: 5,
            }}>
            <Ionicons
              name="trash"
              size={deviceSize * 0.00008}
              color={'white'}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
        {showCounter ? (
          <View style={{padding: '4%', backgroundColor: 'rgb(228, 228, 228)'}}>
            <Text>{counterValue}</Text>
          </View>
        ) : (
          <></>
        )}
        {isPassword ? (
          <TouchableOpacity
            style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}
            onPress={handleSecureEntryText}>
            {secureTextEntry ? (
              <Text style={{color: 'rgb(114, 112, 112)'}}>Show</Text>
            ) : (
              <Text style={{color: 'rgb(114, 112, 112)'}}>Hide</Text>
            )}
          </TouchableOpacity>
        ) : (
          <></>
        )}
        {/* <View style={{padding: '10', backgroundColor: 'grey'}}></View> */}
      </KeyboardAvoidingView>
      {activeState && isPassword ? (
        <>
          {isAboveMinimumCharacters ? (
            <></>
          ) : (
            <PasswordSuggestionComponent
              show={true}
              content="Minimum of 8 characters"
            />
          )}
          {atLeastOneUpperCase ? (
            <></>
          ) : (
            <PasswordSuggestionComponent show={true} content="1 uppercase" />
          )}
          {atLeastOneDigit ? (
            <></>
          ) : (
            <PasswordSuggestionComponent show={true} content="1 digit" />
          )}
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

export default TextInputComponent;
