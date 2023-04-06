import React, { useState } from 'react';
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
import { getTags, postTag } from '../../modules/apis/record/recordApis';
import { TagStateType } from '../../modules/apis/record/recordAtomTypes';
import { useRecoilState, useRecoilValue } from 'recoil';
import { tagsState } from '../../modules/apis/record/recordAtoms';
import { LoginUserStateType } from '../../modules/apis/user/userAtomTypes';
import { loginUserState } from '../../modules/apis/user/userAtoms';

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
  onToggleModal: () => void;
};

export default function AddTagModal({
  onToggleModal,
}: DeleteModalPropsType): JSX.Element {
  const loginUser = useRecoilValue<LoginUserStateType>(loginUserState);
  const [tags, setTags] = useRecoilState<TagStateType[]>(tagsState);

  const { text, onChangeText } = useInputText();
  const onPressCreate = () => {
    onToggleModal();
    postTag({ uid: loginUser.uid, name: text })
      .then(() => getTags(loginUser.uid))
      .then((data) => setTags(data));
  };
  return (
    <ModalComp onCloseModal={onToggleModal}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>태그 생성</Text>
        <View style={styles.content}>
          <InputComp name='태그명' text={text} onChangeText={onChangeText} />
        </View>
      </View>
      <Pressable style={styles.confirm} onPress={onPressCreate}>
        <Text style={styles.confirmText}>확인</Text>
      </Pressable>
    </ModalComp>
  );
}

