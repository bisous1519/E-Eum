import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { deleteRecord, getRecords } from '../../modules/apis/record/recordApis';
import { recordsState } from '../../modules/apis/record/recordAtoms';
import { RecordsStateType } from '../../modules/apis/record/recordAtomTypes';
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

type DeleteModalPropsType = {
  recordId: number;
  onToggleModal: () => void;
};

export default function DeleteModal({
  recordId,
  onToggleModal,
}: DeleteModalPropsType): JSX.Element {
  const [records, setRecords] = useRecoilState<RecordsStateType>(recordsState);

  const onPressDelete = () => {
    onToggleModal();
    deleteRecord(recordId)
      .then(() => getRecords(1))
      .then((data: RecordsStateType) => setRecords(data));
  };
  return (
    <ModalComp onCloseModal={onToggleModal}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>꿈 기록 삭제</Text>
        <Text style={styles.content}>정말 삭제하시겠습니까?</Text>
      </View>
      <Pressable style={styles.confirm} onPress={onPressDelete}>
        <Text style={styles.confirmText}>확인</Text>
      </Pressable>
    </ModalComp>
  );
}

