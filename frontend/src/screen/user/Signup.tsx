import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../utils/theme';
import { Feather } from '@expo/vector-icons';
import { color } from 'react-native-reanimated';
import * as Font from 'expo-font';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

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
    marginBottom: 300,
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

const stylesSignupInput = StyleSheet.create({
  box: {
    width: '100%',
    marginBottom: 10,
    marginTop: 20,
    borderBottomWidth: 2,
    borderBottomColor: theme.mainColor.main,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 10,
    height: 60,
  },
  inputStyle: {
    fontSize: theme.fontSize.regular,
    // borderWidth: 1,
    // borderColor: 'red',
    height: 35,
    flex: 1,
    paddingTop: 2,
    paddingBottom: 2,
  },
  button: {
    width: '20%',
    backgroundColor: theme.mainColor.light,
    height: 30,
    borderRadius: 50,
  },
  buttonInnerText: {
    textAlign: 'center',
    lineHeight: 30,
    color: theme.textColor.main,
    fontSize: theme.fontSize.small,
  },
  timeLeft: {
    color: '#949494',
    marginRight: 10,
    marginLeft: 10,
  },
  checkIcon: {
    marginRight: 10,
    marginLeft: 10,
  },
  noInputTextContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
  },
  noInputTextBox: {
    flexDirection: 'column',
    paddingLeft: 40,
  },
  noInputTextTitle: {
    fontSize: theme.fontSize.regular,
    color: theme.textColor.light,
  },
  noInputTextSelectionButton: {
    width: 18,
    height: 18,
    borderRadius: 20,
    // borderWidth: 0.5,
    // borderColor: 'black',
    marginRight: 10,
  },
  noInputTextSelections: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  noInputTextSelectionText: {
    fontSize: theme.fontSize.regular,
    fontFamily: theme.fontFamily.main,
  },
  addProfileImageButton: {
    backgroundColor: theme.grayColor.lightGray,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10,
  },
  addProfileImageButtonText: {
    color: theme.textColor.light,
    fontSize: theme.fontSize.big,
  },
});

