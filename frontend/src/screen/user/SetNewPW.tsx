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
  checkIcon: {
    marginRight: 10,
    marginLeft: 10,
  },
});

export default function SetNewPW(): JSX.Element {
  const navigation = useNav();

  const [userPW, setUserPW] = useState<string>('');
  const [userVerifPW, setUserVerifPW] = useState<string>('');

  const [checkRegexPW, setCheckRegexPW] = useState<boolean>(false);
  const [checkSamePW, setCheckSamePW] = useState<boolean>(false);

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
          <View>
            <Pressable
              onPress={() => {
                navigation.push('Signin');
              }}
            >
              <Text>로그인 화면으로 돌아가기</Text>
            </Pressable>
          </View>
        </View>
        {/* inner container */}
      </View>
    </ScrollView>
  );
}
