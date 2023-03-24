import React from 'react';
import { StyleSheet } from 'react-native';
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
  font-size: ${({ theme }) => theme.fontSize.regular};
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
};

// NOTE: props로 small={true} 주면 작은버튼, 안주면 큰버튼
export default function ButtonComp({
  text,
  onPressBtn,
  small = false,
}: ButtonCompPropsType) {
  return (
    <PressableBox small={small} onPress={onPressBtn}>
      {({ pressed }) => (
        <TextBox style={pressed && styles.pressedText}>{text}</TextBox>
      )}
    </PressableBox>
  );
}
