import React from 'react';
import { Dimensions } from 'react-native';

export default function useDimension() {
  const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } =
    Dimensions.get('window');
  return { DEVICE_WIDTH, DEVICE_HEIGHT };
}
