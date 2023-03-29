import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import useDimension from '../../hooks/useDimension';
import theme from '../../utils/theme';

const { DEVICE_WIDTH, DEVICE_HEIGHT } = useDimension();

const styles = StyleSheet.create({
  layer: {
    backgroundColor: theme.layerColor,
    // opacity: theme.layerColor.opacity,
    position: 'absolute',
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: DEVICE_WIDTH * 0.7,
    // height: DEVICE_HEIGHT * 0.4,
    backgroundColor: theme.background,
    borderRadius: 15,
    alignItems: 'center',
  },
});

type ModalCompProsType = {
  children: React.ReactNode;
  onCloseModal: () => void;
};

export default function ModalComp({
  children,
  onCloseModal,
}: ModalCompProsType): JSX.Element {
  return (
    <Pressable style={styles.layer} onPress={onCloseModal}>
      <View style={styles.modal}>{children}</View>
    </Pressable>
  );
}
