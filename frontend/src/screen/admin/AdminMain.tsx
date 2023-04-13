import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonComp from '../../components/common/button/ButtonComp';
import useDimension from '../../hooks/useDimension';
import theme from '../../utils/theme';
import useNav from '../../hooks/useNav';

const { DEVICE_WIDTH } = useDimension();

const styles = StyleSheet.create({
  areaContainer: {
    backgroundColor: theme.background,
    flex: 1,
    alignItems: 'center',
  },
  container: {
    width: DEVICE_WIDTH * 0.9,
    flex: 1,
  },
  button: {
    marginVertical: 15,
  },
});

export default function AdminMain(): JSX.Element {
  const navigation = useNav();
  const onPressApprove = () => {
    navigation.push('Approve');
  };
  return (
    <SafeAreaView style={styles.areaContainer}>
      <View style={styles.container}>
        <ButtonComp
          text='자문단 신청 및 자립준비청년 인증 관리'
          onPressBtn={onPressApprove}
          style={styles.button}
        />
        <ButtonComp
          text='신고 회원 관리'
          onPressBtn={() => {}}
          style={styles.button}
        />
        <ButtonComp
          text='신고 해류병 관리'
          onPressBtn={() => {}}
          style={styles.button}
        />
        <ButtonComp
          text='후원글 관리'
          onPressBtn={() => {}}
          style={styles.button}
        />
        <ButtonComp
          text='환불 관리'
          onPressBtn={() => {}}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

