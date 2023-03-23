import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Dimensions,
  Pressable,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// 여기저기 쓸 이미지 파일
import sample from '../../assets/images/sample.png';
import theme from '../../utils/theme';
// Progress Bar
import * as Progress from 'react-native-progress';
// 프로필 이동 컴포넌트의 '>' 아이콘
import { MaterialIcons } from '@expo/vector-icons';
// URL Linking
import * as Linking from 'expo-linking';
import SupportButton from '../../components/support/SupportButton';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

// 후원 상세
export default function SupportDetail(): JSX.Element {
  const link = () => {
    Linking.openURL('https://www.naver.com/');
  };

  const onPressSupportBtn = () => {
    console.log('후원글 작성 API 푸슝');
  };

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.picture} source={sample} resizeMode='cover' />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>개발자가 되고 싶어요</Text>
        <View style={styles.group}>
          <Text style={styles.contentTitle}>후원 요청 내용</Text>
          <Text style={styles.content}>인강사이트 개발자 강의 수강권</Text>
          <TouchableOpacity
            onPress={() => link()}
            activeOpacity={0.6}
            style={styles.productLink}
          >
            <Text style={styles.linkText}>참고링크</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.group}>
          <Text style={styles.contentTitle}>후원 요청 기간</Text>
          <Text style={styles.content}>2023.03.20 ~ 2023.04.01</Text>
        </View>

        <View style={styles.group}>
          <Text style={styles.contentTitle}>목표 금액</Text>
          <Text style={styles.content}>110,000원</Text>
        </View>

        <View style={styles.group}>
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

        <View style={styles.group}>
          <Text style={styles.contentTitle}>후원자</Text>
          {/* 후원자 프로필 사진 모아서 보여주기 */}
        </View>

        {/* 여기는 이제.. 글쓴이 프로필로 가는 버튼 */}
        <View style={styles.group}>
          <TouchableOpacity
            onPress={() => console.log('프로필이 까꿍')}
            activeOpacity={0.6}
          >
            <View style={styles.writerTag}>
              <Image source={sample} style={styles.writerPicture} />
              <View>
                <Text style={styles.writerName}>홍싸피</Text>
                <Text style={styles.writerIntro}>나는 있잖아요..</Text>
              </View>
              <MaterialIcons name='arrow-forward-ios' size={24} color='black' />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.group}>
          <Text style={styles.mainContent}>
            {`안녕하세요 저는 누구누군데 이런 꿈을 갖고 있는데 강의 듣고 싶은데 돈은 없는데 열심히 할건데.. 이거 어떻게 들어가는데..??
            
            
줄바꿈 테스트임...
이거 맞는거야?
            
일단은 그냥 해보지 뭐...
            
이부분은 스크롤 테스트임...으아아아
안녕하세요 저는 누구누군데 이런 꿈을 갖고 있는데 강의 듣고 싶은데 돈은 없는데 열심히 할건데.. 이거 어떻게 들어가는데..??
안녕하세요 저는 누구누군데 이런 꿈을 갖고 있는데 강의 듣고 싶은데 돈은 없는데 열심히 할건데.. 이거 어떻게 들어가는데..??`}
          </Text>
        </View>
      </View>
      <SupportButton onPressSupportBtn={onPressSupportBtn} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    width: DEVICE_WIDTH * 0.9,
    marginVertical: 15,
    marginHorizontal: 20,
    fontSize: theme.fontSize.regular,
  },
  group: {
    marginVertical: DEVICE_HEIGHT * 0.01,
  },
  picture: {
    height: DEVICE_HEIGHT * 0.25,
    width: DEVICE_WIDTH,
    alignItems: 'stretch',
  },
  title: {
    fontWeight: theme.fontWeight.bold,
  },
  productLink: {
    backgroundColor: theme.mainColor.main,
    borderRadius: 15,
    paddingVertical: 3,
    paddingHorizontal: 20,
    width: DEVICE_WIDTH * 0.25,
    alignItems: 'center',
    marginTop: 3,
  },
  contentTitle: {
    color: theme.textColor.light,
  },
  linkText: {
    fontSize: theme.fontSize.small,
  },
  content: {
    fontWeight: theme.fontWeight.regular,
  },
  writerTag: {
    flexDirection: 'row',
    alignItems: 'center',
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
  mainContent: {
    marginHorizontal: 10,
  },
});
