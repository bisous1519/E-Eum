import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
} from 'react-native';
import sample from '../../assets/images/sample.png';
import theme from '../../utils/theme';

// 후원 상세
export default function SupportDetail(): JSX.Element {
  return (
    <ScrollView style={styles.container}>
      <Image style={styles.picture} source={sample} />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>개발자가 되고 싶어요</Text>
        <View>
          <Text style={styles.contentTitle}>후원 요청 내용</Text>
          <Text style={styles.etc}>인강사이트 개발자 강의 수강권</Text>
          {/* 버튼 들어가실게요~~ */}
          <Button title='참고링크'>참고링크</Button>
        </View>

        <View>
          <Text style={styles.contentTitle}>후원 요청 기간</Text>
          <Text style={styles.etc}>2023.03.20 ~ 2023.04.01</Text>
        </View>

        <View>
          <Text style={styles.contentTitle}>목표 금액</Text>
          <Text style={styles.etc}>110,000원</Text>
        </View>

        <View>
          <Text style={styles.contentTitle}>달성률</Text>
          {/* 달성률 막대바 표시하기 */}
        </View>

        <View>
          <Text style={styles.contentTitle}>후원자</Text>
          {/* 후원자 프로필 사진 모아서 보여주기 */}
        </View>

        {/* 여기는 이제.. 글쓴이 프로필로 가는 버튼 */}

        <Text style={styles.etc}>
          안녕하세요 저는 누구누군데 이런 꿈을 갖고 있는데 강의 듣고 싶은데 돈은
          없는데 열심히 할건데..
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    marginVertical: 15,
    marginHorizontal: 20,
    alignItems: 'flex-start',
  },
  picture: {
    height: 230,
    resizeMode: 'cover',
  },
  title: {
    fontSize: theme.fontSize.regular,
    fontWeight: theme.fontWeight.bold,
  },
  contentTitle: {
    color: theme.textColor.light,
  },
  etc: {
    fontWeight: theme.fontWeight.regular,
  },
});
