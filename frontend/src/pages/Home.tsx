import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Test from '../components/Test';
import theme from '../utils/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.mainColor.main,
    // opacity: 0.65,
    alignItems: 'center',
    justifyContent: 'center',
  },
  m: {
    fontSize: 16,
  },
  s: {
    fontSize: 14,
  },
});

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.m}>실시간 반영 확인</Text>
      <Text style={styles.s}>자동 로그인</Text>
      <Test />
    </View>
  );
}
