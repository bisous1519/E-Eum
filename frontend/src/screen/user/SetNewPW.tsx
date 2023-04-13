import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Pressable,
  Text,
} from 'react-native';
import ButtonComp from '../../components/common/button/ButtonComp';
import InputComp from '../../components/common/input/InputComp';
import useInputText from '../../hooks/useInputText';
import useNav, { RootStackParamList } from '../../hooks/useNav';
import theme from '../../utils/theme';
import { putEditPW } from '../../modules/apis/user/userApis';
import { EditPWType } from '../../modules/apis/user/userAtomTypes';
import { RouteProp, useRoute } from '@react-navigation/native';

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
    marginTop: 20,
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
});

export default function SetNewPW(): JSX.Element {
  const navigation = useNav();

  const [pwState, setPwState] = useState<boolean>(false);

  const route = useRoute<RouteProp<RootStackParamList, 'SetNewPW'>>();
  const [userEmail, setUserEmail] = useState<string>('');
  useEffect(() => {
    if (route.params) setUserEmail(route.params.userEmail);
    console.log('이메일 : ' + userEmail);
  }, []);

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

  const [reCheck, setReCheck] = useState<boolean>(false);

  const setNewPW = async () => {
    if (pwState) {
      console.log('재설정 가능');
      console.log('email : ' + userEmail);
      console.log('PW : ' + userPW);
      await putEditPW(userEmail, userPW).then((returndata: EditPWType) =>
        console.log(returndata)
      );
      navigation.push('Signin');
    } else {
      setReCheck(true);
    }
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
              name={'비밀번호'}
              text={userPW}
              onChangeText={onChangeUserText}
              pw={true}
              check={true}
              isValid={checkRegexPW}
              errorMsg={'영문자, 특수문자, 숫자 포함 8~16자'}
            />
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
          <View style={{ marginTop: 20 }}>
            <ButtonComp
              text={reCheck ? '다시 시도' : '설정 완료'}
              onPressBtn={setNewPW}
            />
          </View>
        </View>
        {/* inner container */}
      </View>
    </ScrollView>
  );
}

