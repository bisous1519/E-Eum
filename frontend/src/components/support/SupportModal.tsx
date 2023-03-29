import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import useDimension from '../../hooks/useDimension';
import theme from '../../utils/theme';
// 후원금액 입력 숫자패드
import NumberPad from '../../components/support/NumberPad';

const { DEVICE_WIDTH, DEVICE_HEIGHT } = useDimension();

const styles = StyleSheet.create({
  layer: {
    flex: 1,
    backgroundColor: theme.layerColor,
    position: 'absolute',
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emptySpace: {
    flex: 3,
    // height: DEVICE_HEIGHT * 0.3,
    width: DEVICE_WIDTH,
  },
  modal: {
    flex: 7,
    // height: DEVICE_HEIGHT * 0.7,
    width: DEVICE_WIDTH,
    backgroundColor: theme.background,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
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
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: theme.grayColor.lightGray,
    alignItems: 'center',
  },
  confirmText: {
    fontSize: theme.fontSize.small,
  },
});

type SupportModalPropsType = {
  onToggleDelete: () => void;
};

export default function SupportModal({
  onToggleDelete,
}: SupportModalPropsType): JSX.Element {
  // 걍 잠시 넣을 값
  const tempNum: number = 120000;

  // 입력되는 숫자 값
  const [pay, setPay] = useState<string>('');

  // 후원하기 컴포넌트 외부 -> 후원 중지
  const onPressOuter = () => {
    // setPay('');
    onToggleDelete();
  };

  // 숫자 패드 입력 관리
  const onPressNumber = (e: string | null) => {
    if (pay.substring(0, 1) === '' && e === '0') setPay('');
    else if (e !== null) setPay(pay + e);
  };

  // 숫자 패드 삭제 관리
  const onPressDelete = () => {
    setPay(pay.substring(0, pay.length - 1));
  };

  // 후원해주기
  const onPressSupport = () => {
    onToggleDelete();
    console.log('포인트 차감하고 후원해주는 API');
  };

  return (
    <View style={styles.layer}>
      <Pressable style={styles.emptySpace} onPress={onPressOuter} />
      <View style={styles.modal}>
        {/* 이 부분에 TextInput, NumberPad 삽입 */}
        <View style={styles.input}>
          <TextInput style={styles.inputNumber}>{pay}</TextInput>
        </View>
        <View>
          <Text style={styles.goal}>목표까지 {tempNum}원</Text>
        </View>
        <NumberPad
          onNumberPress={onPressNumber}
          onDeletePress={onPressDelete}
        />
        {/* 이 아래가 '후원하기' 버튼 부분 */}
        <Pressable style={styles.confirm} onPress={onPressSupport}>
          <Text style={styles.confirmText}>후원하기</Text>
        </Pressable>
      </View>
    </View>
  );
}
