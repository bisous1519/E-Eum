import React from 'react';
import { StyleSheet, Text } from 'react-native';
import styled from 'styled-components/native';
import theme from '../../utils/theme';

const TextCompStyle = styled.Text<{ title: boolean }>`
  fontfamily: ${({ theme }) => theme.fontFamily.title};
`;

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.fontFamily.title,
  },
});

type TextCompProps = {
  title?: boolean;
  text: string;
};

export default function TextComp({
  text,
  title = false,
}: TextCompProps): JSX.Element {
  return (
    <TextCompStyle title style={styles.text}>
      {text}
    </TextCompStyle>
  );
}
