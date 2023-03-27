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
import useDimension from '../../hooks/useDimension';
import theme from '../../utils/theme';
import { Feather } from '@expo/vector-icons';
import { color } from 'react-native-reanimated';
import * as Font from 'expo-font';
import InputComp from '../../components/common/input/InputComp';
import useInputText from '../../hooks/useInputText';

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
    marginBottom: 300,
    marginTop: 20,
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
    // margin: 0,
    // padding: 0,
    width: DEVICE_WIDTH * 0.9,
  },
});

const stylesSignupInput = StyleSheet.create({
  box: {
    width: '100%',
    // marginBottom: 10,
    // marginTop: 20,
    // borderBottomWidth: 2,
    // borderBottomColor: theme.mainColor.main,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'flex-end',
    // paddingBottom: 10,
    // height: 60,
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
  //이름
  const { text: userName, onChangeText: onChangeUserName } = useInputText();

  //이메일 인증
  const { text: userEmail, onChangeText: onChangeUserEmail } = useInputText();
  const requestVerifCode = () => {
    console.log('인증 버튼 눌림');
  };
  const { text: verifCode, onChangeText: onChangeVerifCode } = useInputText();
  const [timerOn, setTimerOn] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(5);
  const checkVerifCode = () => {
    console.log('인증 확인 버튼 눌림');
    setTimerOn(true);
  };
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

  //비밀번호
  const { text: userPW, onChangeText: onChangeUserText } = useInputText();
  const PWRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/;
  const [checkRegexPW, setCheckRegexPW] = useState<boolean>(false);
  useEffect(() => {
    if (userPW !== '') {
      if (!PWRegex.test(userPW)) setCheckRegexPW(false);
      else setCheckRegexPW(true);
      setCheckSamePW(false);
    }
  }, [userPW]);
  const { text: userVerifPW, onChangeText: onChangeUserVerifPW } =
    useInputText();
  const [checkSamePW, setCheckSamePW] = useState<boolean>(false);
  useEffect(() => {
    if (userPW === userVerifPW) setCheckSamePW(true);
    else setCheckSamePW(false);
  }, [userVerifPW]);

  //닉네임
  const { text: userNickName, onChangeText: onChangeUserNickName } =
    useInputText();
  const [checkNickNameLength, setCheckNickNameLength] =
    useState<boolean>(false);
  useEffect(() => {
    if (userNickName.length >= 3 && userNickName.length <= 10)
      setCheckNickNameLength(true);
    else setCheckNickNameLength(false);
  }, [userNickName]);

  const [userGender, setUserGender] = useState<string>('');
  const [userProfileImage, setUserProfileImage] = useState<string>('');
  const [userType, setUserType] = useState<string>('');

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
            <InputComp
              name={'이름'}
              text={userName}
              onChangeText={onChangeUserName}
            ></InputComp>
          </View>
          <View
            style={StyleSheet.flatten([
              stylesTempBorder.Yellow,
              stylesSignupInput.box,
            ])}
          >
            <InputComp
              name={'이메일'}
              text={userEmail}
              onChangeText={onChangeUserEmail}
              btn={true}
              btnText={'인증'}
              onPressBtn={requestVerifCode}
            ></InputComp>
          </View>
          <View
            style={StyleSheet.flatten([
              stylesTempBorder.Yellow,
              stylesSignupInput.box,
            ])}
          >
            <InputComp
              name={'인증 코드'}
              text={verifCode}
              onChangeText={onChangeVerifCode}
              btn={true}
              btnText={
                timerOn
                  ? `${Math.floor(timeLeft / 60)
                      .toString()
                      .padStart(2, '0')}:${(timeLeft % 60)
                      .toString()
                      .padStart(2, '0')}`
                  : '확인'
              }
              onPressBtn={checkVerifCode}
            ></InputComp>
          </View>
          <View
            style={StyleSheet.flatten([
              stylesTempBorder.Yellow,
              stylesSignupInput.box,
            ])}
          >
            <InputComp
              name={'비밀번호'}
              text={userPW}
              onChangeText={onChangeUserText}
              pw={true}
              check={true}
              isValid={checkRegexPW}
              errorMsg={'영문자, 특수문자, 숫자 포함 8~16자'}
            ></InputComp>
          </View>
          <View
            style={StyleSheet.flatten([
              stylesTempBorder.Yellow,
              stylesSignupInput.box,
            ])}
          >
            <InputComp
              name={'비밀번호 확인'}
              text={userVerifPW}
              onChangeText={onChangeUserVerifPW}
              pw={true}
              check={true}
              isValid={checkSamePW}
              errorMsg={'비밀번호가 다릅니다'}
            />
          </View>
          <View
            style={StyleSheet.flatten([
              stylesTempBorder.Yellow,
              stylesSignupInput.box,
            ])}
          >
            <InputComp
              name={'닉네임 (3~10자)'}
              text={userNickName}
              onChangeText={onChangeUserNickName}
              check={true}
              isValid={checkNickNameLength}
              errorMsg={'3~10자'}
            ></InputComp>
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
