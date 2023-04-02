import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import theme from '../../utils/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ModifyButton from '../../components/common/ModifyButton';
import useNav from '../../hooks/useNav';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigator/SupportStack';
import { SupportProfileStateType } from '../../modules/apis/support/supportAtomTypes';
import { checkProfile } from '../../modules/apis/support/supportApis';
import { supportProfileState } from '../../modules/apis/support/supportAtoms';
import { useRecoilState } from 'recoil';

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
  },
  // ====================================
  // 뱃지 스타일 적용 ===================
  badgeContainer: {
    backgroundColor: theme.mainColor.main,
    width: DEVICE_WIDTH,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userIntro: {
    fontSize: theme.fontSize.regular,
    marginTop: DEVICE_HEIGHT * 0.05,
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

export default function SupportProfile(): JSX.Element {
  const route = useRoute<RouteProp<RootStackParamList, 'SupportProfile'>>();
  const uid = route.params?.uid;

  // 기본적인 프로필 정보
  const [profileData, setProfileData] =
    useRecoilState<SupportProfileStateType>(supportProfileState);

  // 뱃지 정보
  const [profileBadge, setProfileBadge] = useState<number>();

  const getProfileData = async () => {
    const supportProfileData: SupportProfileStateType | undefined =
      await checkProfile(uid);
    if (supportProfileData) {
      setProfileData(supportProfileData);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileBox}>
          <Image
            style={styles.profileImage}
            source={require('../../assets/images/sample.png')}
            // source={
            //   profileData.imagePath ? require(profileData.imagePath) : null
            // }
          />
          <Text style={styles.nickname}>{profileData?.nickname}</Text>
          <View style={styles.pointBox}>
            <MaterialIcons
              name='copyright'
              size={24}
              color={theme.mainColor.dark}
            />
            <Text style={styles.pointCount}>300,000</Text>
          </View>
          <Pressable
            style={styles.chargePoint}
            onPress={() => console.log('포인트 충전으로 푸슝')}
          >
            <Ionicons name='add' size={20} color={theme.mainColor.dark} />
          </Pressable>
        </View>
      </View>
      <FlatList
        ListHeaderComponent={
          <Text style={styles.userIntro}>{profileData?.introduction}</Text>
        }
        contentContainerStyle={styles.badgeContainer}
        data={badgeData}
        renderItem={({ item }) => (
          <Badge style={styles.uniBadge} id={item.id} num={item.num} />
        )}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
