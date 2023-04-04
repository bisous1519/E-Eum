import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';
import theme from '../../utils/theme';
import { shadowStyle } from './shadowStyle';

const styles = StyleSheet.create({
  container: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.textColor.white,
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 45,
  },
  icon: {
    color: theme.mainColor.main,
  },
});

type ConfirmButtonPropsType = {
  onPressConfirmBtn: () => void;
};

export default function ConfirmButton({
  onPressConfirmBtn,
}: ConfirmButtonPropsType): JSX.Element {
  return (
    <Pressable
      style={StyleSheet.flatten([styles.container, shadowStyle.shadow])}
      onPress={onPressConfirmBtn}
    >
      <Feather name='check' size={30} style={styles.icon} />
    </Pressable>
  );
}
