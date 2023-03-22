import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import ButtonComp from '../../components/common/button/ButtonComp';

export default function NewRecord(): JSX.Element {
  const onPressSubmit = () => {};
  return (
    <SafeAreaView>
      <View>
        <Feather name='x' size={24} color='black' />
        <ButtonComp text='등록' onPressBtn={onPressSubmit} />
      </View>
    </SafeAreaView>
  );
}
