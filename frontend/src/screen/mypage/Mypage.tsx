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
import { getBadgeList, updateProfile } from '../../modules/apis/user/userApis';
import { BadgeStateType } from '../../modules/apis/user/userAtomTypes';
import { useRecoilState } from 'recoil';
import { badgeListState } from '../../modules/apis/user/userAtoms';
import InputComp from '../../components/common/input/InputComp';
import useInputText from '../../hooks/useInputText';
import { SupportProfileStateType } from '../../modules/apis/support/supportAtomTypes';
import { checkProfile } from '../../modules/apis/support/supportApis';

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
    fontSize: theme.fontSize.big,
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
  const loginUser: number = 1;
  const navigation = useNav();

  const { text: userIntro, onChangeText: setUserIntro } = useInputText();
  const { text: userGroup, onChangeText: setUserGroup } = useInputText();
  const { text: newPassword, onChangeText: setNewPassword } = useInputText();
  const { text: checkPassword, onChangeText: setCheckPassword } =
    useInputText();

  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [badgeList, setBadgeList] =
    useRecoilState<BadgeStateType[]>(badgeListState);

  const onPressModifyBtn = () => {
    setIsUpdate((props) => !props);
  };

  const onPressConfirmBtn = () => {
    setIsUpdate((props) => !props);
    updateProfile(loginUser, newPassword, userIntro, userGroup);
  };

  const handleChargePoint = () => {
    console.log('포인트 충전 화면으로 푸슝');
    navigation.push('PointCharge');
  };

  const handleBadgePress = () => {
    console.log('뱃지 디테일 API로 푸슝~');
  };

  const fetchData = async () => {
    const badgeData: BadgeStateType[] | undefined = await getBadgeList(
      loginUser
    );
    const userData: SupportProfileStateType | undefined = await checkProfile(
      loginUser
    );
    if (badgeData) {
      setBadgeList(badgeData);
    }
    if (userData) {
      // 로그인 유저의 이름 정보 받아와~~
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            <View style={styles.modifyInfo}>
              <InputComp
                name={'자기소개'}
                text={userIntro}
                onChangeText={setUserIntro}
              />
              <View style={styles.emptySpace}></View>
              <InputComp
                name={'출신 보육원 및 소속'}
                text={userGroup}
                onChangeText={setUserGroup}
              />
              <InputComp
                name={'비밀번호'}
                text={newPassword}
                onChangeText={setNewPassword}
                pw
                check
              />
              <InputComp
                name={'비밀번호 확인'}
                text={checkPassword}
                onChangeText={setCheckPassword}
                pw
                check
              />
            </View>
          </View>
          <ConfirmButton onPressConfirmBtn={onPressConfirmBtn} />
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
            <Text style={styles.userIntro}>{userIntro}</Text>
            {badgeList ? (
              <FlatList
                data={badgeList}
                renderItem={() => (
                  <TouchableOpacity
                    style={styles.uniBadge}
                    onPress={handleBadgePress}
                    activeOpacity={0.6}
                  >
                    <View>
                      {/* <Image
                        source={{
                          uri: 'https://firebasestorage.googleapis.com/v0/b/ardent-bulwark-380505.appspot.com/o/badge-image%2Fattend-1.png?alt=media',
                        }}
                      /> */}
                      <Text>1</Text>
                    </View>
                  </TouchableOpacity>
                  // <Badge style={styles.uniBadge} id={item.id} num={item.num} />
                )}
                numColumns={3}
                keyExtractor={(data) => data.id.toString()}
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
