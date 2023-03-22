import React from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import theme from '../../../utils/theme';
import { ButtonCompBox, ButtonCompText, buttonStyles } from './styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.mainColor.main,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 30,
    width: '90%',
  },
  text: {
    color: theme.textColor.white,
    fontSize: theme.fontSize.regular,
  },
  pressedText: {
    color: theme.grayColor.lightGray,
  },
});

type ButtonCompPropsType = {
  text: string;
  onPressBtn: () => void;
};

export default function ButtonComp({ text, onPressBtn }: ButtonCompPropsType) {
  return (
    <Pressable style={styles.container} onPress={onPressBtn}>
      {({ pressed }) => (
        <Text
          style={!pressed ? styles.text : [styles.text, styles.pressedText]}
        >
          {text}
        </Text>
      )}
    </Pressable>
  );
}
