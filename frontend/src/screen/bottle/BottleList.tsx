import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'salmon',
    flex: 1,
  },
});

export default function BottleList(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Text>BottleList</Text>

      <Text>꿈피드</Text>
      <Text>꿈후원 목록</Text>
      <Text>마이페이지</Text>
      <Text>알림</Text>
    </SafeAreaView>
  );
}
