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
import { login } from '../../modules/apis/user/userApis';
import { LoginUserStateType } from '../../modules/apis/user/userAtomTypes';
import { useRecoilState } from 'recoil';
import { loginUserState } from '../../modules/apis/user/userAtoms';
import { shadowStyle } from '../../components/common/shadowStyle';

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
    height: DEVICE_HEIGHT,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
});

const stylesInnerContainer = StyleSheet.create({
  //내부 내용 global container
  container: {
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    width: DEVICE_WIDTH * 0.8,
    marginBottom: 50,
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
    marginTop: 10,
    marginBottom: 50,
  },
  box: {
    width: '100%',
    // marginBottom: 10,
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
    marginTop: 10,
  },
  socialButtonFrame: {
    width: '50%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button: {
    width: 120,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',

    shadowColor: 'rgba(0, 0, 0, 0.3)',
  },
  logo: {
    // borderWidth: 1,
    // borderColor: 'orange',
    width: 30,
    height: 30,
  },
  kakao: {
    backgroundColor: '#FAE64D',
  },
  // google: {
  //   backgroundColor: '#FAE64D',
  // },
  text: {
    fontSize: theme.fontSize.big,
    flex: 1,
    textAlign: 'center',
  },
  dividedLine: {
    borderWidth: 0.2,
    borderColor: '#d2d2d2',
    height: '100%',
  },
});

export default function Signin(): JSX.Element {
  const navigation = useNav();
  const [loginUser, setLoginUser] =
    useRecoilState<LoginUserStateType>(loginUserState);

  const onPressSignup = () => {
    navigation.push('Signup');
  };
  const onPressJoinPW = () => {
    navigation.push('JoinPW');
  };

  const { text: email, onChangeText: onChangeEmail } = useInputText();
  const { text: password, onChangeText: onChangePassword } = useInputText();

  const handleSubmit = () => {
    if (email && password) {
      login({ email, password })
        .then((data: LoginUserStateType) => {
          setLoginUser(data);
          if (data.uid === 11) {
            // 관리자
            navigation.navigate('AdminStack');
          } else {
            navigation.navigate('BottleBlue');
          }
        })
        .catch((e) => {
          alert('아이디와 비밀번호를 다시 확인해주세요');
        });
    }
  };

  return (
    <ScrollView
      style={stylesGlobalContainer.scrollContainer}
      scrollEnabled={false}
    >
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
          {/* 로고 */}
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
          {/* 아이디비번 input */}
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
                { marginBottom: 10 },
              ])}
            >
              <InputComp
                name={'EMAIL'}
                text={email}
                onChangeText={onChangeEmail}
              />
            </View>
            <View
              style={StyleSheet.flatten([
                stylesTempBorder.Yellow,
                stylesSignin.box,
              ])}
            >
              <InputComp
                name={'PW'}
                text={password}
                onChangeText={onChangePassword}
                pw={true}
              />
            </View>
            <View
              testID='loginButton'
              style={StyleSheet.flatten([
                stylesTempBorder.Yellow,
                stylesSignin.box,
                { marginTop: 30 },
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
                { marginTop: 50 },
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
          {/* 소셜로그인 */}
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
              <Pressable
                style={StyleSheet.flatten([
                  shadowStyle.shadow,
                  stylesSocialSignin.button,
                  stylesSocialSignin.kakao,
                ])}
              >
                <Image
                  style={stylesSocialSignin.logo}
                  source={require('../../assets/images/kakaoLogo.png')}
                />
                <Text style={stylesSocialSignin.text}>Login</Text>
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
              <Pressable
                style={StyleSheet.flatten([
                  shadowStyle.shadow,
                  stylesSocialSignin.button,
                ])}
              >
                <Image
                  style={stylesSocialSignin.logo}
                  source={require('../../assets/images/googleLogo.png')}
                />
                <Text style={stylesSocialSignin.text}>Google</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

