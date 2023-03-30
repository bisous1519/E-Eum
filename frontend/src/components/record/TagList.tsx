import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRecoilState } from 'recoil';
import {
  getRecords,
  getRecordsWithTag,
} from '../../modules/apis/record/recordApis';
import { recordsState } from '../../modules/apis/record/recordAtoms';
import {
  RecordsStateType,
  TagStateType,
} from '../../modules/apis/record/recordAtomTypes';
import AddTagModal from './AddTagModal';
import Tag from './Tag';

const styles = StyleSheet.create({
  scrollBox: {
    alignItems: 'center',
  },
});

type TagListPropsType = {
  tags: TagStateType[];
  allTag?: boolean;
  onToggleAddTagModal?: () => void;
};

export default function TagList({
  tags,
  allTag,
  onToggleAddTagModal,
}: TagListPropsType): JSX.Element {
  const [records, setRecords] = useRecoilState<RecordsStateType>(recordsState);

  const [isSelectedTag, setIsSelectedTag] = useState<boolean[]>([]);
  const [isSelectedAllTag, setIsSelectedAllTag] = useState<boolean>(true);

  const falseArr = (): boolean[] => {
    const arr: boolean[] = [...new Array(tags.length)].map(() => false);
    return arr;
  };

  const onPressTag = (index: number): void => {
    setIsSelectedAllTag(false);

    const arr = falseArr();
    arr[index] = true;
    setIsSelectedTag([...arr]);

    // record 화면이면 그 태그만 보여주는 api 요청
    if (allTag) {
      fetchGetRecordsWithTag(index);
    }
  };

  const onPressAllTag = () => {
    setIsSelectedAllTag(true);

    const arr = falseArr();
    setIsSelectedTag([...arr]);

    // record 화면이면 전체 보여주는 api 요청
    if (allTag) {
      fetchAllRecords();
    }
  };

  const onPressAddTag = () => {
    if (onToggleAddTagModal) {
      onToggleAddTagModal();
    }
    // 그러고나서 tag 새로가져오기
  };

  const fetchAllRecords = async () => {
    const recordsData: RecordsStateType | undefined = await getRecords(1);
    if (recordsData) {
      setRecords(recordsData);
    }
  };

  const fetchGetRecordsWithTag = async (index: number) => {
    const recordsData: RecordsStateType | undefined = await getRecordsWithTag(
      1,
      tags[index].id
    );
    if (recordsData) {
      setRecords(recordsData);
    }
  };

  useEffect(() => {
    console.log('!!!!', tags);
    if (tags) {
      const arr = falseArr();
      setIsSelectedTag([...arr]);
    }
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollBox}
    >
      {allTag ? (
        <Tag
          text='전체'
          isSelected={isSelectedAllTag}
          onPressTag={onPressAllTag}
        />
      ) : (
        <></>
      )}
      {tags &&
        tags.map((tag, index) => (
          <Tag
            key={tag.id}
            text={tag.name}
            isSelected={isSelectedTag[index]}
            onPressTag={() => onPressTag(index)}
          />
        ))}
      {allTag ? <Tag text='+' onPressTag={onPressAddTag} /> : <></>}
    </ScrollView>
  );
}

