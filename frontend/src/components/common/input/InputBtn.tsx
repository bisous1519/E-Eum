import React from 'react';
import { StyleSheet } from 'react-native';
import styled, { css } from 'styled-components/native';
import theme from '../../../utils/theme';

const PressableBox = styled.Pressable`
  background: ${({ theme }) => theme.mainColor.main};
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  width: 70px;
  padding: 4px;
  margin-bottom: 3px;
`;

const TextBox = styled.Text`
  color: ${({ theme }) => theme.textColor.white};
  font-size: ${({ theme }) => theme.fontSize.small}px;
`;

const styles = StyleSheet.create({
  pressedText: {
    color: theme.grayColor.lightGray,
  },
});

type ButtonCompPropsType = {
  text: string;
  onPressBtn: () => void;
};

// NOTE: props로 small={true} 주면 작은버튼, 안주면 큰버튼
export default function InputBtn({ text, onPressBtn }: ButtonCompPropsType) {
  return (
    <PressableBox onPress={onPressBtn}>
      {({ pressed }) => (
        <TextBox style={pressed && styles.pressedText}>{text}</TextBox>
      )}
    </PressableBox>
  );
}
