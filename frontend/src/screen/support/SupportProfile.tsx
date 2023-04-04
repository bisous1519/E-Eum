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
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigator/SupportStack';
import { SupportProfileStateType } from '../../modules/apis/support/supportAtomTypes';
import { checkProfile } from '../../modules/apis/support/supportApis';
import { supportProfileState } from '../../modules/apis/support/supportAtoms';
import { useRecoilState } from 'recoil';
import ModalComp from '../../components/common/ModalComp';
import RegularSupportModal from '../../components/support/RegularSupportModal';

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
    padding: 10,
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
  supportBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DEVICE_HEIGHT * 0.01,
  },
  supportGuide: {
    fontSize: theme.fontSize.small,
    marginLeft: 5,
  },
  support: {
    backgroundColor: theme.mainColor.main,
    width: DEVICE_WIDTH * 0.2,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: DEVICE_WIDTH * 0.01,
  },
  supportText: {
    color: theme.textColor.white,
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

  // 정기후원 여부 검사
  const [onSupport, setOnSupport] = useState<boolean>(false);

  // 후원정보 입력 모달
  const [modal, setModal] = useState<boolean>(false);

  const getProfileData = async () => {
    const supportProfileData: SupportProfileStateType | undefined =
      await checkProfile(uid);
    if (supportProfileData) {
      setProfileData(supportProfileData);
    }
  };

  const handleSupportPress = () => {
    setOnSupport((prop) => !prop);
    if (!onSupport) {
      setModal(true);
    }
  };

  const handleToggleDelete = () => {
    setModal(false);
  };

  const handleSupportDone = () => {
    setOnSupport((prop) => !prop);
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <>
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
            {onSupport ? (
              <>
                <View style={styles.supportBox}>
                  <Text style={styles.supportGuide}>
                    꿈을 응원한 지 N일째 😀
                  </Text>
                </View>
                <Pressable style={styles.support} onPress={handleSupportPress}>
                  <Text style={styles.supportText}>후원중</Text>
                </Pressable>
              </>
            ) : (
              <>
                <View style={styles.supportBox}>
                  <Text style={styles.supportGuide}>
                    정기후원으로 {profileData.nickname}님의 꿈을 응원해주세요 🎉
                  </Text>
                </View>
                <Pressable style={styles.support} onPress={handleSupportPress}>
                  <Text style={styles.supportText}>후원하기</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
        <FlatList
          ListHeaderComponent={
            <Text style={styles.userIntro}>{profileData?.introduction}</Text>
          }
          contentContainerStyle={styles.badgeContainer}
          data={badgeData}
          renderItem={({ item }) => <Badge id={item.id} num={item.num} />}
          numColumns={3}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      {modal ? (
        <RegularSupportModal onToggleDelete={handleToggleDelete} />
      ) : null}
    </>
  );
}
