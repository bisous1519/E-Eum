import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import useDimension from '../../hooks/useDimension';
import theme from '../../utils/theme';

const { DEVICE_WIDTH, DEVICE_HEIGHT } = useDimension();

const styles = StyleSheet.create({
  layer: {
    flex: 1,
    backgroundColor: theme.layerColor,
    position: 'absolute',
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    alignItems: 'center',
  },
  emptySpace: {
    flex: 3,
    width: DEVICE_WIDTH,
    // height: DEVICE_HEIGHT * 0.3,
  },
  modal: {
    flex: 7,
    width: DEVICE_WIDTH,
    // height: DEVICE_HEIGHT * 0.7,
    backgroundColor: theme.background,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
  },
  confirm: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: theme.grayColor.lightGray,
    width: '100%',
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
  // 후원해주기
  const onPressSupport = () => {
    onToggleDelete();
    console.log('포인트 차감하고 후원해주는 API');
  };
  // 후원하기 컴포넌트 외부 -> 후원 중지
  const onPressOuter = () => {
    onToggleDelete();
  };
  return (
    <View style={styles.layer}>
      <Pressable style={styles.emptySpace} onPress={onPressOuter} />
      <View style={styles.modal}>
        {/* 이 부분에 TextInput, NumberPad 삽입 */}
        <TextInput placeholder='으악' />
        {/* 이 아래가 '후원하기' 버튼 부분 */}
        <Pressable style={styles.confirm} onPress={onPressSupport}>
          <Text style={styles.confirmText}>후원하기</Text>
        </Pressable>
      </View>
    </View>
  );
}
