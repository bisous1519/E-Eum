import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import theme from '../../utils/theme';

// 나중에 다 분리하자.. ===================================================
// 후원 목록에서 보여줄 데이터: 임의의 JSON 데이터
const DATA = [
  {
    nick: '1싸피',
    title: '개발자가 되고싶어요',
    goal: 110000,
  },
  {
    nick: '2싸피',
    title: '개발자가 되고싶어요',
    goal: 110000,
  },
  {
    nick: '3싸피',
    title: '개발자가 되고싶어요',
    goal: 110000,
  },
  {
    nick: '4싸피',
    title: '개발자가 되고싶어요',
    goal: 110000,
  },
  {
    nick: '5싸피',
    title: '개발자가 되고싶어요',
    goal: 110000,
  },
  {
    nick: '6싸피',
    title: '개발자가 되고싶어요',
    goal: 110000,
  },
  {
    nick: '7싸피',
    title: '개발자가 되고싶어요',
    goal: 110000,
  },
  {
    nick: '8싸피',
    title: '개발자가 되고싶어요',
    goal: 110000,
  },
  {
    nick: '9싸피',
    title: '개발자가 되고싶어요',
    goal: 110000,
  },
  {
    nick: '10싸피',
    title: '개발자가 되고싶어요',
    goal: 110000,
  },
];

// 각 아이템(목록 데이터) 요소의 타입 지정
type ItemProps = {
  nick: string;
  title: string;
  goal: number;
};

// 각 카드를 어떻게 보여줄지 설정
const Item = ({ nick, title, goal }: ItemProps) => (
  <View style={styles.item}>
    <Text>{nick}</Text>
    <Text>{title}</Text>
    <Text>목표금액</Text>
    <Text>{goal}원</Text>
  </View>
);
// ========================================================================

// 초기 꿈후원 목록 화면
export default function SupportList({ navigation }: any): JSX.Element {
  return (
    <View style={styles.container}>
      {/* <Text
        style={{ color: 'red' }}
        onPress={() => navigation.push('SupportDetail')}
      >
        후원 목록
      </Text> */}
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item nick={item.nick} title={item.title} goal={item.goal} />
        )}
        numColumns={2}
        keyExtractor={(item) => item.nick}
        key={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: theme.textColor.white,
    padding: 20,
    // margin: 8,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 8,
    flex: 1,
  },
  title: {
    fontWeight: '300',
  },
});
