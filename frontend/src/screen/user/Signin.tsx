import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ButtonComp from '../../components/common/button/ButtonComp';
import InputComp from '../../components/common/input/InputComp';
import useDimension from '../../hooks/useDimension';
import useInputText from '../../hooks/useInputText';
import useNav from '../../hooks/useNav';
import theme from '../../utils/theme';

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
  scrollContainer: {
    backgroundColor: theme.background,
  },
  //가장 큰 페이지
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.background,
    padding: 0,
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
    // marginBottom: 10,
    // marginTop: 20,
  },
  dividedTwo: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dividedEach: {
    width: 120,
  },
  dividedEaceText: {
    textAlign: 'center',
    color: '#525252',
    fontSize: theme.fontSize.regular,
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
  const onPressJoinPW = () => {
    navigation.push('JoinPW');
  };

  const { text: userEmail, onChangeText: onChangeUserEmail } = useInputText();
  const { text: userPW, onChangeText: onChangeUserPW } = useInputText();

  const handleSubmit = () => {
    console.log(userEmail + ', ' + userPW);
  };

  return (
    <ScrollView style={stylesGlobalContainer.scrollContainer}>
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
              style={stylesLogo.logoImg}
              source={require('../../assets/images/logoWithText.png')}
            />
          </View>
          {/* 로고 */}
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
                // stylesSignin.alignLeft,
              ])}
            >
              <InputComp
                name={'EMAIL'}
                text={userEmail}
                onChangeText={onChangeUserEmail}
              />
            </View>
            <View
              style={StyleSheet.flatten([
                stylesTempBorder.Yellow,
                stylesSignin.box,
                // stylesSignin.alignLeft,
              ])}
            >
              <InputComp
                name={'PW'}
                text={userPW}
                onChangeText={onChangeUserPW}
                pw={true}
              ></InputComp>
            </View>
            <View
              testID='loginButton'
              style={StyleSheet.flatten([
                stylesTempBorder.Yellow,
                stylesSignin.box,
                { marginTop: 20 },
              ])}
            >
              <ButtonComp text={'로그인'} onPressBtn={handleSubmit} />
            </View>
            <View
              testID='SignupOrJoinPW'
              style={StyleSheet.flatten([
                stylesTempBorder.Red,
                stylesSignin.box,
                stylesSignin.dividedTwo,
                { marginTop: 40 },
              ])}
            >
              <View
                style={StyleSheet.flatten([
                  stylesTempBorder.Blue,
                  stylesSignin.dividedEach,
                ])}
              >
                <Pressable onPress={onPressSignup}>
                  <Text style={stylesSignin.dividedEaceText}>회원가입</Text>
                </Pressable>
              </View>
              <View
                style={StyleSheet.flatten([
                  stylesTempBorder.Blue,
                  stylesSignin.dividedEach,
                ])}
              >
                <Pressable onPress={onPressJoinPW}>
                  <Text style={stylesSignin.dividedEaceText}>
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
              <Pressable style={stylesTempBorder.Red}>
                <Image
                  source={require('../../assets/images/kakao_login_medium.png')}
                />
              </Pressable>
            </View>
            <View style={stylesSocialSignin.dividedLine}></View>
            <View
              testID='socialGoogle'
              style={StyleSheet.flatten([
                stylesTempBorder.Blue,
                stylesSocialSignin.socialButtonFrame,
              ])}
            >
              <Pressable style={stylesTempBorder.Red}>
                <Image
                  source={require('../../assets/images/kakao_login_medium.png')}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
