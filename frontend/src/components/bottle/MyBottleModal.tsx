import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useRecoilState } from 'recoil';
import useDimension from '../../hooks/useDimension';
import { myBottleResState } from '../../modules/apis/bottle/bottleAtoms';
import { MyBottleResStateType } from '../../modules/apis/bottle/bottleAtomTypes';
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
