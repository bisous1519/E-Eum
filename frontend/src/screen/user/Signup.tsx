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
import { color, onChange } from 'react-native-reanimated';
import * as Font from 'expo-font';
import InputComp from '../../components/common/input/InputComp';
import useInputText from '../../hooks/useInputText';
import { postEmailVerify, postSignUp } from '../../modules/apis/user/userApis';
import { MaterialIcons } from '@expo/vector-icons';
import FileUploaderComp from '../../components/common/fileuploader/FileUploaderComp';
import ButtonComp from '../../components/common/button/ButtonComp';
import Postcode from '@actbase/react-daum-postcode';
import { Modal } from 'react-native-paper';

import { Entypo } from '@expo/vector-icons';
import { SignUpStateType } from '../../modules/apis/user/userAtomTypes';

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
  fileUploaderContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
});

const stylesSignupButton = StyleSheet.create({
  container: {
    marginTop: 30,
    width: DEVICE_WIDTH * 0.8,
  },
});

const stylesPostCodeModal = StyleSheet.create({
  addressInput: {
    marginTop: 10,
    width: '100%',
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: theme.mainColor.main,
  },
  addressInputText: {
    color: theme.textColor.main,
    // color: theme.background,
    fontSize: theme.fontSize.regular,
  },
  addressInputTextDefault: {
    color: theme.grayColor.inputText,
    // color: theme.background,
    fontSize: theme.fontSize.regular,
  },
  backButton: {
    height: 50,
    width: '100%',
    backgroundColor: theme.background,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: theme.fontSize.regular,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: theme.mainColor.light,
    // backgroundColor: theme.mainColor.light,
    color: theme.grayColor.darkGray,
    padding: 5,
    textAlign: 'center',
    marginLeft: 10,
    // fontWeight: theme.fontWeight.bold,
  },
});

