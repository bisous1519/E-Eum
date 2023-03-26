import React from 'react';
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

export default function UpdateMypage(): JSX.Element {
  const navigation = useNav();

  const onPressBtn = () => {
    navigation.push('Mypage');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileBox}>
          <Image
            source={require('../../assets/images/sample.png')}
            style={styles.profileImage}
          />
          <Text style={styles.nickname}>민초현</Text>
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
      <Text style={styles.userIntro}>저는 하루에 세 번 헤헤</Text>
      <ModifyButton onPressModifyBtn={onPressBtn} />
    </View>
  );
}
