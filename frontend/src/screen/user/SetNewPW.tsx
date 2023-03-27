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
import useNav from '../../hooks/useNav';
import theme from '../../utils/theme';

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

  const NavToSignIn = () => {
    navigation.push('Signin');
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
            <ButtonComp text={'로그인 화면으로'} onPressBtn={NavToSignIn} />
          </View>
        </View>
        {/* inner container */}
      </View>
    </ScrollView>
  );
}
