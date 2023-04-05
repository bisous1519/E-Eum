import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import theme from '../../utils/theme';
import * as Progress from 'react-native-progress';
import PlusButton from '../../components/common/PlusButton';
import useNav from '../../hooks/useNav';
import { getSupports } from '../../modules/apis/support/supportApis';
import { useRecoilState } from 'recoil';
import { SupportsStateType } from '../../modules/apis/support/supportAtomTypes';
import {
  sortType,
  supportsState,
} from '../../modules/apis/support/supportAtoms';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigator/SupportStack';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  // 화면 전체에 적용
  container: {
    flex: 1,
    fontSize: theme.fontSize.regular,
  },
  // navigating을 위해 잠시 사용
  tempContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  // 개별 후원 카드
  item: {
    flex: 1,
    backgroundColor: theme.textColor.white,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 15,
  },
  // 제목을 감싸는 태그
  titleBox: {
    marginVertical: DEVICE_HEIGHT * 0.005,
    height: DEVICE_HEIGHT * 0.05,
    justifyContent: 'center',
  },
  // 후원 카드에 표시되는 '제목'
  title: {
    fontWeight: '700',
  },
  // 목표금액, 달성률 -> 연한 회색 제목
  lightTitle: {
    color: theme.textColor.light,
    marginVertical: DEVICE_HEIGHT * 0.005,
  },
  // 프로필 사진
  image: {
    width: DEVICE_WIDTH * 0.11,
    height: DEVICE_WIDTH * 0.11,
    borderRadius: 30,
    marginRight: 8,
  },
  // 사진과 이름을 묶은 스타일
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // 목표금액: 제목 및 금액
  goal: {},
  // 달성률: 제목 및 그래프
  progress: {
    marginVertical: DEVICE_HEIGHT * 0.015,
  },
});

// 각 아이템(목록 데이터) 요소의 타입 지정
type ItemProps = {
  sid: number;
  userNickname: string;
  title: string;
  targetAmount: number;
  achievementRate: number;
};

// 각 카드를 어떻게 보여줄지 설정
const Item = ({
  sid,
  userNickname,
  title,
  targetAmount,
  achievementRate,
}: ItemProps) => (
  <View style={styles.container}>
    <View style={styles.profile}>
      <Image
        source={require('../../assets/images/sample.png')}
        style={styles.image}
      />
      <Text>{userNickname}</Text>
    </View>
    <View style={styles.titleBox}>
      <Text style={styles.title}>{title}</Text>
    </View>
    <View style={styles.goal}>
      <Text style={styles.lightTitle}>목표금액</Text>
      <Text>{targetAmount}원</Text>
    </View>
    <View style={styles.progress}>
      <Text style={styles.lightTitle}>달성률</Text>
      <Progress.Bar
        progress={achievementRate}
        width={null}
        height={5}
        color={theme.mainColor.main}
      />
    </View>
  </View>
);
// ========================================================================

// 초기 꿈후원 목록 화면
export default function SupportList(): JSX.Element {
  const [supports, setSupports] =
    useRecoilState<SupportsStateType>(supportsState);

  // 정렬 기준
  const [sort, setSort] = useRecoilState<number>(sortType);

  const navigation = useNav();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onPressDetail = (sid: number) => {
    nav.navigate('SupportDetail', { sid: sid });
  };

  const onPressPlusBtn = () => {
    navigation.push('NewSupport');
  };

  const fetchData = async () => {
    const supportsData: SupportsStateType | undefined = await getSupports(sort);
    if (supportsData) {
      setSupports(supportsData);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sort, supports]);

  return (
    <View style={styles.container}>
      <FlatList
        data={supports}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => onPressDetail(item.sid)}
            activeOpacity={0.6}
            key={item.sid}>
            <Item
              sid={item.sid}
              userNickname={item.userNickname}
              title={item.title}
              targetAmount={item.targetAmount}
              achievementRate={item.achievementRate / 100}
              key={item.sid}
            />
          </TouchableOpacity>
        )}
        numColumns={2}
      />
      <PlusButton onPressPlusBtn={onPressPlusBtn} />
    </View>
  );
}
