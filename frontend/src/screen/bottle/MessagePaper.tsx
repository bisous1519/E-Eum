import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import useDimension from '../../hooks/useDimension';
import theme from '../../utils/theme';
import useNav from '../../hooks/useNav';

const { DEVICE_WIDTH, DEVICE_HEIGHT } = useDimension();

const styles = StyleSheet.create({});

export default function MessagePaper(): JSX.Element {
  const navigation = useNav();

  const backToList = () => {
    navigation.push('BottleBlue');
  };
  return (
    <View>
      <Pressable onPress={backToList}>
        <Text>Back</Text>
      </Pressable>
    </View>
  );
}
