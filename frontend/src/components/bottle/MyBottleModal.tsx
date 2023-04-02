import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import useDimension from '../../hooks/useDimension';
import theme from '../../utils/theme';
import ModalComp from '../common/ModalComp';
import CarouselComp from './CarouselComp';

const { DEVICE_WIDTH, DEVICE_HEIGHT } = useDimension();

const styles = StyleSheet.create({
  layer: {
    backgroundColor: theme.layerColor,
    position: 'absolute',
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type MyBottleModalPropsType = {
  onToggleDetailModal: () => void;
};

export default function MyBottleModal({
  onToggleDetailModal,
}: MyBottleModalPropsType): JSX.Element {
  return (
    <Pressable style={styles.layer} onPress={onToggleDetailModal}>
      <CarouselComp />
    </Pressable>
  );
}

