import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import useDimension from '../../hooks/useDimension';
import theme from '../../utils/theme';

const { DEVICE_WIDTH, DEVICE_HEIGHT } = useDimension();

const styles = (transparent?: boolean) =>
  StyleSheet.create({
    layer: {
      backgroundColor: theme.layerColor,
      position: 'absolute',
      width: DEVICE_WIDTH,
      height: DEVICE_HEIGHT,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      width: DEVICE_WIDTH * 0.7,
      backgroundColor: transparent ? undefined : theme.background,
      borderRadius: 15,
      alignItems: 'center',
    },
  });

type ModalCompProsType = {
  children: React.ReactNode;
  onCloseModal: () => void;
  transparent?: boolean;
};

export default function ModalComp({
  children,
  onCloseModal,
  transparent = false,
}: ModalCompProsType): JSX.Element {
  console.log(transparent);
  return (
    <Pressable style={styles().layer} onPress={onCloseModal}>
      <View style={styles(transparent).modal}>{children}</View>
    </Pressable>
  );
}

