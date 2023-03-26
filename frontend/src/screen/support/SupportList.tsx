import React from 'react';
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
  // 후원 카드에 표시되는 '제목'
  title: {
    height: 50,
    fontWeight: '700',
  },
  // 목표금액, 달성률 -> 연한 회색 제목
  lightTitle: {
    color: theme.textColor.light,
  },
  // 프로필 사진
  image: {
    width: 45,
    height: 45,
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
  progress: {},
});

// 나중에 다 분리하자.. ===================================================
// 후원 목록에서 보여줄 데이터: 임의의 JSON 데이터
const DATA = [
  {
    id: 1,
    nick: '1싸피',
    title: '개발자가 되고싶어요 길어지면 어케되누',
    goal: 110000,
  },
  {
    id: 2,
    nick: '2싸피',
    title: '개발자가 되고싶어요',
    goal: 110000,
  },
  {
    id: 3,
    nick: '3싸피',
    title: '개발자가 되고싶어요',
    goal: 110000,
  },
  {
    id: 4,
    nick: '4싸피',
    title: '개발자가 되고싶어요',
    goal: 110000,
  },
  {
    id: 5,
    nick: '5싸피',
    title: '개발자가 되고싶어요',
    goal: 110000,
  },
  {
    id: 6,
    nick: '6싸피',
    title: '개발자가 되고싶어요',
    goal: 110000,
  },
  {
    id: 7,
    nick: '7싸피',
    title: '개발자가 되고싶어요',
    goal: 110000,
  },
  {
    id: 8,
    nick: '8싸피',
    title: '개발자가 되고싶어요',
    goal: 110000,
  },
  {
    id: 9,
    nick: '9싸피',
    title: '개발자가 되고싶어요',
    goal: 110000,
  },
  {
    id: 10,
    nick: '10싸피',
    title: '개발자가 되고싶어요',
    goal: 110000,
  },
  {
    id: 11,
    nick: '11싸피',
    title: '개발자가 되고싶어요',
    goal: 110000,
  },
];

// 각 아이템(목록 데이터) 요소의 타입 지정
type ItemProps = {
  id: number;
  nick: string;
  title: string;
  goal: number;
};

// 각 카드를 어떻게 보여줄지 설정
const Item = ({ id, nick, title, goal }: ItemProps) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => console.log('디테일 스크린이 까꿍')}
    activeOpacity={0.6}
  >
    <View>
      <View style={styles.profile}>
        <Image
          source={require('../../assets/images/sample.png')}
          style={styles.image}
        />
        <Text>{nick}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.goal}>
        <Text style={styles.lightTitle}>목표금액</Text>
        <Text>{goal}원</Text>
      </View>
      <View style={styles.progress}>
        <Text style={styles.lightTitle}>달성률</Text>
        <Progress.Bar
          progress={0.65}
          width={null}
          height={5}
          color={theme.mainColor.main}
        />
      </View>
    </View>
  </TouchableOpacity>
);
// ========================================================================

// 초기 꿈후원 목록 화면
export default function SupportList(): JSX.Element {
  const navigation = useNav();

  const onPressPlusBtn = () => {
    navigation.push('NewSupport');
  };

  return (
    <View style={styles.container}>
      <View style={styles.tempContainer}>
        <Text
          style={{ color: 'red' }}
          onPress={() => navigation.push('SupportDetail')}
        >
          게시물 상세
        </Text>
      </View>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            nick={item.nick}
            title={item.title}
            goal={item.goal}
          />
        )}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        // key={2} // 당신..뭔데..?ㅋㅋㅋ
      />
      <PlusButton onPressPlusBtn={onPressPlusBtn} />
    </View>
  );
}
