import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../utils/theme';
import { Feather } from '@expo/vector-icons';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

const stylesTempBorder = StyleSheet.create({
  //일반 보더 확인용
  Red: {
    borderWidth: 1,
    borderColor: 'red',
  },
  Blue: {
    borderWidth: 1,
    borderColor: 'blue',
  },
  Yellow: {
    borderWidth: 1,
    borderColor: 'yellow',
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

const stylesSignupInput = StyleSheet.create({
  box: {
    width: '100%',
    marginBottom: 10,
    marginTop: 20,
    borderBottomWidth: 2,
    borderBottomColor: theme.mainColor.main,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputStyle: {
    fontSize: 15,
    paddingBottom: 8,
    borderWidth: 1,
    borderColor: 'red',
    height: '100%',
    flex: 1,
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
    color: '#474747',
    fontSize: 12,
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
});

export default function Signup(): JSX.Element {
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [verifCode, setVerifCode] = useState<string>('');
  const [userPW, setUserPW] = useState<string>('');
  const [userVerifPW, setUserVerifPW] = useState<string>('');
  const [userNickName, setUserNickName] = useState<string>('');

  const [checkPW, setCheckPW] = useState<boolean>(false);

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

  useEffect(() => {
    let interval: any;
    console.log('잉');
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

  const handleUserPW = (input: string) => {
    setUserPW(input);
    setUserVerifPW('');
    setCheckPW(false);
  };
  const handleUserVerifPW = (input: string) => {
    handleUserVerifPW(input);
  };

  useEffect(() => {
    setCheckPW(userPW !== '' && userPW === userVerifPW);
  }, [userVerifPW]);

  const handleUserNickName = (input: string) => {
    setUserNickName(input);
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
          style={StyleSheet.flatten([
            stylesTempBorder.Yellow,
            stylesSignupInput.box,
          ])}
        >
          <TextInput
            testID='inputName'
            onChangeText={handleUserName}
            value={userName}
            placeholder='이름'
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
          <Pressable onPress={handleTimeLeft} style={stylesSignupInput.button}>
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
            placeholder='코드 입력'
            style={stylesSignupInput.inputStyle}
          ></TextInput>
          <Text style={stylesSignupInput.timeLeft}>{`${Math.floor(timeLeft / 60)
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
            placeholder='비밀번호'
            style={stylesSignupInput.inputStyle}
          ></TextInput>
          <View style={stylesSignupInput.checkIcon}>
            <Feather name='check-circle' size={24} color='black' />
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
            placeholder='비밀번호 확인'
            style={stylesSignupInput.inputStyle}
          ></TextInput>
          <View style={stylesSignupInput.checkIcon}>
            <Feather name='check-circle' size={24} color='black' />
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
            placeholder='닉네임'
            style={stylesSignupInput.inputStyle}
          ></TextInput>
        </View>
      </View>
    </View>
  );
}
