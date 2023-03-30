import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import ButtonComp from '../../components/common/button/ButtonComp';
import useDimension from '../../hooks/useDimension';
import theme from '../../utils/theme';
import {
  actions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import useNav from '../../hooks/useNav';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getRecords, postRecord } from '../../modules/apis/record/recordApis';
import Tag from '../../components/record/Tag';
import { useRecoilState } from 'recoil';
import {
  RecordsStateType,
  TagStateType,
} from '../../modules/apis/record/recordAtomTypes';
import { recordsState, tagsState } from '../../modules/apis/record/recordAtoms';
import TagList from '../../components/record/TagList';

const { DEVICE_WIDTH, DEVICE_HEIGHT } = useDimension();

const styles = StyleSheet.create({
  flexBox: {
    flex: 1,
  },
  containerWrapper: {
    alignItems: 'center',
    // backgroundColor: theme.background,
    backgroundColor: 'orange',
  },
  container: {
    width: DEVICE_WIDTH * 0.9,
    // backgroundColor: 'orange',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  editorWrapper: {
    // width: '100%',
    // color: theme.textColor.light,
    // flex: 1,
    marginTop: 20,
    borderWidth: 3,
    borderColor: 'orange',
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

type RecordEditorPropsType = {
  route: {
    params: { itemId?: number };
  };
};

export default function RecordEditor({
  route,
}: RecordEditorPropsType): JSX.Element {
  const [records, setRecords] = useRecoilState<RecordsStateType>(recordsState);
  const [tags, setTags] = useRecoilState<TagStateType[]>(tagsState);

  const navigation = useNav();
  const richText = useRef<RichEditor>(null);
  const [content, setContent] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<TagStateType>();

  const onChangeContext = (e: string) => {
    setContent(e);
  };
  const onPressBack = () => {
    navigation.pop();
  };
  const onPressSubmit = () => {
    if (content === '') {
      console.log('content 가 비어있음');
    } else if (!selectedTag) {
      console.log('tag 선택 안함');
    } else {
      console.log(content, selectedTag);
      postRecord({ content, writerId: 1, tid: selectedTag.id })
        .then(() => getRecords(1))
        .then((data: RecordsStateType) => {
          setRecords(data);
          navigation.popToTop();
        });
    }
  };
  const onSelectTag = (tag: TagStateType) => {
    setSelectedTag(tag);
  };

  useEffect(() => {
    // console.log(route.params);
    // if (route.params) {
    //   // 수정하러 넘어온 애
    //   console.log('수정화면');
    //   setContent('원래이런내용이 써있는거고 이거 이제 수정하는거얌얌');
    // }
  }, []);

  return (
    <SafeAreaView style={styles.flexBox}>
      <KeyboardAwareScrollView
        style={styles.flexBox}
        contentContainerStyle={styles.containerWrapper}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.container}>
          {/* 헤더 */}
          <View style={styles.header}>
            <Feather name='x' size={24} color='black' onPress={onPressBack} />
            <ButtonComp small={true} text='등록' onPressBtn={onPressSubmit} />
          </View>

          {/* 태그 */}
          {tags ? <TagList tags={tags} onSelectTag={onSelectTag} /> : <></>}

          {/* 에디터 */}
          <View style={styles.editorWrapper}>
            <RichEditor
              // initialContentHTML={context}
              ref={richText}
              placeholder='내용을 입력하세요'
              initialFocus={false}
              // useContainer={true}
              style={{ flex: 1, height: DEVICE_HEIGHT }}
              editorStyle={{
                backgroundColor: theme.background,
                color: theme.textColor.main,
                placeholderColor: theme.grayColor.lightGray,
              }}
              initialHeight={500}
              androidHardwareAccelerationDisabled={true}
              onChange={onChangeContext}
            />
            <RichToolbar
              editor={richText}
              actions={[
                actions.insertImage,
                actions.setBold,
                actions.setItalic,
                actions.insertBulletsList,
                actions.insertOrderedList,
                actions.setStrikethrough,
                actions.setUnderline,
              ]}
              onPressAddImage={() => {}}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

