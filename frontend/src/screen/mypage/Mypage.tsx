import React from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PlusButton from '../../components/common/PlusButton';
import theme from '../../utils/theme';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
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
  uniBadge: {
    backgroundColor: theme.textColor.white,
    borderRadius: 5,
    width: DEVICE_WIDTH * 0.1,
    height: DEVICE_WIDTH * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
});
// =====================================

// 이것도...나중에 분리해야 하는 badge임.. ==============
type BadgeProps = {
  id: number;
  num: number;
};

const Badge = ({ id, num }: BadgeProps) => (
  <TouchableOpacity
    style={styles.uniBadge}
    onPress={() => console.log('뱃지 디테일이 까꿍')}
    activeOpacity={0.6}
  >
    <View>
      <Text>{num}</Text>
    </View>
  </TouchableOpacity>
);

// 뱃지 목록 임의로 만들게용...
// image_path가 string으로 들어올거임
const badgeData = [
  {
    id: 1,
    num: 1,
  },
  {
    id: 2,
    num: 2,
  },
  {
    id: 3,
    num: 3,
  },
  {
    id: 4,
    num: 4,
  },
  {
    id: 5,
    num: 5,
  },
  {
    id: 6,
    num: 6,
  },
  {
    id: 7,
    num: 7,
  },
];

// ======================================================

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
      {/* <ScrollView style={styles.badgeContainer}>
        {badge.map((data, i) => {
          return (
            <View key={i} style={styles.uniBadge}>
              <Text>{data}</Text>
            </View>
          );
        })}
      </ScrollView> */}
      <FlatList
        style={styles.badgeContainer}
        data={badgeData}
        renderItem={({ item }) => <Badge id={item.id} num={item.num} />}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
      />
      <PlusButton onPressPlusBtn={onPressBtn} />
    </View>
  );
}
