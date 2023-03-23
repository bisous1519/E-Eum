import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import PlusButton from '../../components/common/PlusButton';
import theme from '../../utils/theme';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  profileContainer: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT * 0.3,
  },
  profileBox: {
    flex: 2,
    margin: 10,
    width: DEVICE_WIDTH * 0.7,
    borderColor: theme.mainColor.main,
    borderWidth: 5,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  badgeContainer: {
    flex: 3,
    backgroundColor: theme.mainColor.main,
    width: DEVICE_WIDTH,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
});

// 뱃지 목록 임의로 만들게용...
const badge: string[] = [];
// ===========================

export default function Mypage(): JSX.Element {
  const onPressBtn = () => {
    console.log('나는 수정이 하고 싶다고..!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileBox}>
          <Text>프로필 이미지</Text>
        </View>
      </View>
      <ScrollView style={styles.badgeContainer}>
        <Text>뱃지 목록</Text>
      </ScrollView>
      <PlusButton onPressPlusBtn={onPressBtn} />
    </View>
  );
}
