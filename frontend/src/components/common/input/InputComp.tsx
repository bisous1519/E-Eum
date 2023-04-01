import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';
import theme from '../../../utils/theme';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import ButtonComp from '../button/ButtonComp';
import InputBtn from './InputBtn';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  title: {
    position: 'absolute',
    color: theme.grayColor.inputText,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: theme.mainColor.main,
    fontSize: theme.fontSize.regular,
    marginTop: 20,
    color: theme.textColor.main,
    height: 30,
  },
  inputError: {
    borderColor: theme.textColor.error,
  },
  errorMsgWrapper: {
    height: 20,
  },
  errorMsg: {
    fontSize: theme.fontSize.small,
    color: theme.textColor.error,
  },
  icon: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    bottom: 3,
  },
});

const stylesSignin = StyleSheet.create({
  showPWIcon: {
    color: theme.grayColor.inputIcon,
    marginRight: 10,
    marginLeft: 10,
  },
});

type InputCompPropsType = {
  name: string;
  text: string;
  onChangeText: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  check?: boolean;
  isValid?: boolean;
  errorMsg?: string;
  pw?: boolean;
  btn?: boolean;
  btnText?: string;
  onPressBtn?: () => void;
  timer?: boolean;
};

export default function InputComp({
  // TextInput이 쓰일 용도에 따라 아래 주석 확인하고 프롭스로 추가하면됩니다람쥐
  // ex) <InputComp name='EMAIL' check={true} isValid={isValid} errorMsg='어쩌고 형식 맞지않습 어쩌고' />
  name, // **필수** input 타이틀!
  text, // **필수** input의 value
  onChangeText, // **필수** input value를 바꾸는 onChange함수
  check, // 오른쪽에 체크모양 있는 input (isValid도 같이 넘겨줘야함)
  isValid, // check 색깔 결정하는애. input에 작성한 내용이 유효한지 검사한 값 (useState로 isValid, setIsValid 만들고 isValid만 여기로 넘겨주세여)
  errorMsg, // error 상황일 때 input 하단에 뜰 메세지
  pw, // 비밀번호 입력하는 input
  btn, // 오른쪽에 인증버튼 있는 input
  btnText, // 버튼의 text
  onPressBtn, // 버튼 클릭했을 때 호출할 콜백함수
  timer, // 오른쪽에 타이머 있는 input
}: InputCompPropsType): JSX.Element {
  const [isVisiblePW, setIsVisiblePW] = useState<boolean>(false);
  const [inputEventState, setInputEventState] = useState<
    'onFocus' | 'onBlur' | ''
  >('');
  const moveAnim = useRef(new Animated.Value(4)).current;
  const sizeAnim = useRef(new Animated.Value(theme.fontSize.regular)).current;
  const animProps = {
    duration: 200,
    useNativeDriver: false,
  };

  const onPressPwVisible = () => {
    setIsVisiblePW((prev) => !prev);
    console.log('IsVisiblePW', isVisiblePW);
  };

  const moveTitleTop = (): void => {
    // 위로 이동
    Animated.timing(moveAnim, {
      toValue: 30,
      ...animProps,
    }).start();
    // 사이즈 작아짐
    Animated.timing(sizeAnim, {
      toValue: theme.fontSize.small,
      ...animProps,
    }).start();
  };
  const moveTitleBottom = (): void => {
    // 아래로 이동
    Animated.timing(moveAnim, {
      toValue: 4,
      ...animProps,
    }).start();
    // 사이즈 커짐
    Animated.timing(sizeAnim, {
      toValue: theme.fontSize.regular,
      ...animProps,
    }).start();
  };
  const onFocusInput = (): void => {
    setInputEventState('onFocus');
  };
  const onBlurInput = (): void => {
    if (text === '') {
      setInputEventState('onBlur');
    }
  };

  useEffect(() => {
    inputEventState === 'onFocus' ? moveTitleTop() : moveTitleBottom();
  }, [inputEventState]);

  useEffect(() => {
    if (text !== '') {
      setInputEventState('onFocus');
    }
  }, [text]);

  return (
    <View style={{ width: '100%' }}>
      <View style={styles.container}>
        <Animated.Text
          style={StyleSheet.flatten([
            styles.title,
            { bottom: moveAnim, fontSize: sizeAnim },
          ])}
        >
          {name}
        </Animated.Text>
        <TextInput
          style={StyleSheet.flatten([
            styles.input,
            text !== '' && errorMsg && !isValid ? styles.inputError : {},
          ])}
          value={text}
          onChange={onChangeText}
          onFocus={onFocusInput}
          onBlur={onBlurInput}
          textContentType={pw ? 'password' : 'none'}
          secureTextEntry={pw && !isVisiblePW ? true : false}
        />
        <View style={styles.icon}>
          {/* {pw ? (
            <MaterialIcons
              name={isVisiblePW ? 'visibility' : 'visibility-off'}
              size={24}
              style={stylesSignin.showPWIcon}
              onPress={onPressPwVisible}
            />
          ) : (
            <></>
          )}
          {check ? (
            <Feather
              name='check'
              size={20}
              color={isValid ? theme.mainColor.main : theme.grayColor.inputIcon}
            />
          ) : (
            <></>
          )}
          {btn && btnText && onPressBtn ? (
            <InputBtn text={btnText} onPressBtn={onPressBtn} />
          ) : (
            <></>
          )} */}
          {pw && !check ? (
            <MaterialIcons
              name={isVisiblePW ? 'visibility' : 'visibility-off'}
              size={24}
              style={stylesSignin.showPWIcon}
              onPress={onPressPwVisible}
            />
          ) : check ? (
            <Feather
              name='check'
              size={20}
              color={isValid ? theme.mainColor.main : theme.grayColor.inputIcon}
            />
          ) : btn && btnText && onPressBtn ? (
            <InputBtn text={btnText} onPressBtn={onPressBtn} />
          ) : (
            <></>
          )}
        </View>
      </View>
      <View style={styles.errorMsgWrapper}>
        {text !== '' && errorMsg && !isValid ? (
          <Text style={styles.errorMsg}>{errorMsg}</Text>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}

