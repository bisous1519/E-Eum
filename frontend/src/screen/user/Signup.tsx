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
import { postEmailVerify } from '../../modules/apis/user/userApis';

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
    // borderColor: 'red',
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
    width: DEVICE_WIDTH * 0.8,
  },
});

const stylesSignupInput = StyleSheet.create({
  box: {
    width: '100%',
    marginTop: +15,
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
  const [nameState, setNameState] = useState<boolean>(false);
  const [emailState, setEmailState] = useState<boolean>(false);
  const [pwState, setPwState] = useState<boolean>(false);
  const [nickState, setNickState] = useState<boolean>(false);
  const [genderState, setGenderState] = useState<boolean>(false);

  console.log(nameState);
  console.log(emailState);
  console.log(pwState);
  console.log(nickState);
  console.log(genderState);
  console.log('----');

  //이름
  const { text: userName, onChangeText: onChangeUserName } = useInputText();
  useEffect(() => {
    userName.length <= 5 && userName.length >= 2
      ? setNameState(true)
      : setNameState(false);
  });

  //이메일 인증
  const { text: userEmail, onChangeText: onChangeUserEmail } = useInputText();
  const { text: verifCode, onChangeText: onChangeVerifCode } = useInputText();
  const [timerOn, setTimerOn] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [codeFromEmail, setCodeFromEmail] = useState<string>();
  const [checkCode, setCheckCode] = useState<boolean>(false);
  const [notChecked, setNotChecked] = useState<boolean>(true);
  const requestVerifCode = () => {
    console.log('인증 버튼 눌림');
    setTimerOn(true);
    postEmailVerify(userEmail).then((output) => setCodeFromEmail(output)); //인증 코드 전송
    setNotChecked(true);
  };

  const checkVerifCode = () => {
    console.log('인증 확인 버튼 눌림');
    setNotChecked(false);
    verifCode === codeFromEmail
      ? checkEmailStateTrue()
      : checkEmailStateFalse();
  };

  const checkEmailStateTrue = () => {
    setCheckCode(true);
    setTimerOn(false);
    setEmailState(true);
  };
  const checkEmailStateFalse = () => {
    setCheckCode(false);
    setEmailState(false);
  };

  useEffect(() => {
    let interval: any;
    // console.log('카운트다운');
    // console.log('checkCode: ' + checkCode);
    // console.log('notChecked: ' + notChecked);
    // console.log(codeFromEmail);
    // console.log(verifCode);
    if (timerOn && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } else {
      setTimerOn(false);
      setTimeLeft(300);
    }
    return () => clearInterval(interval);
  }, [timerOn, timeLeft]);

  //비밀번호
  const { text: userPW, onChangeText: onChangeUserText } = useInputText();
  const PWRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/;
  const [checkRegexPW, setCheckRegexPW] = useState<boolean>(false);
  const [checkSamePW, setCheckSamePW] = useState<boolean>(false);

  useEffect(() => {
    if (userPW !== '') {
      if (!PWRegex.test(userPW)) setCheckRegexPW(false);
      else {
        setCheckRegexPW(true);
      }
      setPwState(false);
      setCheckSamePW(false);
    }
  }, [userPW]);

  const { text: userVerifPW, onChangeText: onChangeUserVerifPW } =
    useInputText();

  useEffect(() => {
    if (userPW !== '' && userPW === userVerifPW) checkPwStateTrue();
    else checkPwStateFalse();
  }, [userVerifPW, userPW]);

  const checkPwStateTrue = () => {
    setCheckSamePW(true);
    setPwState(true);
  };
  const checkPwStateFalse = () => {
    setCheckSamePW(false);
    setPwState(false);
  };

  //닉네임
  const { text: userNickName, onChangeText: onChangeUserNickName } =
    useInputText();
  const [checkNickNameLength, setCheckNickNameLength] =
    useState<boolean>(false);
  useEffect(() => {
    if (userNickName.length >= 3 && userNickName.length <= 10) {
      setCheckNickNameLength(true);
      setNickState(true);
    } else {
      setCheckNickNameLength(false);
      setNickState(false);
    }
  }, [userNickName]);

  const [userGender, setUserGender] = useState<string>('');
  const [userProfileImage, setUserProfileImage] = useState<string>('');
  const [userType, setUserType] = useState<string>('');

  // 성별 관련
  const handleGenderFemale = () => {
    setUserGender('Female');
    setGenderState(true);
  };
  const handleGenderMale = () => {
    setUserGender('Male');
    setGenderState(true);
  };
  const handleGenderNone = () => {
    setUserGender('None');
    setGenderState(true);
  };

  //프로필 사진 관련

  //회원 구분 관련
  const handleUserTypeYA = () => {
    setUserType('YoungAdult');
  };
  const handleUserTypeETC = () => {
    setUserType('ETC');
  };

  return (
    <ScrollView style={stylesGlobalContainer.scrollContainer}>
      <View style={stylesGlobalContainer.container}>
        <View testID='inner' style={stylesInnerContainer.container}>
          <View style={stylesSignupInput.box}>
            <InputComp
              name={'이름'}
              text={userName}
              onChangeText={onChangeUserName}
            />
          </View>
          <View
            style={StyleSheet.flatten([
              stylesSignupInput.box,
              { marginTop: 20 },
            ])}
          >
            <InputComp
              name={'이메일'}
              text={userEmail}
              onChangeText={onChangeUserEmail}
              btn={true}
              btnText={
                timerOn
                  ? `${Math.floor(timeLeft / 60)
                      .toString()
                      .padStart(2, '0')}:${(timeLeft % 60)
                      .toString()
                      .padStart(2, '0')}`
                  : '인증'
              }
              onPressBtn={requestVerifCode}
            />
          </View>
          <View style={stylesSignupInput.box}>
            <InputComp
              name={'인증 코드'}
              text={verifCode}
              onChangeText={onChangeVerifCode}
              btn={true}
              btnText={'확인'}
              onPressBtn={checkVerifCode}
              isValid={checkCode || notChecked}
              errorMsg={'인증되지 않은 코드입니다'}
            />
          </View>
          <View
            style={StyleSheet.flatten([
              stylesSignupInput.box,
              { marginTop: 20 },
            ])}
          >
            <InputComp
              name={'비밀번호'}
              text={userPW}
              onChangeText={onChangeUserText}
              pw={true}
              // check={true}
              isValid={checkRegexPW}
              errorMsg={'영문자, 특수문자, 숫자 포함 8~16자'}
            />
          </View>
          <View style={stylesSignupInput.box}>
            <InputComp
              name={'비밀번호 확인'}
              text={userVerifPW}
              onChangeText={onChangeUserVerifPW}
              pw={true}
              // check={true}
              isValid={checkSamePW}
              errorMsg={'비밀번호가 다릅니다'}
            />
          </View>
          <View
            style={StyleSheet.flatten([
              stylesSignupInput.box,
              { marginTop: 20 },
            ])}
          >
            <InputComp
              name={'닉네임 (3~10자)'}
              text={userNickName}
              onChangeText={onChangeUserNickName}
              check={true}
              isValid={checkNickNameLength}
              errorMsg={'3~10자'}
            />
          </View>
          <View style={stylesSignupInput.noInputTextContainer}>
            <Text style={stylesSignupInput.noInputTextTitle}>성별</Text>
            <View style={stylesSignupInput.noInputTextBox}>
              <Pressable
                onPress={handleGenderFemale}
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
                onPress={handleGenderMale}
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
                onPress={handleGenderNone}
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
          <View style={stylesSignupInput.noInputTextContainer}>
            <Text style={stylesSignupInput.noInputTextTitle}>프로필 사진</Text>
            <Pressable style={stylesSignupInput.addProfileImageButton}>
              <Text style={stylesSignupInput.addProfileImageButtonText}>+</Text>
            </Pressable>
          </View>
          <View style={stylesSignupInput.noInputTextContainer}>
            <Text style={stylesSignupInput.noInputTextTitle}>회원구분</Text>
            <View style={stylesSignupInput.noInputTextBox}>
              <Pressable
                onPress={handleUserTypeYA}
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
                onPress={handleUserTypeETC}
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
          <View style={stylesSignupInput.noInputTextContainer}>
            <Text style={stylesSignupInput.noInputTextTitle}>증빙 자료</Text>
            <Pressable style={stylesSignupInput.addProfileImageButton}>
              <Text style={stylesSignupInput.addProfileImageButtonText}>+</Text>
            </Pressable>
          </View>
        </View>
        {/* inner container */}
      </View>
    </ScrollView>
  );
}
