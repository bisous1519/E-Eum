import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function Signin({ navigation }: any): JSX.Element {
  return (
    <View>
      <Text>Signin</Text>
      <Pressable onPress={() => navigation.navigate('Signup')}>
        <Text style={{ color: 'red' }}>회원가입</Text>
      </Pressable>
    </View>
  );
}
