import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../../utils/theme';
import { shadowStyle } from './shadowStyle';

const styles = StyleSheet.create({
  view: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: theme.textColor.error,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  text: {
    color: theme.textColor.white,
    fontSize: theme.fontSize.regular,
  },
  shadow: {
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

type NewBadgePropsType = {
  left?: number; // 이거 다 position='absolute'했을 때의 위치 지정하려면 넣어주면 됨
  right?: number;
  top?: number;
  bottom?: number;
};

export default function NewBadge({
  left,
  right,
  top,
  bottom,
}: NewBadgePropsType): JSX.Element {
  return (
    <View
      style={StyleSheet.flatten([
        styles.view,
        styles.shadow,
        { left, right, top, bottom },
      ])}
    >
      <Text style={styles.text}>N</Text>
    </View>
  );
}
