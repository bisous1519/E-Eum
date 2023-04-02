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
    right: 20,
    borderRadius: 45,
  },
});

type SupportButtonPropsType = {
  onPressSupportBtn: () => void;
};

export default function SupportButton({
  onPressSupportBtn,
}: SupportButtonPropsType): JSX.Element {
  return (
    <Pressable
      style={StyleSheet.flatten([styles.container, shadowStyle.shadow])}
      onPress={onPressSupportBtn}
    >
      <Text style={{ color: theme.textColor.white }}>후원하기</Text>
    </Pressable>
  );
}