export default function Signup(): JSX.Element {
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [verifCode, setVerifCode] = useState<string>('');
  const [userPW, setUserPW] = useState<string>('');
  const [userVerifPW, setUserVerifPW] = useState<string>('');
  const [userNickName, setUserNickName] = useState<string>('');
  const [userGender, setUserGender] = useState<string>('');
  const [userProfileImage, setUserProfileImage] = useState<string>('');
  const [userType, setUserType] = useState<string>('');

  const [checkRegexPW, setCheckRegexPW] = useState<boolean>(false);
  const [checkSamePW, setCheckSamePW] = useState<boolean>(false);

  const [timeLeft, setTimeLeft] = useState<number>(5);
  const [timerOn, setTimerOn] = useState<boolean>(false);

  const handleUserName = (input: string) => {
    setUserName(input);
  };
  const handleUserEmail = (input: string) => {
    setUserEmail(input);
  };
  const handleVerifCode = (input: string) => {
    setVerifCode(input);
  };

  const handleTimeLeft = () => {
    setTimerOn(true);
  };

  //이메일 인증 관련
  useEffect(() => {
    let interval: any;
    console.log('카운트다운');
    if (timerOn && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } else {
      setTimerOn(false);
      setTimeLeft(5);
    }
    return () => clearInterval(interval);
  }, [timerOn, timeLeft]);

  // 비밀번호 관련
  const PWRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/;
  const handleUserPW = (input: string) => {
    setUserPW(input);
    setUserVerifPW('');
    if (!PWRegex.test(input)) setCheckRegexPW(false);
    else setCheckRegexPW(true);
    setCheckSamePW(false);
  };

  const handleUserVerifPW = (input: string) => {
    setUserVerifPW(input);
  };

  useEffect(() => {
    console.log('비밀번호 같은지 체크');
    setCheckSamePW(userPW !== '' && userPW === userVerifPW);
  }, [userVerifPW]);

  // 닉네임 관련
  const handleUserNickName = (input: string) => {
    setUserNickName(input);
  };

  // 성별 관련
  const handleGender = (input: string) => {
    setUserGender(input);
  };

  //프로필 사진 관련

  //회원 구분 관련
  const handleUserType = (input: string) => {
    setUserType(input);
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
            style={StyleSheet.flatten([
              stylesTempBorder.Yellow,
              stylesSignupInput.box,
            ])}
          >
            <TextInput
              testID='inputName'
              onChangeText={handleUserName}
              value={userName}
              placeholder='이름 (~8자)'
              maxLength={8}
              style={stylesSignupInput.inputStyle}
            ></TextInput>
          </View>
          <View
            style={StyleSheet.flatten([
              stylesTempBorder.Yellow,
              stylesSignupInput.box,
            ])}
          >
            <TextInput
              testID='inputEmail'
              onChangeText={handleUserEmail}
              value={userEmail}
              placeholder='이메일'
              style={stylesSignupInput.inputStyle}
            ></TextInput>
            <Pressable
              onPress={handleTimeLeft}
              style={stylesSignupInput.button}
            >
              <Text style={stylesSignupInput.buttonInnerText}>인증</Text>
            </Pressable>
          </View>
          <View
            style={StyleSheet.flatten([
              stylesTempBorder.Yellow,
              stylesSignupInput.box,
            ])}
          >
            <TextInput
              testID='inputVerifCode'
              onChangeText={handleVerifCode}
              value={verifCode}
              placeholder='코드 입력'
              style={stylesSignupInput.inputStyle}
            ></TextInput>
            <Text style={stylesSignupInput.timeLeft}>{`${Math.floor(
              timeLeft / 60
            )
              .toString()
              .padStart(2, '0')}:${(timeLeft % 60)
              .toString()
              .padStart(2, '0')}`}</Text>
            <Pressable style={stylesSignupInput.button}>
              <Text style={stylesSignupInput.buttonInnerText}>확인</Text>
            </Pressable>
          </View>
          <View
            style={StyleSheet.flatten([
              stylesTempBorder.Yellow,
              stylesSignupInput.box,
            ])}
          >
            <TextInput
              testID='inputPW'
              onChangeText={handleUserPW}
              value={userPW}
              placeholder='비밀번호'
              secureTextEntry={true}
              maxLength={16}
              style={stylesSignupInput.inputStyle}
            ></TextInput>
            <View style={stylesSignupInput.checkIcon}>
              <Feather
                name='check-circle'
                size={24}
                color={
                  checkRegexPW
                    ? theme.mainColor.main
                    : userPW === ''
                    ? theme.textColor.light
                    : theme.textColor.error
                }
              />
            </View>
          </View>
          <View
            style={StyleSheet.flatten([
              stylesTempBorder.Yellow,
              stylesSignupInput.box,
            ])}
          >
            <TextInput
              testID='inputVerifPW'
              onChangeText={handleUserVerifPW}
              value={userVerifPW}
              placeholder='비밀번호 확인'
              secureTextEntry={true}
              maxLength={16}
              style={stylesSignupInput.inputStyle}
            ></TextInput>
            <View style={stylesSignupInput.checkIcon}>
              <Feather
                name='check-circle'
                size={24}
                color={
                  checkSamePW
                    ? theme.mainColor.main
                    : userVerifPW === ''
                    ? theme.textColor.light
                    : theme.textColor.error
                }
              />
            </View>
          </View>
          <View
            style={StyleSheet.flatten([
              stylesTempBorder.Yellow,
              stylesSignupInput.box,
            ])}
          >
            <TextInput
              testID='inputNickName'
              onChangeText={handleUserNickName}
              value={userNickName}
              placeholder='닉네임'
              maxLength={10}
              style={stylesSignupInput.inputStyle}
            ></TextInput>
          </View>
          <View
            style={StyleSheet.flatten([
              stylesTempBorder.Yellow,
              stylesSignupInput.noInputTextContainer,
            ])}
          >
            <Text style={stylesSignupInput.noInputTextTitle}>성별</Text>
            <View
              style={StyleSheet.flatten([
                stylesTempBorder.Blue,
                stylesSignupInput.noInputTextBox,
              ])}
            >
              <Pressable
                onPress={() => handleGender('Female')}
                style={stylesSignupInput.noInputTextSelections}
              >
                <View
                  style={[
                    stylesSignupInput.noInputTextSelectionButton,
                    {
                      backgroundColor:
                        userGender === 'Female'
                          ? theme.mainColor.main
                          : theme.grayColor.lightGray,
                    },
                  ]}
                ></View>
                <Text style={stylesSignupInput.noInputTextSelectionText}>
                  여성
                </Text>
              </Pressable>
              <Pressable
                onPress={() => handleGender('Male')}
                style={stylesSignupInput.noInputTextSelections}
              >
                <View
                  style={[
                    stylesSignupInput.noInputTextSelectionButton,
                    {
                      backgroundColor:
                        userGender === 'Male'
                          ? theme.mainColor.main
                          : theme.grayColor.lightGray,
                    },
                  ]}
                ></View>
                <Text style={stylesSignupInput.noInputTextSelectionText}>
                  남성
                </Text>
              </Pressable>
              <Pressable
                onPress={() => handleGender('None')}
                style={stylesSignupInput.noInputTextSelections}
              >
                <View
                  style={[
                    stylesSignupInput.noInputTextSelectionButton,
                    {
                      backgroundColor:
                        userGender === 'None'
                          ? theme.mainColor.main
                          : theme.grayColor.lightGray,
                    },
                  ]}
                ></View>
                <Text style={stylesSignupInput.noInputTextSelectionText}>
                  선택 안 함
                </Text>
              </Pressable>
            </View>
          </View>
          <View
            style={StyleSheet.flatten([
              stylesTempBorder.Yellow,
              stylesSignupInput.noInputTextContainer,
            ])}
          >
            <Text style={stylesSignupInput.noInputTextTitle}>프로필 사진</Text>
            <Pressable
              style={StyleSheet.flatten([
                stylesTempBorder.Red,
                stylesSignupInput.addProfileImageButton,
              ])}
            >
              <Text style={stylesSignupInput.addProfileImageButtonText}>+</Text>
            </Pressable>
          </View>
          <View
            style={StyleSheet.flatten([
              stylesTempBorder.Yellow,
              stylesSignupInput.noInputTextContainer,
            ])}
          >
            <Text style={stylesSignupInput.noInputTextTitle}>회원구분</Text>
            <View
              style={StyleSheet.flatten([
                stylesTempBorder.Blue,
                stylesSignupInput.noInputTextBox,
              ])}
            >
              <Pressable
                onPress={() => handleUserType('YoungAdult')}
                style={stylesSignupInput.noInputTextSelections}
              >
                <View
                  style={[
                    stylesSignupInput.noInputTextSelectionButton,
                    {
                      backgroundColor:
                        userType === 'YoungAdult'
                          ? theme.mainColor.main
                          : theme.grayColor.lightGray,
                    },
                  ]}
                ></View>
                <Text style={stylesSignupInput.noInputTextSelectionText}>
                  자립준비청년
                </Text>
              </Pressable>
              <Pressable
                onPress={() => handleUserType('ETC')}
                style={stylesSignupInput.noInputTextSelections}
              >
                <View
                  style={[
                    stylesSignupInput.noInputTextSelectionButton,
                    {
                      backgroundColor:
                        userType === 'ETC'
                          ? theme.mainColor.main
                          : theme.grayColor.lightGray,
                    },
                  ]}
                ></View>
                <Text style={stylesSignupInput.noInputTextSelectionText}>
                  기타 사용자
                </Text>
              </Pressable>
            </View>
          </View>
          <View
            style={StyleSheet.flatten([
              stylesTempBorder.Yellow,
              stylesSignupInput.noInputTextContainer,
            ])}
          >
            <Text style={stylesSignupInput.noInputTextTitle}>증빙 자료</Text>
            <Pressable
              style={StyleSheet.flatten([
                stylesTempBorder.Red,
                stylesSignupInput.addProfileImageButton,
              ])}
            >
              <Text style={stylesSignupInput.addProfileImageButtonText}>+</Text>
            </Pressable>
          </View>
        </View>
        {/* inner container */}
      </View>
    </ScrollView>
  );
}
