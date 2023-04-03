import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import theme from '../../utils/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ModifyButton from '../../components/common/ModifyButton';
import useNav from '../../hooks/useNav';
import ConfirmButton from '../../components/common/ConfirmButton';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  // 프로필 스타일 적용 ================
  profileContainer: {
    flex: 3,
    width: DEVICE_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileBox: {
    margin: 10,
    width: DEVICE_WIDTH * 0.6,
    height: DEVICE_WIDTH * 0.6,
    borderColor: theme.mainColor.main,
    borderWidth: 5,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    height: DEVICE_WIDTH * 0.3,
    width: DEVICE_WIDTH * 0.3,
    borderRadius: 100,
    margin: DEVICE_HEIGHT * 0.01,
  },
  nickname: {
    fontSize: theme.fontSize.big,
    fontWeight: '600',
    marginBottom: DEVICE_HEIGHT * 0.01,
  },
  pointBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DEVICE_HEIGHT * 0.01,
  },
  pointCount: {
    fontSize: theme.fontSize.regular,
    marginLeft: 5,
  },
  chargePoint: {
    backgroundColor: theme.mainColor.main,
    width: DEVICE_WIDTH * 0.1,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeContainer: {
    backgroundColor: theme.mainColor.main,
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT * 0.65,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: DEVICE_HEIGHT * 0.15,
  },
  userIntro: {
    fontSize: theme.fontSize.regular,
    marginTop: DEVICE_HEIGHT * 0.05,
    position: 'absolute',
    bottom: DEVICE_HEIGHT * 0.54,
  },
  uniBadge: {
    backgroundColor: theme.textColor.white,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 5,
    width: DEVICE_WIDTH * 0.12,
    height: DEVICE_WIDTH * 0.12,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: DEVICE_WIDTH * 0.055,
  },
});
// =====================================

// 이것도...나중에 분리해야 하는 badge임.. ==============
type BadgeProps = {
  style?: StyleProp<ViewStyle>;
  id: number;
  num: number;
};

const Badge = ({ style, id, num }: BadgeProps) => (
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
  // 유저 아이디
  const loginUser: number = 1;

  const navigation = useNav();

  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const onPressBtn = () => {
    setIsUpdate((props) => !props);
  };

  const handleChargePoint = () => {
    console.log('포인트 충전 화면으로 푸슝');
    // navigation.push('PointCharge');
  };

  useEffect(() => {});

  return (
    <>
      {isUpdate ? (
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <View style={styles.profileBox}>
              <Image
                source={require('../../assets/images/sample.png')}
                style={styles.profileImage}
              />
              <Text style={styles.nickname}>김더미</Text>
              <View style={styles.pointBox}>
                <MaterialIcons
                  name='copyright'
                  size={24}
                  color={theme.mainColor.dark}
                />
                <Text style={styles.pointCount}>300,000</Text>
              </View>
              <TouchableOpacity
                style={styles.chargePoint}
                onPress={handleChargePoint}
                activeOpacity={0.6}
              >
                <Ionicons name='add' size={20} color={theme.mainColor.dark} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.badgeContainer}>
            <Text style={styles.userIntro}># 자기소개 # 이렇게쓰나 #몰루</Text>
          </View>
          <ConfirmButton onPressConfirmBtn={onPressBtn} />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <View style={styles.profileBox}>
              <Image
                source={require('../../assets/images/sample.png')}
                style={styles.profileImage}
              />
              <Text style={styles.nickname}>김더미</Text>
              <View style={styles.pointBox}>
                <MaterialIcons
                  name='copyright'
                  size={24}
                  color={theme.mainColor.dark}
                />
                <Text style={styles.pointCount}>300,000</Text>
              </View>
              <TouchableOpacity
                style={styles.chargePoint}
                onPress={handleChargePoint}
                activeOpacity={0.6}
              >
                <Ionicons name='add' size={20} color={theme.mainColor.dark} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.badgeContainer}>
            <Text style={styles.userIntro}># 자기소개 # 이렇게쓰나 # 몰루</Text>
            <FlatList
              data={badgeData}
              renderItem={({ item }) => (
                <Badge style={styles.uniBadge} id={item.id} num={item.num} />
              )}
              numColumns={3}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
          <ModifyButton onPressModifyBtn={onPressBtn} />
        </View>
      )}
    </>
  );
}
