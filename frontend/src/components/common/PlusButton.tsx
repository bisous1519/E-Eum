import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
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

type PlusButtonPropsType = {
  onPressPlusBtn: () => void;
};

export default function PlusButton({
  onPressPlusBtn,
}: PlusButtonPropsType): JSX.Element {
  return (
    <Pressable
      style={[styles.container, shadowStyle.shadow]}
      onPress={onPressPlusBtn}
    >
      <AntDesign name='plus' size={24} style={styles.icon} />
    </Pressable>
  );
}
