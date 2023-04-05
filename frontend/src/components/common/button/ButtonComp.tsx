import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import styled, { css } from 'styled-components/native';
import theme from '../../../utils/theme';

const PressableBox = styled.Pressable<{ small: boolean }>`
  background: ${({ theme }) => theme.mainColor.main};
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  ${({ small }) =>
    small
      ? css`
          width: 100px;
          padding: 12px;
        `
      : css`
          width: 100%;
          padding: 18px;
        `}
`;

const TextBox = styled.Text`
  color: ${({ theme }) => theme.textColor.white};
  font-size: ${({ theme }) => theme.fontSize.regular}px;
`;

const styles = StyleSheet.create({
  pressedText: {
    color: theme.grayColor.lightGray,
  },
});

type ButtonCompPropsType = {
  text: string;
  onPressBtn: () => void;
  small?: boolean;
  style?: StyleProp<ViewStyle>;
};

// NOTE: props로 small={true} 주면 작은버튼, 안주면 큰버튼, 따로 작성하고싶은 style은 style 프롭스로
export default function ButtonComp({
  text,
  onPressBtn,
  small = false,
  style,
}: ButtonCompPropsType) {
  return (
    <PressableBox small={small} onPress={onPressBtn} style={style && style}>
      {({ pressed }) => (
        <TextBox style={pressed && styles.pressedText}>{text}</TextBox>
      )}
    </PressableBox>
  );
}

