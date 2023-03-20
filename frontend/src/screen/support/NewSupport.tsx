import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import theme from '../../utils/theme';

// 신규 게시물
export default function NewSupport(): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const [context, setContext] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [goal, setGoal] = useState<number>(0);
  // 날짜 type은 string?? number??
  //   const [due, setDue] = useState<string>(Date.now());

  return (
    <ScrollView style={styles.container}>
      {/* 1. 제목 */}
      <View style={styles.write}>
        <Text>제목</Text>
        <TextInput
          placeholder='제목을 입력하세요'
          onChangeText={(e) => setTitle(e)}
        />
      </View>

      {/* 2. 내용 */}
      <View style={styles.write}>
        <Text>내용</Text>
        {/* TextInput 말고 에디터 API 갖다 쓰자..! */}
        <TextInput
          style={{ height: 100 }}
          placeholder='내용을 입력하세요'
          onChangeText={(e) => setTitle(e)}
        />
      </View>

      {/* 3. 구매링크 */}
      <View style={styles.write}>
        <View style={styles.guideline}>
          <Text>구매링크</Text>
          <Text style={{ fontSize: 8, marginLeft: 5 }}>
            * 후원받으려는 물품의 구매 링크를 입력해주세요
          </Text>
        </View>
        <TextInput
          placeholder='구매링크를 입력하세요'
          onChangeText={(e) => setTitle(e)}
        />
      </View>

      {/* 4. 목표금액 */}
      <View style={styles.write}>
        <Text>목표금액</Text>
        <TextInput
          placeholder='목표금액을 입력하세요'
          onChangeText={(e) => setTitle(e)}
        />
      </View>

      {/* 5. 사진첨부 */}
      <View style={styles.write}>
        <View style={styles.guideline}>
          <Text>사진첨부</Text>
          <Text style={{ fontSize: 8, marginLeft: 5 }}>
            * 최대 5개까지 첨부 가능합니다
          </Text>
        </View>
        {/* 이곳에 image picker를 쓰고 싶은디..? */}
      </View>

      {/* 6. 마감기한 */}
      <View style={styles.write}>
        <Text>마감기한</Text>
        {/* 이곳에는 date picker를 쓰고 싶은디..! */}
      </View>

      {/* 000. 등록버튼 */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  write: {
    color: theme.textColor.light,
    marginVertical: 10,
    marginHorizontal: 20,
    borderBottomColor: theme.mainColor.light,
    borderBottomWidth: 2,
  },
  guideline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
