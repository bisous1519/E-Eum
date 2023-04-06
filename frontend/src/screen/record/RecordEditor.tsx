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
import {
  getRecords,
  postRecord,
  putRecord,
} from '../../modules/apis/record/recordApis';
import Tag from '../../components/record/Tag';
import { useRecoilState } from 'recoil';
import {
  RecordsStateType,
  RecordStateType,
  TagStateType,
} from '../../modules/apis/record/recordAtomTypes';
import { recordsState, tagsState } from '../../modules/apis/record/recordAtoms';
import TagList from '../../components/record/TagList';
import TextEditor from '../../components/common/editor/TextEditor';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigator/RecordStack';

const { DEVICE_WIDTH, DEVICE_HEIGHT } = useDimension();

const styles = StyleSheet.create({
  flexBox: {
    flex: 1,
  },
  containerWrapper: {
    alignItems: 'center',
    // backgroundColor: theme.background,
    // backgroundColor: 'orange',
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
    marginTop: 20,
  },
});

type RecordEditorPropsType = {
  // route: {
  //   params: { item: RecordStateType };
  // };
};

export default function RecordEditor({}: // route,
RecordEditorPropsType): JSX.Element {
  const route = useRoute<RouteProp<RootStackParamList, 'RecordEditor'>>();

  const [records, setRecords] = useRecoilState<RecordsStateType>(recordsState);
  const [tags, setTags] = useRecoilState<TagStateType[]>(tagsState);

  const navigation = useNav();
  const richText = useRef<RichEditor>(null);
  const [content, setContent] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<TagStateType>();
  const [selectedIdx, setSelectedIdx] = useState<number>();
  const [isSelectedTagArr, setIsSelectedTagArr] = useState<boolean[]>([]);
  const [screenState, setScreenState] = useState<'등록' | '수정'>('등록');

  const onChangeContext = (e: string) => {
    setContent(e);
  };
  const onPressBack = () => {
    navigation.pop();
  };
  const onPressSubmit = () => {
    // 등록인 경우
    if (screenState === '등록') {
      if (content === '') {
        console.log('content 가 비어있음');
      } else if (!selectedTag) {
        console.log('tag 선택 안함');
      } else {
        postRecord({ content, writerId: 1, tid: selectedTag.id })
          .then(() => getRecords(1))
          .then((data: RecordsStateType) => {
            setRecords(data);
            navigation.popToTop();
          });
      }

      // 수정인 경우
    } else {
      if (content === '') {
        console.log('content 가 비어있음');
      } else if (!selectedTag) {
        console.log('tag 선택 안함');
      } else if (route.params?.itemId) {
        putRecord(route.params.itemId, {
          content,
          writerId: 1,
          tid: selectedTag.id,
        })
          .then(() => getRecords(1))
          .then((data: RecordsStateType) => {
            setRecords(data);
            navigation.popToTop();
          });
      }
    }
  };
  const onSelectTag = (tag: TagStateType) => {
    setSelectedTag(tag);
  };

  useEffect(() => {
    if (route.params?.item) {
      // 꿈기록 수정인 경우
      setScreenState('수정');

      const item: RecordStateType = route.params.item;
      setContent(item.content);

      tags.filter((tag: TagStateType, index: number) => {
        if (tag.name === item.tagName) {
          const arr: boolean[] = [...new Array(tags.length)].map(
            (_, arrIdx: number) => {
              if (index === arrIdx) return true;
              else return false;
            }
          );
          setIsSelectedTagArr([...arr]);
        }
      });
    }
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
            <ButtonComp
              small={true}
              text={screenState}
              onPressBtn={onPressSubmit}
            />
          </View>

          {/* 태그 */}
          {tags ? (
            <TagList
              tags={tags}
              onSelectTag={onSelectTag}
              isSelectedTagArr={isSelectedTagArr}
            />
          ) : (
            <></>
          )}

          {/* 에디터 */}
          <View style={styles.editorWrapper}>
            <TextEditor onChangeContext={onChangeContext} context={content} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
