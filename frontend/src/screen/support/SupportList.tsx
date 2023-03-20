import React from 'react';
import { Text, View, StyleSheet, FlatList, TextInput } from 'react-native';
import theme from '../../utils/theme';

// 나중에 다 분리하자.. ===================================================
// 후원 목록에서 보여줄 데이터: 임의의 JSON 데이터
const DATA = [
  {
    id: 1,
    nick: '1싸피',
    title: '개발자가 되고싶어요',
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
  <View style={styles.item}>
    <Text>{nick}</Text>
    <Text style={styles.title}>{title}</Text>
    <Text>목표금액</Text>
    <Text>{goal}원</Text>
  </View>
);
// ========================================================================

// 초기 꿈후원 목록 화면
export default function SupportList({ navigation }: any): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.tempContainer}>
        <Text
          style={{ color: 'red' }}
          onPress={() => navigation.push('SupportDetail')}
        >
          게시물 상세
        </Text>
        <Text
          style={{ color: 'red' }}
          onPress={() => navigation.push('NewSupport')}
        >
          신규 게시글
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
        key={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tempContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  item: {
    backgroundColor: theme.textColor.white,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 8,
    flex: 1,
  },
  title: {
    fontWeight: '300',
  },
});
