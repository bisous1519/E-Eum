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
  onToggleUpDelTagModal?: (tag?: TagStateType) => void;
  onSelectTag?: (tag: TagStateType) => void;
  selectedTag?: TagStateType;
  selectedIdx?: number;
};

export default function TagList({
  tags,
  allTag,
  onToggleAddTagModal,
  onToggleUpDelTagModal,
  onSelectTag,
  selectedTag,
  selectedIdx,
}: TagListPropsType): JSX.Element {
  const [records, setRecords] = useRecoilState<RecordsStateType>(recordsState);

  const [isSelectedTag, setIsSelectedTag] = useState<boolean[]>([]);
  const [isSelectedAllTag, setIsSelectedAllTag] = useState<boolean>(true);

  const falseArr = (): boolean[] => {
    const arr: boolean[] = [...new Array(tags.length)].map(() => false);
    return arr;
  };

  const onPressTag = (tag: TagStateType, index: number): void => {
    setIsSelectedAllTag(false);

    const arr = falseArr();
    arr[index] = true;
    setIsSelectedTag([...arr]);

    // record 화면이면 그 태그만 보여주는 api 요청
    if (allTag) {
      fetchGetRecordsWithTag(index);
    }
    // recordEditor 화면이면 select된 tag 세팅
    if (onSelectTag) {
      onSelectTag(tag);
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
  };

  const onLongPressTag = (tag?: TagStateType) => {
    if (onToggleUpDelTagModal) {
      if (tag) {
        onToggleUpDelTagModal!(tag);
      } else {
        onToggleUpDelTagModal!();
      }
    }
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
    if (selectedTag) {
      onPressTag(selectedTag, selectedIdx!);
    }
  }, [selectedTag, selectedIdx]);

  useEffect(() => {
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
          tag={{ id: 0, name: '전체' }}
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
            tag={tag}
            isSelected={isSelectedTag[index]}
            onPressTag={() => onPressTag(tag, index)}
            onLongPressTag={onLongPressTag}
          />
        ))}
      {allTag ? (
        <Tag tag={{ id: 0, name: '+' }} onPressTag={onPressAddTag} />
      ) : (
        <></>
      )}
    </ScrollView>
  );
}

