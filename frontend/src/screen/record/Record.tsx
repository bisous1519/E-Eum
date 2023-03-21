import React, {
  useCallback,
  useRef,
  useMemo,
  useState,
  useEffect,
} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import InputComp from '../../components/common/input/InputComp';
import TextComp from '../../components/common/TextComp';
import theme from '../../utils/theme';
import ItemContainer from '../../components/record/ItemContainer';
import Tag from '../../components/record/Tag';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

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

export default function Record(): JSX.Element {
  const [bottomHeight, setBottomHeight] = useState<number>();
  const [snapPoints, setSnapPoints] = useState<(number | string)[]>([
    550,
    '100%',
  ]);
  const bottomRef = useRef<View>(null);

  // hooks
  const sheetRef = useRef<BottomSheet>(null);

  // const snapPoints = useMemo(() => ['50%', bottomHeight!, '100%'], []);

  // callbacks
  const handleSheetChange = useCallback((index: any) => {
    console.log('handleSheetChange', index);
  }, []);
  const handleSnapPress = useCallback((index: any) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  // render
  const renderItem = useCallback(
    (item: any) => (
      <View key={item} style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    []
  );
  useEffect(() => {
    console.log(1);
    if (bottomRef.current) {
      bottomRef.current.measureInWindow((x, y, width, height) => {
        console.log('height', height);
        // setBottomHeight(height);
        if (height > 0) {
          setSnapPoints([height, '100%']);
          console.log(2);
        }
      });
    }
  }, []);

  return (
    <SafeAreaView style={stylesContainer.container}>
      {/* 프로필 */}
      <View style={stylesProfile.container}>
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
      {/* 태그 */}
      <View style={stylesTag.container}>
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
          <Tag text='전체' />
        </ScrollView>
      </View>

      {/* fake */}
      {/* <View style={styles.fake} ref={bottomRef}>
        <Text>ff</Text>
      </View> */}

      {/* 피드 */}
      <View style={[stylesFeed.container, styles.container]}>
        {snapPoints && (
          <BottomSheet
            ref={sheetRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
            style={{ alignItems: 'center' }}
          >
            <BottomSheetScrollView
              contentContainerStyle={styles.contentContainer}
              showsVerticalScrollIndicator={false}
            >
              {/* {data.map(renderItem)} */}
              <ItemContainer />
              <ItemContainer />
            </BottomSheetScrollView>
          </BottomSheet>
        )}
      </View>
    </SafeAreaView>
  );
}

