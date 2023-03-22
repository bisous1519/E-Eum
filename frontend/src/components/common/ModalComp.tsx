import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useDimension from '../../hooks/useDimension';
import theme from '../../utils/theme';

const { DEVICE_WIDTH, DEVICE_HEIGHT } = useDimension();

const styles = StyleSheet.create({
  layer: {
    backgroundColor: theme.layerColor.color,
    // opacity: theme.layerColor.opacity,
    position: 'absolute',
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    Width: DEVICE_WIDTH * 0.7,
    height: DEVICE_HEIGHT * 0.4,
    backgroundColor: theme.background,
  },
});

export default function ModalComp(): JSX.Element {
  return (
    <View style={styles.layer}>
      <View style={styles.modal}>
        <Text>모달</Text>
      </View>
    </View>
  );
}