export default function Signup(): JSX.Element {
  const [nameState, setNameState] = useState<boolean>(false);
  const [emailState, setEmailState] = useState<boolean>(false);
  const [pwState, setPwState] = useState<boolean>(false);
  const [nickState, setNickState] = useState<boolean>(false);
  const [genderState, setGenderState] = useState<boolean>(false);
  const [profileImageState, setProfileImageState] = useState<boolean>(false);
  const [docsImageState, setDocsImageState] = useState<boolean>(false);
  const [addressState, setAddressState] = useState<boolean>(false);

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
  const [timeLeft, setTimeLeft] = useState<number>(180);
  const [codeFromEmail, setCodeFromEmail] = useState<string>();
  const [checkCode, setCheckCode] = useState<boolean>(false);
  const [notChecked, setNotChecked] = useState<boolean>(true);
  const requestVerifCode = () => {
    console.log('인증 버튼 눌림');
    setTimerOn(true);
    setTimeLeft(180);
    postEmailVerify(userEmail).then((output: string) =>
      setCodeFromEmail(output)
    ); //인증 코드 전송
    setNotChecked(true);
  };

  const checkVerifCode = () => {
    console.log('인증 확인 버튼 눌림');
    setNotChecked(false);
    verifCode == codeFromEmail ? checkEmailStateTrue() : checkEmailStateFalse();
  };

  const checkEmailStateTrue = () => {
    setCheckCode(true);
    setTimerOn(false);
    setEmailState(true);
    console.log('이메일 인증 맞음');
  };
  const checkEmailStateFalse = () => {
    setCheckCode(false);
    setEmailState(false);
    console.log('이메일 인증 틀림');
  };

  useEffect(() => {
    let interval: any;
    // console.log('카운트다운');
    // console.log('checkCode: ' + checkCode);
    // console.log('notChecked: ' + notChecked);
    console.log(codeFromEmail);
    console.log(verifCode);
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
    if (userPW !== '' && userPW === userVerifPW) {
      setCheckSamePW(true);
      setPwState(true);
    } else checkPwStateFalse();
  }, [userVerifPW, userPW]);

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

  const [userGender, setUserGender] = useState<number>(-1);

  // 성별 관련
  const handleGenderFemale = () => {
    setUserGender(1);
    setGenderState(true);
  };
  const handleGenderMale = () => {
    setUserGender(2);
    setGenderState(true);
  };
  const handleGenderNone = () => {
    setUserGender(3);
    setGenderState(true);
  };

  //프로필 사진 관련
  const [userProfileImage, setUserProfileImage] = useState<string>('');

  const handleUserProfileImage = (input: string) => {
    setUserProfileImage(input);
  };
  useEffect(() => {
    console.log('바뀐 프사 uri : ' + userProfileImage);
    if (userProfileImage !== '') setProfileImageState(true);
  }, [userProfileImage]);

  //회원 구분 관련
  const [userType, setUserType] = useState<number>(0);

  const handleUserTypeYA = () => {
    setUserType(1);
  };
  const handleUserTypeExpert = () => {
    setUserType(2);
  };
  const handleUserTypeETC = () => {
    setUserType(3);
  };

  // 증빙 서류 관련

  const [docsImage, setDocsImage] = useState<string>('');

  const handleDocsImage = (input: string) => {
    setDocsImage(input);
  };
  useEffect(() => {
    console.log('바뀐 서류 uri : ' + docsImage);
    if (docsImage !== '') setDocsImageState(true);
  }, [docsImage]);

  const nameTest = <MaterialIcons name='check-box' size={24} color='black' />;

  //주소 입력
  const [showPostCodeModal, setShowPostCodeModal] = useState<boolean>(false);
  const [myAddress, setMyAddress] = useState<string>('');
  // const { text: myAddress, onChangeText: onChangeMyAddress } = useInputText();
  const { text: myDetailAddress, onChangeText: onChangeMyDetailAddress } =
    useInputText();

  const handlePostCodeModal = () => {
    console.log('주소 입력창 켜고 끄기 : ' + showPostCodeModal);
    setShowPostCodeModal(!showPostCodeModal);
  };

  const handleSelectedAddress = (data: any) => {
    console.log('주소 : ' + data.address);
    setShowPostCodeModal(false);
    setMyAddress(data.address);
    setAddressState(true);
  };

  //회원가입 완료
  const handleSubmitSignup = () => {
    console.log('회원가입 버튼');
    const postData: SignUpStateType = {
      name: userName,
      email: userEmail,
      password: userPW,
      nickname: userNickName,
      gender: userGender,
      // image: userProfileImage,
      type: userType,
    };
    postSignUp(postData).then((returndata) => console.log(returndata));
  };

  return (
    <>
      {showPostCodeModal && (
        <>
          <View style={stylesPostCodeModal.backButton}>
            <Pressable onPress={handlePostCodeModal}>
              <Text style={stylesPostCodeModal.backButtonText}>뒤로가기</Text>
            </Pressable>
          </View>
          <Postcode
            style={{
              width: '100%',
              height: '100%',
              borderWidth: 2,
            }}
            jsOptions={{ animation: true }}
            onSelected={handleSelectedAddress}
            onError={(data: any) => console.log(data)}
          />
        </>
      )}
      <ScrollView style={stylesGlobalContainer.scrollContainer}>
        <View style={stylesGlobalContainer.container}>
          <View testID='inner' style={stylesInnerContainer.container}>
            <View style={stylesSignupInput.box}>
              <InputComp
                name={'이름'}
                text={userName}
                onChangeText={onChangeUserName}
                check={nameState}
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
                btn={!emailState}
                check={emailState}
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
                btn={!emailState}
                check={emailState}
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
                check={nickState}
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
                          userGender === 1
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
                          userGender === 2
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
                          userGender === 3
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
              <Text style={stylesSignupInput.noInputTextTitle}>
                프로필 사진
              </Text>
              <View style={stylesSignupInput.fileUploaderContainer}>
                <FileUploaderComp
                  imageUri={userProfileImage}
                  onChangeImageUri={handleUserProfileImage}
                />
              </View>
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
                          userType === 1
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
                  onPress={handleUserTypeExpert}
                  style={stylesSignupInput.noInputTextSelections}
                >
                  <View
                    style={[
                      stylesSignupInput.noInputTextSelectionButton,
                      {
                        backgroundColor:
                          userType === 2
                            ? theme.mainColor.main
                            : theme.grayColor.lightGray,
                      },
                    ]}
                  ></View>
                  <Text style={stylesSignupInput.noInputTextSelectionText}>
                    전문 상담가
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
                          userType === 3
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
            {(userType === 1 || userType === 2) && (
              <View style={stylesSignupInput.noInputTextContainer}>
                <Text style={stylesSignupInput.noInputTextTitle}>
                  증빙 자료
                </Text>
                <View style={stylesSignupInput.fileUploaderContainer}>
                  <FileUploaderComp
                    imageUri={docsImage}
                    onChangeImageUri={handleDocsImage}
                  />
                </View>
              </View>
            )}
            <View style={stylesSignupInput.noInputTextContainer}>
              <Text style={stylesSignupInput.noInputTextTitle}>주소</Text>
              {/* <InputComp
                name='입력된 주소'
                text={myAddress}
                onChangeText={onChangeMyAddress}
                btn={true}
                btnText='주소 찾기'
                onPressBtn={handlePostCodeModal}
              /> */}
              <View style={stylesPostCodeModal.addressInput}>
                {myAddress === '' ? (
                  <Pressable
                    style={{ width: '100%' }}
                    onPress={handlePostCodeModal}
                  >
                    <Text style={stylesPostCodeModal.addressInputTextDefault}>
                      주소 찾기
                    </Text>
                  </Pressable>
                ) : (
                  <Text style={stylesPostCodeModal.addressInputText}>
                    {myAddress}
                  </Text>
                )}
              </View>

              <InputComp
                name='상세 주소 (동, 호수 등)'
                text={myDetailAddress}
                onChangeText={onChangeMyDetailAddress}
              />
            </View>
          </View>
          {nameState &&
            emailState &&
            pwState &&
            nickState &&
            genderState &&
            profileImageState &&
            addressState &&
            (userType === 3 ? true : docsImageState) && (
              <View style={stylesSignupButton.container}>
                <ButtonComp
                  text='회원가입 완료'
                  onPressBtn={handleSubmitSignup}
                />
              </View>
            )}
        </View>
      </ScrollView>
    </>
  );
}
