import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ButtonComp from '../../components/common/button/ButtonComp';
import Test from '../../components/Test';
import theme from '../../utils/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    opacity: 0.65,
    alignItems: 'center',
    justifyContent: 'center',
  },
  m: {
    fontSize: 16,
    fontFamily: 'Yeongdo',
  },
  s: {
    fontSize: 14,
  },
});

export default function Home() {
  return (
    // <Layer>
    <View style={styles.container}>
      <Text style={styles.m}>
        구글 개발자 인터뷰를 멋있다. 웅장하다!!!!! 안웅장하다 웅장하다!!!
      </Text>
      <Text style={styles.s}>자동 로그인</Text>
      <Test />
      <ButtonComp />
    </View>
    // </Layer>
  );
}
