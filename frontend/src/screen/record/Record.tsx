import React, { useRef, useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  LayoutChangeEvent,
  Pressable,
} from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import theme from '../../utils/theme';
import ItemContainer from '../../components/record/ItemContainer';
import Tag from '../../components/record/Tag';
import PlusButton from '../../components/common/PlusButton';
import useNav from '../../hooks/useNav';
import useDimension from '../../hooks/useDimension';
import DeleteModal from '../../components/record/DeleteModal';
import MockupDateGroupType from '../../models/record/mockupDateGroupType';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  recordsState,
  tagsState,
  recordProfileState,
} from '../../modules/apis/record/recordAtoms';
import {
  getProfileData,
  getRecords,
  getTags,
} from '../../modules/apis/record/recordApis';
import {
  RecordProfileStateType,
  RecordsStateType,
  TagStateType,
} from '../../modules/apis/record/recordAtomTypes';
import TagList from '../../components/record/TagList';
import AddTagModal from '../../components/record/AddTagModal';
import UpDelTagModal from '../../components/record/UpDelTagModal';
import EmptyMessage from '../../components/common/EmptyMessage';
import { LoginUserStateType } from '../../modules/apis/user/userAtomTypes';
import { loginUserState } from '../../modules/apis/user/userAtoms';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList as RecordRootStackParamList } from '../../navigator/RecordStack';

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
  imgPressBox: {
    width: 100,
    height: 100,
    borderRadius: 50,
    // borderWidth: 1,
    // borderColor: 'red',
    position: 'absolute',
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
  display: {
    display: 'none',
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

export default function Record(): JSX.Element {
  const [records, setRecords] = useRecoilState<RecordsStateType>(recordsState);
  const [tags, setTags] = useRecoilState<TagStateType[]>(tagsState);
  const [profile, setProfile] =
    useRecoilState<RecordProfileStateType>(recordProfileState);
  const loginUser = useRecoilValue<LoginUserStateType>(loginUserState);

  // const navigation = useNav();
  const recNavigation =
    useNavigation<NativeStackNavigationProp<RecordRootStackParamList>>();

  const sheetRef = useRef<BottomSheet>(null);
  const imageRef = useRef<Image>(null);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [addTagModal, setAddTagModal] = useState<boolean>(false);
  const [upDelTagModal, setUpDelTagModal] = useState<boolean>(false);
  const [upDelTargetTag, setUpDelTargetTag] = useState<TagStateType>();
  const [profileHeight, setProfileHeight] = useState<number>(0);
  const [tagHeight, setTagHeight] = useState<number>(0);
  const [delTargetContentId, setDelTargetContentId] = useState<number>();
  const [expandFeed, setExpandFeed] = useState<boolean>(false);
  const [imgOffsetXY, setImgOffsetXY] = useState<{ x: number; y: number }>();

  const onLayoutProfile = (e: LayoutChangeEvent): void => {
    const { height } = e.nativeEvent.layout;
    setProfileHeight(height);
  };
  const onLayoutTag = (e: LayoutChangeEvent): void => {
    const { height } = e.nativeEvent.layout;
    setTagHeight(height);
  };
  const onLayoutImage = (): void => {
    imageRef.current?.measureInWindow((x, y) => {
      console.log(x, y);
      setImgOffsetXY({ x, y });
    });
  };

  const handleSheetChange = (idx: number): void => {
    console.log('bottomSheet changed', idx);
    setExpandFeed(idx === 1 ? true : false);
  };

  const handleProfilePress = () => {
    // supNavigation.navigate('SupportProfile', {
    //   uid: 1,
    // });
    // navigation.navigate('SupportProfile');
  };

  const onPressPlusBtn = (): void => {
    recNavigation.push('RecordEditor');
  };

  const onToggleDelete = (recordId?: number): void => {
    if (recordId || recordId === 0) {
      setDelTargetContentId(recordId);
    }
    setDeleteModal((prev) => !prev);
  };
  const onToggleAddTagModal = (): void => {
    setAddTagModal((prev) => !prev);
  };
  const onToggleUpDelTagModal = (tag?: TagStateType): void => {
    if (tag) {
      setUpDelTargetTag(tag);
    }
    setUpDelTagModal((prev) => !prev);
  };

  const fetchData = async () => {
    const recordsData: RecordsStateType | undefined = await getRecords(
      loginUser.uid
    ); // userId 넣어야됨
    const tagsData: TagStateType[] | undefined = await getTags(loginUser.uid);
    const profileData: RecordProfileStateType | undefined =
      await getProfileData(loginUser.uid);
    if (recordsData) {
      setRecords(recordsData);
    }
    if (tagsData) {
      setTags(tagsData);
    }
    if (profileData) {
      setProfile(profileData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={stylesContainer.container}>
      {/* 프로필 */}
      <View style={stylesProfile.container} onLayout={onLayoutProfile}>
        <Text style={stylesProfile.nickName}>{profile.nickname}</Text>
        <View style={stylesProfile.infoWrapper}>
          <Image
            ref={imageRef}
            onLayout={onLayoutImage}
            style={stylesProfile.infoImg}
            source={
              profile.imagePath
                ? { uri: profile.imagePath }
                : require('../../assets/images/sample.png')
            }
          />
          <View style={stylesProfile.infoItemsWrapper}>
            <View style={stylesProfile.infoItem}>
              <Text style={stylesProfile.infoContent}>
                {records ? records.recordCnt + '개' : '-'}
              </Text>
              <Text style={stylesProfile.infoCaption}>꿈피드</Text>
            </View>
            <View style={stylesProfile.infoItem}>
              <Text style={stylesProfile.infoContent}>+{profile.dayCnt}일</Text>
              <Text style={stylesProfile.infoCaption}>꿈여정</Text>
            </View>
          </View>
        </View>
        <Text style={stylesProfile.intro}>{profile.introduction}</Text>
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
            {records ? (
              <FlatList
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                data={records.recordList}
                renderItem={({ item, index }) => (
                  <ItemContainer
                    regTime={records.dateList[index]}
                    list={item}
                    onToggleDelete={onToggleDelete}
                  />
                )}
              />
            ) : (
              // <BottomSheetFlatList
              //   contentContainerStyle={styles.contentContainer}
              //   showsVerticalScrollIndicator={false}
              //   data={records.recordList}
              //   renderItem={({ item, index }) => (
              //     <ItemContainer
              //       regTime={records.dateList[index]}
              //       list={item}
              //       onToggleDelete={onToggleDelete}
              //     />
              //   )}
              // />
              <EmptyMessage
                text='작성된 꿈기록이 없습니다'
                marginBottom={350}
              />
            )}
          </BottomSheet>
        ) : (
          <></>
        )}
      </View>

      {/* 사용자 이미지 클릭 섹션*/}
      {imgOffsetXY && !expandFeed ? (
        <Pressable
          style={StyleSheet.flatten([
            stylesProfile.imgPressBox,
            {
              top: imgOffsetXY.y,
              left: imgOffsetXY.x,
            },
          ])}
          onPress={handleProfilePress}
        ></Pressable>
      ) : (
        <></>
      )}

      {/* 태그 */}
      {!expandFeed ? (
        <View
          style={StyleSheet.flatten([
            stylesTag.container,
            { top: profileHeight },
          ])}
          onLayout={onLayoutTag}
        >
          {tags ? (
            <TagList
              tags={tags}
              allTag={true}
              onToggleAddTagModal={onToggleAddTagModal}
              onToggleUpDelTagModal={onToggleUpDelTagModal}
            />
          ) : (
            <></>
          )}
        </View>
      ) : (
        <></>
      )}
      <PlusButton onPressPlusBtn={onPressPlusBtn} />
      {deleteModal && delTargetContentId ? (
        <DeleteModal
          recordId={delTargetContentId}
          onToggleModal={onToggleDelete}
        />
      ) : (
        <></>
      )}
      {addTagModal ? (
        <AddTagModal onToggleModal={onToggleAddTagModal} />
      ) : (
        <></>
      )}
      {upDelTagModal && upDelTargetTag ? (
        <UpDelTagModal
          tag={upDelTargetTag}
          onToggleModal={onToggleUpDelTagModal}
        />
      ) : (
        <></>
      )}
    </View>
  );
}
