import React, { useCallback, useRef, useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  LayoutChangeEvent,
} from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import InputComp from '../../components/common/input/InputComp';
import TextComp from '../../components/common/TextComp';
import theme from '../../utils/theme';
import ItemContainer from '../../components/record/ItemContainer';
import Tag from '../../components/record/Tag';
import PlusButton from '../../components/common/PlusButton';
import useNav from '../../hooks/useNav';
import useDimension from '../../hooks/useDimension';
import ModalComp from '../../components/common/ModalComp';
import DeleteModal from '../../components/record/DeleteModal';
import MockupDateGroupType from '../../models/record/mockupDateGroupType';
import { useRecoilState } from 'recoil';
import {
  recordsState,
  recordState,
} from '../../modules/apis/record/recordAtoms';
import { getRecords } from '../../modules/apis/record/recordApis';
import {
  RecordsStateType,
  RecordStateType,
} from '../../modules/apis/record/recordAtomTypes';

const { DEVICE_WIDTH, DEVICE_HEIGHT } = useDimension();

const stylesContainer = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.mainColor.light,
  },
});

const stylesProfile = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH * 0.8,
  },
  nickName: {
    fontSize: theme.fontSize.big,
    fontWeight: '600', // theme 사용해서 바꾸기
    marginTop: 20,
  },
  infoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 30,
  },
  infoImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoItemsWrapper: {
    flexDirection: 'row',
  },
  infoItem: {
    marginHorizontal: 30,
    alignItems: 'center',
  },
  infoContent: {
    fontSize: theme.fontSize.regular,
  },
  infoCaption: {
    fontSize: theme.fontSize.small,
    color: theme.textColor.light,
    marginTop: 10,
  },
  intro: {
    fontSize: theme.fontSize.regular,
    color: theme.textColor.light,
  },
});

const stylesTag = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH * 0.8,
    height: 30,
    marginTop: 30,
    position: 'absolute',
  },
  scrollBox: {
    alignItems: 'center',
  },
});

const stylesFeed = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    flex: 1,
    position: 'absolute',
  },
});

const styles = StyleSheet.create({
  fake: {
    flex: 1,
    backgroundColor: 'orange',
  },
  container: {
    paddingTop: 200,
  },
  contentContainer: {
    width: DEVICE_WIDTH * 0.9,
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
});

const mockup: MockupDateGroupType[] = [
  {
    regTime: '23.03.11',
    list: [
      {
        regTime: '23.03.11',
        id: 0,
        tag: '꿈',
        content:
          '구글 개발자 인터뷰를 봤다. 멋있다. 웅장하다!!!!! 안웅장하다 웅장하다!!!',
      },
      {
        regTime: '23.03.11',
        id: 1,
        tag: '꿈',
        content: '안웅장하다',
      },
      {
        regTime: '23.03.11',
        id: 2,
        tag: '꿈',
        content: '멋있다. 웅장하다!!!!! 안웅장하다 웅장하다!!!',
      },
    ],
  },
  {
    regTime: '23.03.10',
    list: [
      {
        regTime: '23.03.11',
        id: 0,
        tag: '꿈',
        content: '구글 개발자 인터뷰를 봤다.',
      },
      {
        regTime: '23.03.11',
        id: 1,
        tag: '꿈',
        content: '안웅장하다 멋있다. 웅장하다!!!!! 안웅장하다 웅장하다!!!',
      },
    ],
  },
];

export default function Record(): JSX.Element {
  const [records, setRecords] = useRecoilState<RecordsStateType>(recordsState);

  const navigation = useNav();
  const sheetRef = useRef<BottomSheet>(null);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [profileHeight, setProfileHeight] = useState<number>(0);
  const [tagHeight, setTagHeight] = useState<number>(0);

  const onLayoutProfile = (e: LayoutChangeEvent): void => {
    const { height } = e.nativeEvent.layout;
    setProfileHeight(height);
  };
  const onLayoutTag = (e: LayoutChangeEvent): void => {
    const { height } = e.nativeEvent.layout;
    setTagHeight(height);
  };

  const handleSheetChange = (idx: number): void => {
    console.log('bottomSheet changed', idx);
  };
  const onPressPlusBtn = (): void => {
    navigation.push('RecordEditor', { itemId: 3 });
  };
  const onToggleDelete = (): void => {
    console.log('삭제!!!!!');
    setDeleteModal((prev) => !prev);
  };

  const fetchData = async () => {
    const { data } = await getRecords(1); // userId 넣어야됨
    setRecords(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={stylesContainer.container}>
      {/* 프로필 */}
      <View style={stylesProfile.container} onLayout={onLayoutProfile}>
        <Text style={stylesProfile.nickName}>나싸피임</Text>
        <View style={stylesProfile.infoWrapper}>
          <Image
            style={stylesProfile.infoImg}
            source={require('../../assets/images/profileImg.png')}
          />
          <View style={stylesProfile.infoItemsWrapper}>
            <View style={stylesProfile.infoItem}>
              <Text style={stylesProfile.infoContent}>11개</Text>
              <Text style={stylesProfile.infoCaption}>꿈피드</Text>
            </View>
            <View style={stylesProfile.infoItem}>
              <Text style={stylesProfile.infoContent}>+23일</Text>
              <Text style={stylesProfile.infoCaption}>꿈여정</Text>
            </View>
          </View>
        </View>
        <Text style={stylesProfile.intro}>
          #열정 #청춘 나싸피는 열정꾼이다 화이팅임
        </Text>
      </View>

      {/* 피드 */}
      <View
        style={StyleSheet.flatten([stylesFeed.container, styles.container])}
      >
        {profileHeight && profileHeight != 0 && tagHeight && tagHeight != 0 ? (
          <BottomSheet
            ref={sheetRef}
            index={0}
            snapPoints={[
              DEVICE_HEIGHT - (profileHeight + tagHeight + 50),
              '100%',
            ]}
            onChange={handleSheetChange}
            style={{ alignItems: 'center' }}
          >
            {/* <BottomSheetFlatList
              contentContainerStyle={styles.contentContainer}
              showsVerticalScrollIndicator={false}
              data={records.recordList}
              renderItem={({ item, index }) => (
                <ItemContainer
                  regTime={item.regTime}
                  list={item.content}
                  onToggleDelete={onToggleDelete}
                />
              )}
            /> */}
          </BottomSheet>
        ) : (
          <></>
        )}
      </View>

      {/* 태그 */}
      <View
        style={StyleSheet.flatten([
          stylesTag.container,
          { top: profileHeight },
        ])}
        onLayout={onLayoutTag}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={stylesTag.scrollBox}
        >
          <Tag text='전체' />
          <Tag text='전체전체' />
          <Tag text='전체' />
          <Tag text='전체' />
          <Tag text='전체' />
          <Tag text='전체' />
          <Tag text='전체' />
          <Tag text='+' />
        </ScrollView>
      </View>
      <PlusButton onPressPlusBtn={onPressPlusBtn} />
      {deleteModal && <DeleteModal onToggleDelete={onToggleDelete} />}
    </View>
  );
}

