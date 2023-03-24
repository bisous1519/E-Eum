import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import theme from '../../utils/theme';
import ModalComp from '../common/ModalComp';

const styles = StyleSheet.create({
  wrapper: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

type SupportModalPropsType = {
  onToggleDelete: () => void;
};

export default function SupportModal({
  onToggleDelete,
}: SupportModalPropsType): JSX.Element {
  const onPressDelete = () => {
    onToggleDelete();
    console.log('후원 api');
  };
  return (
    <ModalComp onCloseModal={onToggleDelete}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>후원금액</Text>
        <Text style={styles.content}>정말 삭제하시겠습니까?</Text>
      </View>
      <Pressable style={styles.confirm} onPress={onPressDelete}>
        <Text style={styles.confirmText}>후원하기</Text>
      </Pressable>
    </ModalComp>
  );
}
