import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import useNav from '../../hooks/useNav';
import { chargePoint } from '../../modules/apis/user/userApis';
import theme from '../../utils/theme';
import useDimension from '../../hooks/useDimension';
import NumberPad from '../../components/support/NumberPad';

const { DEVICE_WIDTH, DEVICE_HEIGHT } = useDimension();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: DEVICE_HEIGHT * 0.1,
    paddingBottom: DEVICE_HEIGHT * 0.03,
  },
  input: {
    borderWidth: 2,
    width: DEVICE_WIDTH * 0.55,
    height: DEVICE_HEIGHT * 0.08,
    margin: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.background,
    borderBottomColor: theme.mainColor.main,
  },
  inputNumber: {
    fontSize: theme.fontSize.regular,
  },
  goal: {
    fontSize: theme.fontSize.small,
  },
  confirm: {
    width: DEVICE_WIDTH * 0.8,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: theme.grayColor.lightGray,
    alignItems: 'center',
  },
  confirmText: {
    fontSize: theme.fontSize.small,
  },
});

export default function PointCharge() {
  const navigation = useNav();

  // 충전하려는 포인트 변수
  const [point, setPoint] = useState<string>('');

  const onPressNumber = (e: string | null) => {
    if (point.substring(0, 1) === '' && e === '0') setPoint('');
    else if (e !== null) setPoint(point + e);
  };

  const onPressDelete = () => {
    setPoint(point.substring(0, point.length - 1));
  };

  const handlePointCharge = () => {
    chargePoint(1, Number(point));
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput style={styles.inputNumber}>{point}</TextInput>
      </View>
      <NumberPad onNumberPress={onPressNumber} onDeletePress={onPressDelete} />
      {/* 이 아래가 '후원하기' 버튼 부분 */}
      <Pressable style={styles.confirm} onPress={handlePointCharge}>
        <Text style={styles.confirmText}>충전하기</Text>
      </Pressable>
    </View>
  );
}
