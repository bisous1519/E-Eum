import React, { useCallback, useMemo, useRef, useState } from 'react';
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
import theme from '../../utils/theme';
// Progress Bar
import * as Progress from 'react-native-progress';
// 프로필 이동 컴포넌트의 '>' 아이콘
import { MaterialIcons } from '@expo/vector-icons';
// URL Linking
import * as Linking from 'expo-linking';
// 후원하기 버튼
import SupportButton from '../../components/support/SupportButton';
// 후원금 잔액 부족 모달 - DeleteModal로 테스트 =============
import DeleteModal from '../../components/record/DeleteModal';
import ChargeAlertModal from '../../components/support/ChargeAlertModal';
import SupportModal from '../../components/support/SupportModal';
// ===========================================================

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    width: DEVICE_WIDTH * 0.9,
    marginVertical: 15,
    marginHorizontal: 20,
    fontSize: theme.fontSize.regular,
    marginBottom: 70,
  },
  group: {
    marginVertical: DEVICE_HEIGHT * 0.01,
  },
  picture: {
    height: DEVICE_HEIGHT * 0.3,
    width: DEVICE_WIDTH,
    alignItems: 'stretch',
  },
  title: {
    fontSize: theme.fontSize.big,
    fontWeight: '700',
  },
  productLink: {
    backgroundColor: theme.mainColor.main,
    borderRadius: 15,
    paddingVertical: DEVICE_HEIGHT * 0.007,
    width: DEVICE_WIDTH * 0.25,
    alignItems: 'center',
    marginTop: 3,
  },
  contentTitle: {
    color: theme.textColor.light,
    marginBottom: DEVICE_HEIGHT * 0.01,
  },
  linkText: {
    fontSize: theme.fontSize.small,
  },
  content: {
    fontWeight: '400',
  },
  writerTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.mainColor.main,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  leftProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftText: {
    marginLeft: DEVICE_WIDTH * 0.015,
  },
  writerName: {
    fontWeight: '700',
  },
  writerIntro: {
    color: theme.textColor.light,
  },
  profilePicture: {
    width: 45,
    height: 45,
    borderRadius: 30,
    marginHorizontal: DEVICE_WIDTH * 0.01,
  },
  goalBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  mainContent: {
    marginHorizontal: 10,
  },
  // 여기는 모달 스타일
  modalContainer: {
    flex: 1,
    backgroundColor: theme.layerColor,
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    position: 'absolute',
  },
  modalSpace: {
    backgroundColor: theme.layerColor,
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT * 0.3,
    justifyContent: 'flex-start',
  },
  supportModal: {
    backgroundColor: theme.textColor.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT * 0.7,
  },
});

