import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputComp from '../../components/common/input/InputComp';

export default function Record(): JSX.Element {
  return (
    <SafeAreaView>
      <Text>Record</Text>
      <InputComp />
    </SafeAreaView>
  );
}
