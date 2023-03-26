import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import useDimension from '../../hooks/useDimension';
import theme from '../../utils/theme';
import { shadowStyle } from '../common/shadowStyle';

const { DEVICE_WIDTH, DEVICE_HEIGHT } = useDimension();

const styles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH * 0.4,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.mainColor.main,
    position: 'absolute',
    bottom: 20,
    right: DEVICE_WIDTH * 0.3,
    borderRadius: 45,
  },
});

type SubmitButtonPropsType = {
  onPressSubmitBtn: () => void;
};

export default function SubmitButton({
  onPressSubmitBtn,
}: SubmitButtonPropsType): JSX.Element {
  return (
    <Pressable
      style={StyleSheet.flatten([styles.container, shadowStyle.shadow])}
      onPress={onPressSubmitBtn}
    >
      <Text style={{ color: theme.textColor.white }}>등록하기</Text>
    </Pressable>
  );
}
