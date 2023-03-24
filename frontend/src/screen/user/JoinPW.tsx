import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
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
});

export default function JoinPW(): JSX.Element {
  const navigation = useNav();

  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [verifCode, setVerifCode] = useState<string>('');

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
          <View>
            <Pressable
              onPress={() => {
                navigation.push('SetNewPW');
              }}
            >
              <Text>비밀번호 설정</Text>
            </Pressable>
          </View>
        </View>
        {/* inner container */}
      </View>
    </ScrollView>
  );
}
