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
import { TouchableOpacity } from 'react-native-gesture-handler';
import sample from '../../assets/images/sample.png';
import theme from '../../utils/theme';
import * as Progress from 'react-native-progress';
import { MaterialIcons } from '@expo/vector-icons';

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
          <TouchableOpacity
            onPress={() => console.log('링크가 까꿍')}
            activeOpacity={0.6}
            style={styles.productLink}
          >
            {/* 여기 링크로 연결해줘야함 */}
            <Text style={styles.linkText}>참고링크</Text>
          </TouchableOpacity>
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
          <View style={styles.goalBar}>
            <Progress.Bar
              progress={60 / 100}
              width={280}
              height={10}
              color={theme.mainColor.main}
            />
            <Text>60%</Text>
          </View>
        </View>

        <View>
          <Text style={styles.contentTitle}>후원자</Text>
          {/* 후원자 프로필 사진 모아서 보여주기 */}
        </View>

        {/* 여기는 이제.. 글쓴이 프로필로 가는 버튼 */}
        <TouchableOpacity
          onPress={() => console.log('프로필이 까꿍')}
          activeOpacity={0.6}
        >
          <View style={styles.writerTag}>
            <Image source={sample} style={styles.writerPicture} />
            <View>
              <Text style={styles.writerName}>나싸피임</Text>
              <Text style={styles.writerIntro}>나는 있잖아요..</Text>
            </View>
            <MaterialIcons name='arrow-forward-ios' size={24} color='black' />
          </View>
        </TouchableOpacity>

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
  },
  picture: {
    height: 230,
    alignItems: 'stretch',
  },
  title: {
    fontSize: theme.fontSize.regular,
    fontWeight: theme.fontWeight.bold,
  },
  productLink: {
    backgroundColor: theme.mainColor.main,
    borderRadius: 15,
    padding: 5,
    width: 100,
  },
  contentTitle: {
    color: theme.textColor.light,
  },
  linkText: {
    fontSize: theme.fontSize.small,
  },
  etc: {
    fontWeight: theme.fontWeight.regular,
  },
  writerTag: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 340,
    backgroundColor: theme.mainColor.main,
    padding: 20,
    borderRadius: 10,
  },
  writerName: {
    fontWeight: theme.fontWeight.bold,
  },
  writerIntro: {
    color: theme.textColor.light,
  },
  writerPicture: {
    width: 45,
    height: 45,
    borderRadius: 30,
    marginRight: 10,
  },
  goalBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
