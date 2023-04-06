import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import theme from '../../utils/theme';
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
import InputComp from '../../components/common/input/InputComp';
import useInputText from '../../hooks/useInputText';
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
  emptyBox: {
    paddingBottom: DEVICE_HEIGHT * 0.15,
  },
  emptyText: {
    fontSize: theme.fontSize.regular,
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
  modifyInfo: {
    width: DEVICE_WIDTH * 0.6,
    position: 'absolute',
    bottom: DEVICE_HEIGHT * 0.14,
  },
  emptySpace: {
    padding: DEVICE_WIDTH * 0.06,
  },
});

export default function Mypage(): JSX.Element {
  // 유저 아이디
  const loginUser = useRecoilValue<LoginUserStateType>(loginUserState);
  const navigation = useNav();

  const { text: userIntro, onChangeText: setUserIntro } = useInputText();
  const { text: userGroup, onChangeText: setUserGroup } = useInputText();
  const { text: newPassword, onChangeText: setNewPassword } = useInputText();
  const { text: checkPassword, onChangeText: setCheckPassword } =
    useInputText();

  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [badge, setBadge] = useState<BadgeStateType>();
  const [badgeList, setBadgeList] =
    useRecoilState<BadgeStateType[]>(badgeListState);
  const [userProfile, setUserProfile] =
    useRecoilState<SponsorStateType>(sponsorState);
  const [recordProfile, setRecordProfile] =
    useRecoilState<RecordProfileStateType>(recordProfileState);

  const onPressModifyBtn = () => {
    setIsUpdate((prev) => !prev);
  };

  const onPressConfirmBtn = () => {
    setIsUpdate((props) => !props);
    updateProfile(loginUser.uid, {
      password: newPassword,
      introduction: userIntro,
      groupName: userGroup,
    });
  };

  const handleChargePoint = () => {
    navigation.push('PointCharge');
  };

  const handleBadgePress = (badge: BadgeStateType) => {
    setBadge(badge);
    setIsModal((prev) => !prev);
  };

  const handleModalClose = () => {
    setIsModal((prev) => !prev);
  };

  const fetchData = async () => {
    const badgeData: any = await getBadgeList(loginUser.uid);
    const userData: SponsorStateType | undefined = await getSponsorProfile(
      loginUser.uid,
      loginUser.uid
    );

    const profileData: RecordProfileStateType | undefined =
      await getProfileData(loginUser.uid);
    if (badgeData) {
      setBadgeList(badgeData.badgeList);
    }
    if (userData) {
      setUserProfile(userData);
    }
    if (profileData) {
      setRecordProfile(profileData);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userProfile.myPoint, recordProfile]);

  return (
    <>
      {isUpdate ? (
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <View style={styles.profileBox}>
              {recordProfile.imagePath ? (
                <Image
                  source={{ uri: recordProfile?.imagePath }}
                  style={styles.profileImage}
                />
              ) : (
                <Image
                  // 기본 이미지로 넣어둬
                  source={{ uri: 'https://i.stack.imgur.com/l60Hf.png' }}
                  style={styles.profileImage}
                />
              )}
              <Text style={styles.nickname}>{userProfile.nickname}</Text>
              <View style={styles.pointBox}>
                <MaterialIcons
                  name='copyright'
                  size={24}
                  color={theme.mainColor.dark}
                />
                <Text style={styles.pointCount}>{userProfile.myPoint}</Text>
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
            <View style={styles.modifyInfo}>
              <InputComp
                name={'자기소개'}
                text={userIntro}
                onChangeText={setUserIntro}
              />
              <View style={styles.emptySpace} />
              <InputComp
                name={'출신 보육원 및 소속'}
                text={userGroup}
                onChangeText={setUserGroup}
              />
              <InputComp
                name={'비밀번호'}
                text={newPassword}
                onChangeText={setNewPassword}
                pw={true}
              />
              <InputComp
                name={'비밀번호 확인'}
                text={checkPassword}
                onChangeText={setCheckPassword}
                pw={true}
              />
            </View>
          </View>
          <ConfirmButton onPressConfirmBtn={onPressConfirmBtn} />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <View style={styles.profileBox}>
              {recordProfile.imagePath ? (
                <Image
                  source={{ uri: recordProfile?.imagePath }}
                  style={styles.profileImage}
                />
              ) : (
                <Image
                  // 기본 이미지로 넣어둬
                  source={{ uri: 'https://i.stack.imgur.com/l60Hf.png' }}
                  style={styles.profileImage}
                />
              )}
              <Text style={styles.nickname}>{userProfile.nickname}</Text>
              <View style={styles.pointBox}>
                <MaterialIcons
                  name='copyright'
                  size={24}
                  color={theme.mainColor.dark}
                />
                <Text style={styles.pointCount}>{userProfile.myPoint}</Text>
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
            <Text style={styles.userIntro}>{recordProfile.introduction}</Text>
            {badgeList.length > 0 ? (
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
          <ModifyButton onPressModifyBtn={onPressModifyBtn} />
        </View>
      )}
    </>
  );
}