// 후원 상세
export default function SupportDetail(): JSX.Element {
  const link = () => {
    Linking.openURL('https://www.naver.com/');
  };

  const handleSupporterClick = () => {
    console.log('후원자 프로필로 푸슝');
  };
  // ============================================================================

  // 1. writer 정보 중 point 정보를 받아와서 if (point === 0) 충전화면
  // 2. else인 경우 후원금액 입력 bottom sheet

  // 실제 후원을 할 수 있는 모달
  const [supportModal, setSupportModal] = useState<boolean>(false);

  // 잔액이 부족할 때 뜨는 모달
  const [chargeModal, setChargeModal] = useState<boolean>(false);

  // 후원버튼을 눌렀을 때의 작업
  const onPressSupportBtn = () => {
    // 사용자 포인트 잔고가 있으면 setSupportModal(true);
    // 사용자 포인트 잔고가 없으면 setChargeModal(true);
    setSupportModal(true);
    console.log('후원금액을 입력받는 모달이 푸슝~');
  };

  // 모달 밖의 화면을 눌렀을 때의 작업
  const onToggleDelete = () => {
    setSupportModal(false); // 요건 후원화면
    setChargeModal(false); // 요건 충전권고화면
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Image
          style={styles.picture}
          source={require('../../assets/images/sample.png')}
          resizeMode='cover'
        />
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
                width={DEVICE_WIDTH * 0.8}
                height={DEVICE_HEIGHT * 0.025}
                color={theme.mainColor.main}
              />
              <Text>60%</Text>
            </View>
          </View>

          <View style={styles.group}>
            <Text style={styles.contentTitle}>후원자</Text>
            {/* 후원자 프로필 사진 모아서 보여주기 */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* 지금은 그냥 이미지 나열이지만 실제로는 리스트를 만들거야 */}
              <Pressable onPress={handleSupporterClick}>
                <Image
                  source={require('../../assets/images/sample.png')}
                  style={styles.profilePicture}
                />
              </Pressable>
              <Pressable onPress={handleSupporterClick}>
                <Image
                  source={require('../../assets/images/sample.png')}
                  style={styles.profilePicture}
                />
              </Pressable>
              <Pressable onPress={handleSupporterClick}>
                <Image
                  source={require('../../assets/images/sample.png')}
                  style={styles.profilePicture}
                />
              </Pressable>
              <Pressable onPress={handleSupporterClick}>
                <Image
                  source={require('../../assets/images/sample.png')}
                  style={styles.profilePicture}
                />
              </Pressable>
              <Pressable onPress={handleSupporterClick}>
                <Image
                  source={require('../../assets/images/sample.png')}
                  style={styles.profilePicture}
                />
              </Pressable>
              <Pressable onPress={handleSupporterClick}>
                <Image
                  source={require('../../assets/images/sample.png')}
                  style={styles.profilePicture}
                />
              </Pressable>
              <Pressable onPress={handleSupporterClick}>
                <Image
                  source={require('../../assets/images/sample.png')}
                  style={styles.profilePicture}
                />
              </Pressable>
              <Pressable onPress={handleSupporterClick}>
                <Image
                  source={require('../../assets/images/sample.png')}
                  style={styles.profilePicture}
                />
              </Pressable>
              <Pressable onPress={handleSupporterClick}>
                <Image
                  source={require('../../assets/images/sample.png')}
                  style={styles.profilePicture}
                />
              </Pressable>
              <Pressable onPress={handleSupporterClick}>
                <Image
                  source={require('../../assets/images/sample.png')}
                  style={styles.profilePicture}
                />
              </Pressable>
              <Pressable onPress={handleSupporterClick}>
                <Image
                  source={require('../../assets/images/sample.png')}
                  style={styles.profilePicture}
                />
              </Pressable>
              <Pressable onPress={handleSupporterClick}>
                <Image
                  source={require('../../assets/images/sample.png')}
                  style={styles.profilePicture}
                />
              </Pressable>
              <Pressable onPress={handleSupporterClick}>
                <Image
                  source={require('../../assets/images/sample.png')}
                  style={styles.profilePicture}
                />
              </Pressable>
            </ScrollView>
          </View>

          {/* 여기는 이제.. 글쓴이 프로필로 가는 버튼 */}
          <View style={styles.group}>
            <TouchableOpacity
              onPress={() => console.log('프로필이 까꿍')}
              activeOpacity={0.6}
            >
              <View style={styles.writerTag}>
                <View style={styles.leftProfile}>
                  <Image
                    source={require('../../assets/images/sample.png')}
                    style={styles.profilePicture}
                  />
                  <View style={styles.leftText}>
                    <Text style={styles.writerName}>홍싸피</Text>
                    <Text style={styles.writerIntro}>나는 있잖아요..</Text>
                  </View>
                </View>
                <MaterialIcons
                  name='arrow-forward-ios'
                  size={15}
                  color={theme.grayColor.darkGray}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.group}>
            <Text style={styles.mainContent}>
              {`안녕하세요 저는 나싸핀데 이런 꿈을 갖고 있는데 강의 듣고 싶은데 돈은 없는데 열심히 할건데.. 이거 어떻게 들어가는데..??
              
              
  줄바꿈 테스트임...
  이거 맞는거야?
              
  일단은 그냥 해보지 뭐...
              
  이부분은 스크롤 테스트임...으아아아
  안녕하세요 저는 누구누군데 이런 꿈을 갖고 있는데 강의 듣고 싶은데 돈은 없는데 열심히 할건데.. 이거 어떻게 들어가는데..??
  안녕하세요 저는 누구누군데 이런 꿈을 갖고 있는데 강의 듣고 싶은데 돈은 없는데 열심히 할건데.. 이거 어떻게 들어가는데..??`}
            </Text>
          </View>
        </View>
      </ScrollView>
      <SupportButton onPressSupportBtn={onPressSupportBtn} />
      {chargeModal && <ChargeAlertModal onToggleDelete={onToggleDelete} />}
      {supportModal && <SupportModal onToggleDelete={onToggleDelete} />}
    </>
  );
}
