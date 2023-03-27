import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import useNav from '../../hooks/useNav';

export default function PointCharge() {
  const navigation = useNav();

  // 충전하려는 포인트 변수
  const [point, setPoint] = useState<number>(0);

  return (
    <View>
      <TextInput>포인트 충전</TextInput>
    </View>
  );
}
