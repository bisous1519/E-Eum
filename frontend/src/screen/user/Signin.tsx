import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../utils/theme';
import useNav from '../../hooks/useNav';
import { MaterialIcons } from '@expo/vector-icons';
import useDimension from '../../hooks/useDimension';

// import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

const { DEVICE_WIDTH, DEVICE_HEIGHT } = useDimension();

const stylesTempBorder = StyleSheet.create({
  //일반 보더 확인용
  Red: {
    // borderWidth: 1,
    // borderColor: 'red',
  },
  Blue: {
    // borderWidth: 1,
    // borderColor: 'blue',
  },
  Yellow: {
    // borderWidth: 1,
    // borderColor: 'yellow',
  },
});

const stylesGlobalContainer = StyleSheet.create({
  //가장 큰 페이지
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.background,
    padding: 0,
    margin: 0,
  },
});

const stylesInnerContainer = StyleSheet.create({
  //내부 내용 global container
  container: {
    // backgroundColor: 'black',
    // flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    width: DEVICE_WIDTH * 0.9,
  },
});

const stylesLogo = StyleSheet.create({
  //첫번째 로고 이미지
  container: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
    marginTop: 10,
  },
  logoImg: {
    // backgroundColor: 'black',
    width: 130,
    height: 130,
    margin: 0,
    padding: 0,
  },
});

const stylesSignin = StyleSheet.create({
  // 두번째 이메일 비번 로그인 회원가입 비밀번호 찾기까지
  container: {
    width: '100%',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    // marginTop: 20,
  },
  box: {
    width: '100%',
    marginBottom: 10,
    marginTop: 20,
  },
  alignLeft: {
    alignItems: 'flex-start',
  },
  inputBoxID: {
    borderBottomColor: theme.mainColor.main,
    borderBottomWidth: 2,
    width: '100%',
    fontSize: 15,
    paddingBottom: 8,
  },
  inputBoxPW: {
    fontSize: 15,
    paddingBottom: 8,
  },
  boxPW: {
    borderBottomColor: theme.mainColor.main,
    borderBottomWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  showPWIcon: {
    color: 'gray',
    marginRight: 10,
    marginLeft: 10,
  },
  loginButton: {
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: theme.mainColor.main,
    borderRadius: 50,
    width: '100%',
    height: 50,
  },
  loginButtonText: {
    lineHeight: 50,
    fontSize: 20,
    color: 'white',
  },
  dividedTwo: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dividedEach: {
    width: 100,
  },
  dividedEaceText: {
    textAlign: 'center',
    color: '#525252',
  },
});

const stylesSocialSignin = StyleSheet.create({
  // 세번째 소셜 로그인 버튼들
  container: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 50,
  },
  socialButtonFrame: {
    width: '50%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dividedLine: {
    borderWidth: 0.5,
    borderColor: '#8B8B8B',
    height: '100%',
  },
});

