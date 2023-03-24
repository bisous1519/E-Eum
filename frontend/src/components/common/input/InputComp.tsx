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

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  title: {
    position: 'absolute',
    color: theme.textColor.light,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: theme.mainColor.main,
    fontSize: theme.fontSize.regular,
    marginTop: 20,
    color: theme.textColor.main,
  },
  icon: {
    position: 'absolute',
    right: 0,
    bottom: 3,
  },
});

const stylesSignin = StyleSheet.create({
  showPWIcon: {
    color: 'gray',
    marginRight: 10,
    marginLeft: 10,
  },
});

type InputCompPropsType = {
  check?: boolean;
  isValid?: boolean;
  pw?: boolean;
  showPW?: boolean;
  button?: boolean;
  timer?: boolean;
  name: string;
};

export default function InputComp({
  check,
  isValid,
  pw,
  showPW,
  button,
  timer,
  name,
}: InputCompPropsType): JSX.Element {
  const [text, setText] = useState<string>('');
  const moveAnim = useRef(new Animated.Value(3)).current;
  const sizeAnim = useRef(new Animated.Value(theme.fontSize.regular)).current;
  const animProps = {
    duration: 150,
    useNativeDriver: false,
  };

  const onChangeText = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setText(e.nativeEvent.text);
  };

  const moveTitleTop = (): void => {
    Animated.timing(moveAnim, {
      toValue: 30,
      ...animProps,
    }).start();
  };
  const moveTitleBottom = (): void => {
    Animated.timing(moveAnim, {
      toValue: 3,
      ...animProps,
    }).start();
  };
  const sizeTitleTop = (): void => {
    Animated.timing(sizeAnim, {
      toValue: theme.fontSize.small,
      ...animProps,
    }).start();
  };
  const sizeTitleBottom = (): void => {
    Animated.timing(sizeAnim, {
      toValue: theme.fontSize.regular,
      ...animProps,
    }).start();
  };
  const onFocusInput = (): void => {
    moveTitleTop();
    sizeTitleTop();
  };
  const onBlurInput = (): void => {
    if (text === '') {
      moveTitleBottom();
      sizeTitleBottom();
    }
  };

  return (
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
        style={styles.input}
        value={text}
        onChange={onChangeText}
        onFocus={onFocusInput}
        onBlur={onBlurInput}
        textContentType={pw ? 'password' : 'none'}
      />
      <View style={styles.icon}>
        {check ? (
          <Feather
            name='check'
            size={20}
            color={isValid ? theme.mainColor.main : theme.textColor.light}
          />
        ) : pw ? (
          <MaterialIcons
            name={showPW ? 'visibility' : 'visibility-off'}
            size={24}
            style={stylesSignin.showPWIcon}
          />
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}
