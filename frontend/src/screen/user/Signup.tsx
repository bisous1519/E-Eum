import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import useDimension from '../../hooks/useDimension';
import theme from '../../utils/theme';

const { DEVICE_WIDTH, DEVICE_HEIGHT } = useDimension();

export default function Signup(): JSX.Element {
  return (
    <View>
      <Text>회원가입</Text>
    </View>
  );
}