export default function Signin(): JSX.Element {
  const navigation = useNav();

  const onPressSignup = () => {
    navigation.push('Signup');
  };

  const [userID, setUserID] = useState('');
  const [userPW, setUserPW] = useState('');

  const [showPW, setShowPW] = useState(false);

  const handleUserIDChange = (input: string) => {
    setUserID(input);
  };
  const handleUserPWChange = (input: string) => {
    setUserPW(input);
  };

  const handleSubmit = () => {
    console.log(userID + ', ' + userPW);
  };

  const handleSetShowPW = () => {
    setShowPW(!showPW);
  };

  return (
    <View
      style={StyleSheet.flatten([
        stylesTempBorder.Blue,
        stylesGlobalContainer.container,
      ])}
    >
      <View
        testID='inner'
        style={StyleSheet.flatten([
          stylesTempBorder.Red,
          stylesInnerContainer.container,
        ])}
      >
        <View
          testID='innerFirst'
          /* 첫번째 */ style={StyleSheet.flatten([
            stylesTempBorder.Blue,
            stylesLogo.container,
          ])}
        >
          <Image
            style={StyleSheet.flatten([stylesLogo.logoImg])}
            source={require('../../assets/images/logoWithText.png')}
          />
        </View>
        <View
          testID='innerSecond'
          /* 두번쨰 */ style={StyleSheet.flatten([
            stylesTempBorder.Blue,
            stylesSignin.container,
          ])}
        >
          <View
            style={StyleSheet.flatten([
              stylesTempBorder.Yellow,
              stylesSignin.box,
              stylesSignin.alignLeft,
            ])}
          >
            <TextInput
              testID='inputID'
              onChangeText={handleUserIDChange}
              value={userID}
              placeholder='EMAIL'
              style={StyleSheet.flatten([stylesSignin.inputBoxID])}
            ></TextInput>
          </View>
          <View
            style={StyleSheet.flatten([
              stylesTempBorder.Yellow,
              stylesSignin.box,
              stylesSignin.alignLeft,
              stylesSignin.boxPW,
            ])}
          >
            <TextInput
              testID='inputPW'
              secureTextEntry={showPW ? false : true}
              onChangeText={handleUserPWChange}
              value={userPW}
              placeholder='PW'
              style={StyleSheet.flatten([stylesSignin.inputBoxPW])}
            ></TextInput>
            <Pressable onPress={handleSetShowPW}>
              <MaterialIcons
                name={showPW ? 'visibility' : 'visibility-off'}
                size={24}
                style={StyleSheet.flatten([stylesSignin.showPWIcon])}
              />
            </Pressable>
          </View>
          <View
            testID='loginButton'
            style={StyleSheet.flatten([
              stylesTempBorder.Yellow,
              stylesSignin.box,
            ])}
          >
            <Pressable
              onPress={handleSubmit}
              style={StyleSheet.flatten([stylesSignin.loginButton])}
            >
              <Text style={StyleSheet.flatten([stylesSignin.loginButtonText])}>
                로그인
              </Text>
            </Pressable>
          </View>
          <View
            testID='SignupOrJoinPW'
            style={StyleSheet.flatten([
              stylesTempBorder.Red,
              stylesSignin.box,
              stylesSignin.dividedTwo,
            ])}
          >
            <View
              style={StyleSheet.flatten([
                stylesTempBorder.Blue,
                stylesSignin.dividedEach,
              ])}
            >
              <Pressable>
                <Text
                  style={StyleSheet.flatten([stylesSignin.dividedEaceText])}
                  onPress={onPressSignup}
                >
                  회원가입
                </Text>
              </Pressable>
            </View>
            <View
              style={StyleSheet.flatten([
                stylesTempBorder.Blue,
                stylesSignin.dividedEach,
              ])}
            >
              <Pressable>
                <Text
                  style={StyleSheet.flatten([stylesSignin.dividedEaceText])}
                >
                  비밀번호 찾기
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View
          testID='innerThird'
          /* 세번째 */ style={StyleSheet.flatten([
            stylesTempBorder.Red,
            stylesSocialSignin.container,
          ])}
        >
          <View
            testID='socialKakao'
            style={StyleSheet.flatten([
              stylesTempBorder.Blue,
              stylesSocialSignin.socialButtonFrame,
            ])}
          >
            <Pressable style={StyleSheet.flatten([stylesTempBorder.Red])}>
              <Image
                source={require('../../assets/images/kakao_login_medium.png')}
              />
            </Pressable>
          </View>
          <View
            style={StyleSheet.flatten([stylesSocialSignin.dividedLine])}
          ></View>
          <View
            testID='socialGoogle'
            style={StyleSheet.flatten([
              stylesTempBorder.Blue,
              stylesSocialSignin.socialButtonFrame,
            ])}
          >
            <Pressable style={StyleSheet.flatten([stylesTempBorder.Red])}>
              <Image
                source={require('../../assets/images/kakao_login_medium.png')}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
