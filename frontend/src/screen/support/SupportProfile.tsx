import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
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
import {
  SupportProfileStateType,
  SupportStatusStateType,
} from '../../modules/apis/support/supportAtomTypes';
import {
  checkProfile,
  stopSupport,
  supportStatus,
} from '../../modules/apis/support/supportApis';
import {
  supportProfileState,
  supportStatusState,
} from '../../modules/apis/support/supportAtoms';
import ModalComp from '../../components/common/ModalComp';
import RegularSupportModal from '../../components/support/RegularSupportModal';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ModifyButton from '../../components/common/ModifyButton';
import useNav from '../../hooks/useNav';
import ConfirmButton from '../../components/common/ConfirmButton';
import {
  getBadgeList,
  getSponsorProfile,
  updateProfile,
} from '../../modules/apis/user/userApis';
import {
  BadgeStateType,
  LoginUserStateType,
  SponsorStateType,
} from '../../modules/apis/user/userAtomTypes';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  badgeListState,
  loginUserState,
  sponsorState,
} from '../../modules/apis/user/userAtoms';
import Badge from '../../components/common/Badge';
import { RecordProfileStateType } from '../../modules/apis/record/recordAtomTypes';
import { getProfileData } from '../../modules/apis/record/recordApis';
import { recordProfileState } from '../../modules/apis/record/recordAtoms';
import BadgeModal from '../../components/support/BadgeModal';

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
    height: DEVICE_WIDTH * 0.63,
    borderColor: theme.mainColor.main,
    borderWidth: 5,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  profileImage: {
    height: DEVICE_WIDTH * 0.25,
    width: DEVICE_WIDTH * 0.25,
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
    textAlign: 'center',
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
    backgroundColor: theme.mainColor.light,
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
    borderRadius: 5,
    width: DEVICE_WIDTH * 0.12,
    height: DEVICE_WIDTH * 0.12,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: DEVICE_WIDTH * 0.055,
  },
  emptySpace: {
    padding: DEVICE_WIDTH * 0.06,
  },
  emptyBox: {
    paddingBottom: DEVICE_HEIGHT * 0.15,
  },
  emptyText: {
    fontSize: theme.fontSize.big,
  },
});
// ======================================================

export default function SupportProfile(): JSX.Element {
  // 로그인 유저 id
  const loginUser = useRecoilValue<LoginUserStateType>(loginUserState);

  const route = useRoute<RouteProp<RootStackParamList, 'SupportProfile'>>();
  const uid = route.params?.uid; // 작성자(자립준비청년) id

  // 기본적인 프로필 정보
  const [userProfile, setUserProfile] =
    useRecoilState<SupportProfileStateType>(supportProfileState);

  // 정기후원 여부 확인을 위한 정보
  const [supportData, setSupportData] =
    useRecoilState<SupportStatusStateType>(supportStatusState);

  // 뱃지 정보
  const [badge, setBadge] = useState<BadgeStateType>();
  const [badgeList, setBadgeList] =
    useRecoilState<BadgeStateType[]>(badgeListState);

  // 후원정보 입력 모달
  const [modal, setModal] = useState<boolean>(false);

  const fetchData = () => {
    checkProfile(uid).then((data) => setUserProfile(data));
    getBadgeList(uid).then((data) => setBadgeList(data));
    supportStatus(uid, loginUser.uid).then((data) => setSupportData(data));
  };

  const handleStopSupport = () => {
    stopSupport(uid, loginUser.uid);
    // setModal(true);
    console.log('stop응애');
  };

  const handleStartSupport = () => {
    // regularSupport(uid, loginUser.uid);
    setModal(true);
    console.log('start응애');
  };

  const handleToggleDelete = () => {
    setModal(false);
  };

  const handleBadgePress = (badge: BadgeStateType) => {
    setBadge(badge);
    setModal((prev) => !prev);
  };

  useEffect(() => {
    fetchData();
  }, [supportData]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.profileBox}>
            {userProfile.imagePath ? (
              <Image
                source={{ uri: userProfile?.imagePath }}
                style={styles.profileImage}
              />
            ) : (
              <Image
                // 기본 이미지로 넣어둬
                source={{ uri: 'https://i.stack.imgur.com/l60Hf.png' }}
                style={styles.profileImage}
              />
            )}
            <Text style={styles.nickname}>{userProfile?.nickname}</Text>
            {supportData.isConnected ? (
              <>
                <View style={styles.supportBox}>
                  <Text style={styles.supportGuide}>
                    꿈을 응원한 지 {supportData.countFromRegDate}일째 😀
                  </Text>
                </View>
                <Pressable style={styles.support} onPress={handleStopSupport}>
                  <Text style={styles.supportText}>후원중</Text>
                </Pressable>
              </>
            ) : (
              <>
                <View style={styles.supportBox}>
                  <Text style={styles.supportGuide}>
                    정기후원으로 {userProfile.nickname}님의 꿈을 응원해주세요 🎉
                  </Text>
                </View>
                <Pressable style={styles.support} onPress={handleStartSupport}>
                  <Text style={styles.supportText}>후원하기</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
        <View style={styles.badgeContainer}>
          <Text style={styles.userIntro}>{userProfile.introduction}</Text>
          {badgeList ? (
            <FlatList
              data={badgeList}
              renderItem={(badge) => (
                <TouchableOpacity
                  style={styles.uniBadge}
                  onPress={() => handleBadgePress(badge.item)}
                  activeOpacity={0.6}
                >
                  <Badge key={badge.item.id} badge={badge.item} />
                </TouchableOpacity>
              )}
              numColumns={3}
            />
          ) : (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>뱃지를 수집중입니다 👊</Text>
            </View>
          )}
        </View>
      </View>
      {modal && <RegularSupportModal onToggleDelete={handleToggleDelete} />}
    </>
  );
}
