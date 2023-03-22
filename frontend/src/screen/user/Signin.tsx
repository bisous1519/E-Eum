import React from 'react';
import { Pressable, Text, View } from 'react-native';
import useNav from '../../hooks/useNav';

export default function Signin(): JSX.Element {
  const navigation = useNav();

  const onPressSignup = () => {
    navigation.push('Signup');
  };

  return (
    <View>
      <Text>Signin</Text>
      <Pressable onPress={onPressSignup}>
        <Text style={{ color: 'red' }}>회원가입</Text>
      </Pressable>
    </View>
  );
}
