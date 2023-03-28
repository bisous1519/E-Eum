import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import theme from '../../utils/theme';
import ModalComp from '../common/ModalComp';
import { MaterialIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  wrapper: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: theme.fontSize.big,
    marginTop: 30,
  },
  content: {
    fontSize: theme.fontSize.regular,
    marginVertical: 40,
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

type ChargeAlertModalPropsType = {
  onToggleDelete: () => void;
};

export default function ChargeAlertModal({
  onToggleDelete,
}: ChargeAlertModalPropsType): JSX.Element {
  const onPressMove = () => {
    onToggleDelete();
    console.log('충전 화면으로 꼬우');
  };
  return (
    <ModalComp onCloseModal={onToggleDelete}>
      <View style={styles.wrapper}>
        <MaterialIcons
          name='copyright'
          size={30}
          color={theme.mainColor.main}
        />
        <Text style={styles.title}>잔액이 부족합니다!</Text>
        <Text style={styles.content}>충전 페이지로 이동하시겠습니까?</Text>
      </View>
      <Pressable style={styles.confirm} onPress={onPressMove}>
        <Text style={styles.confirmText}>이동하기</Text>
      </Pressable>
    </ModalComp>
  );
}
