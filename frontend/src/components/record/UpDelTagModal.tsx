import React, { useEffect, useState } from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInputChangeEventData,
  View,
} from 'react-native';
import theme from '../../utils/theme';
import InputComp from '../common/input/InputComp';
import ModalComp from '../common/ModalComp';
import useInputText from '../../hooks/useInputText';
import {
  deleteTag,
  getRecords,
  getTags,
  postTag,
  putTag,
} from '../../modules/apis/record/recordApis';
import {
  RecordsStateType,
  TagStateType,
} from '../../modules/apis/record/recordAtomTypes';
import { useRecoilState } from 'recoil';
import { recordsState, tagsState } from '../../modules/apis/record/recordAtoms';

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: theme.fontSize.big,
    marginTop: 30,
  },
  content: {
    width: '70%',
    marginVertical: 20,
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
  onToggleModal: (tag?: TagStateType) => void;
  tag: TagStateType;
};

export default function UpDelTagModal({
  onToggleModal,
  tag,
}: DeleteModalPropsType): JSX.Element {
  const [records, setRecords] = useRecoilState<RecordsStateType>(recordsState);
  const [tags, setTags] = useRecoilState<TagStateType[]>(tagsState);

  const { text, onChangeText, setText } = useInputText();
  const onPressUpdate = () => {
    onToggleModal();
    putTag(tag.id, { name: text })
      .then(() => getTags(1))
      .then((data) => setTags(data));
  };
  const onPressDelete = () => {
    onToggleModal();
    deleteTag(tag.id)
      .then(() => getTags(1))
      .then((data: TagStateType[]) => setTags(data))
      .then(() => getRecords(1))
      .then((data: RecordsStateType) => setRecords(data));
  };

  useEffect(() => {
    setText(tag.name);
  }, []);
  return (
    <ModalComp onCloseModal={onToggleModal}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>태그 수정</Text>
        <View style={styles.content}>
          <InputComp name='태그명' text={text} onChangeText={onChangeText} />
        </View>
      </View>
      <Pressable style={styles.confirm} onPress={onPressUpdate}>
        <Text style={styles.confirmText}>수정</Text>
      </Pressable>
      <Pressable style={styles.confirm} onPress={onPressDelete}>
        <Text style={styles.confirmText}>삭제</Text>
      </Pressable>
    </ModalComp>
  );
}

