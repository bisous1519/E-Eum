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
  Button,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet, {
  BottomSheetScrollView,
  WINDOW_HEIGHT,
} from '@gorhom/bottom-sheet';
import InputComp from '../../components/common/input/InputComp';
import TextComp from '../../components/common/TextComp';
import theme from '../../utils/theme';

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
    marginTop: 10,
  },
  infoCaption: {
    fontSize: theme.fontSize.small,
    color: theme.textColor.light,
  },
  intro: {
    fontSize: theme.fontSize.regular,
    color: theme.textColor.light,
  },
});

const stylesFeed = StyleSheet.create({
  container: {
    // backgroundColor: 'orange',
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
    backgroundColor: 'white',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
});

export default function Record(): JSX.Element {
  const [bottomHeight, setBottomHeight] = useState<number>();
  const [snapPoints, setSnapPoints] = useState<(number | string)[]>();
  const bottomRef = useRef<View>(null);

  // hooks
  const sheetRef = useRef<BottomSheet>(null);

  // variables
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );
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
        console.log('y', y);
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

      {/* fake */}
      <View style={styles.fake} ref={bottomRef}>
        <Text>ff</Text>
      </View>

      {/* 피드 */}
      <View style={[stylesFeed.container, styles.container]}>
        {/* <Button title='Snap To 90%' onPress={() => handleSnapPress(2)} />
        <Button title='Snap To 50%' onPress={() => handleSnapPress(1)} />
        <Button title='Snap To 25%' onPress={() => handleSnapPress(0)} />
        <Button title='Close' onPress={() => handleClosePress()} /> */}
        {snapPoints && (
          <BottomSheet
            ref={sheetRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
          >
            <BottomSheetScrollView
              contentContainerStyle={styles.contentContainer}
            >
              {/* {data.map(renderItem)} */}
            </BottomSheetScrollView>
          </BottomSheet>
        )}
      </View>
    </SafeAreaView>
  );
}
