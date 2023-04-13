import React, { useEffect, useRef, useState } from 'react';
import {
  ImageBackground,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import useDimension from '../../hooks/useDimension';
import theme from '../../utils/theme';
// import Video from 'react-native-video';
import { Video } from 'expo-av';
import { FlatList } from 'react-native-gesture-handler';
import NewBadge from '../../components/common/NewBadge';
import ButtonComp from '../../components/common/button/ButtonComp';
import useNav from '../../hooks/useNav';
import {
  getNormalBottles,
  getResNew,
} from '../../modules/apis/bottle/bottleApis';
import {
  NormalBottleType,
  NormalBottlesReturnType,
} from '../../modules/apis/bottle/bottleAtomTypes';
import { useRecoilState } from 'recoil';
import { LoginUserStateType } from '../../modules/apis/user/userAtomTypes';
import { loginUserState } from '../../modules/apis/user/userAtoms';
import { AntDesign } from '@expo/vector-icons';

const { DEVICE_WIDTH, DEVICE_HEIGHT } = useDimension();

const borders = StyleSheet.create({
  red: {
    // borderWidth: 1,
    // borderColor: 'red',
  },
  blue: {
    // borderWidth: 1,
    // borderColor: 'blue',
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: theme.mainColor.main,
    backgroundColor: 'gray',
    // backgroundColor: '#9ACAC6',
  },
  headerButtonRight: {
    // width: '40%'
  },
  backgroundVideo: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    // borderWidth: 2,
    // borderColor: 'orange',
    // zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.mainColor.main,
  },
  popupFromBackground: {
    position: 'absolute',
    // top: 10,
    // left: 10,
    zIndex: 1,
    // backgroundColor: 'orange',
    width: '100%',
    height: '100%',
  },
  leftPageBottlesLocation: {
    position: 'absolute',
    width: 200,
    height: 190,
    top: 370,
    right: 40,
  },
  myBottleBox: {
    position: 'absolute',
    width: 200,
    height: 200,
    right: 10,
    bottom: 85,
  },
  bluePageRedPressable: {
    position: 'absolute',
    marginTop: 30,
    marginLeft: 10,
    width: 70,
    height: 70,
  },
  bluePageBlackPressable: {
    position: 'absolute',
    marginTop: 17,
    marginLeft: 80,
    width: 70,
    height: 70,
  },
  bluePageGreenPressable: {
    position: 'absolute',
    marginTop: 87,
    marginLeft: 110,
    width: 70,
    height: 70,
  },
  headerWrapper: {
    // display: 'flex',
    // flexDirection: 'row',
    // paddingTop: 20,
    // width: DEVICE_WIDTH * 0.94,
    // justifyContent: 'space-between',
  },
  headerBox: {
    // backgroundColor: theme.mainColor.main,
    backgroundColor: '#9ED0D0',
    width: '100%',
    height: 80,
  },
  headerTitle: {
    position: 'absolute',
    top: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: DEVICE_WIDTH,
  },
  headerText: {
    fontFamily: theme.fontFamily.title,
    fontSize: theme.fontSize.bigger,
    marginRight: 10,
    color: theme.textColor.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    textShadowRadius: 3.84,
    elevation: 5,
  },
  headerArrow: {
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    textShadowRadius: 3.84,
    elevation: 5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'orange',
  },
  headerLeft: {
    width: 45,
    height: 45,
    borderRadius: 45,
    backgroundColor: theme.background,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerButtonLeft: {
    // width: '100%'
  },
});

const modalstyles = StyleSheet.create({
  wholeContainer: {
    zIndex: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  content: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '90%',
    height: '80%',
  },
  modalTop: {
    width: '100%',
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    width: 55,
    height: 35,
    borderWidth: 3,
    borderRadius: 20,
    borderColor: theme.textColor.error,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTitle: {
    height: 40,
    flexGrow: 1,
    textAlign: 'left',
    textAlignVertical: 'center',
    marginLeft: 10,
    fontSize: theme.fontSize.big,
    fontFamily: theme.fontFamily.mainBold,
  },
  listBox: {
    marginTop: 20,
    width: '100%',
    height: '85%',
  },
  messageBox: {
    width: '100%',
    minHeight: 100,
    height: 'auto',
    marginTop: 10,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: theme.background,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  messageRegTime: {
    width: '100%',
    marginBottom: 5,
    borderStyle: 'dashed',
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderBottomColor: theme.grayColor.darkGray,
  },
});

export default function BottleBlue(): JSX.Element {
  const navigation = useNav();

  const [loginUser, setLoginUser] =
    useRecoilState<LoginUserStateType>(loginUserState);

  const [userId, setUserId] = useState<number>(loginUser.uid);

  const beachVideoBlue = require('../../assets/videos/beachblue.mp4');

  const [playable, setPlayable] = useState<boolean>(true);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [resNew, setResNew] = useState<boolean>(false);
  const [receivedNormalMessages, setReceivedNormalMessages] =
    useState<NormalBottlesReturnType>();

  const videoRef = useRef<Video>(null);

  const convertBottle = () => {
    navigation.navigate('BottleGreen');
    setPlayable(false);
  };

  const navigateToMyBottle = () => {
    navigation.push('MyBottle');
  };

  const handleModalPop = () => {
    setModalVisible(true);
  };
  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handlePlayable = async (status: any) => {
    if (status.didJustFinish) {
      console.log('Blue 멈춤');
      // setPlayable(false);
      setTimeout(() => {
        if (videoRef.current) videoRef.current.replayAsync();
        setPlayable(true);
        console.log('true 재생');
      }, 100);
    }
  };

  const moveToWritingPaper = () => {
    //새 질문
    navigation.push('WritingPaper', {
      messageType: 1,
      newMessage: true,
      userReqBottleId: null,
    });
  };

  const modalMessageItem = ({ item }: { item: NormalBottleType }) => {
    let messageBoxBackgroundColor = '';

    if (item.sentiment === -1) {
      messageBoxBackgroundColor = theme.textColor.error;
    } else if (item.sentiment === 0) {
      messageBoxBackgroundColor = theme.grayColor.lightGray;
    } else {
      messageBoxBackgroundColor = theme.mainColor.main;
    }

    const popupPaper = () => {
      //답장
      if (modalVisible) {
        console.log('팝업에서 눌려서 이동');
        navigation.push('WritingPaper', {
          messageType: 1,
          newMessage: false,
          userReqBottleId: item.userReqBottleId,
        });
      }
    };
    return (
      <Pressable onPress={popupPaper}>
        <View
          style={[
            modalstyles.messageBox,
            { backgroundColor: messageBoxBackgroundColor },
          ]}
        >
          <Text style={modalstyles.messageRegTime}>
            작성 날짜 : {item.regTime}
          </Text>
          <View>
            <Text>{item.content}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  const fetchData = () => {
    getResNew(loginUser.uid).then((data: boolean) => setResNew(data));
  };

  useEffect(() => {
    fetchData();
    setModalVisible(false);
    console.log('로딩');
  }, []);

  useEffect(() => {
    getNormalBottles(userId).then((data) => setReceivedNormalMessages(data));
  }, []);

  console.log('modalVisible : ' + modalVisible);

  return (
    // <View>
    <View style={styles.container}>
      {modalVisible && (
        <View
          style={StyleSheet.flatten([modalstyles.wholeContainer, borders.red])}
        >
          <Modal visible={modalVisible} transparent={true} animationType='fade'>
            <View style={StyleSheet.flatten([modalstyles.box, borders.blue])}>
              <View style={modalstyles.content}>
                <View
                  style={StyleSheet.flatten([
                    modalstyles.modalTop,
                    borders.blue,
                  ])}
                >
                  <Text
                    style={StyleSheet.flatten([
                      modalstyles.topTitle,
                      borders.red,
                    ])}
                  >
                    {loginUser.nickname}의 수신 해류병 목록
                  </Text>
                  <Pressable
                    style={StyleSheet.flatten([modalstyles.closeButton])}
                    onPress={handleModalClose}
                  >
                    <Text
                      style={{
                        fontSize: theme.fontSize.regular,
                        color: theme.textColor.error,
                        fontFamily: theme.fontFamily.mainBold,
                      }}
                    >
                      닫기
                    </Text>
                  </Pressable>
                </View>
                <View
                  style={StyleSheet.flatten([borders.red, modalstyles.listBox])}
                >
                  <FlatList
                    data={receivedNormalMessages}
                    renderItem={modalMessageItem}
                    // renderItem={({ item }) => <Text>{item.id}</Text>}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
      {/* <ImageBackground
        source={require('../../assets/images/bottleBackgroundImg.png')}
        resizeMode='stretch'
        style={styles.backgroundVideo}
      > */}
      <View style={styles.backgroundVideo}>
        <Video
          ref={videoRef}
          source={beachVideoBlue}
          rate={1.0}
          // volume={1.0}
          isMuted={true}
          // resizeMode='cover'
          shouldPlay={playable}
          onPlaybackStatusUpdate={handlePlayable}
          isLooping={false}
          style={{
            width: '100%',
            height: '83%',
            // borderWidth: 2,
            // borderColor: 'red',
          }}
          onError={(error) => {
            console.log('에러');
            console.log(error);
          }}
        />
      </View>
      {/* </ImageBackground> */}
      <View style={styles.popupFromBackground}>
        <View style={StyleSheet.flatten([styles.headerWrapper, borders.red])}>
          <View style={[styles.headerBox, borders.blue]}></View>
          <View style={styles.headerTitle}>
            <Pressable style={styles.headerRight} onPress={convertBottle}>
              <Text style={styles.headerText}>고민 상담 해류병</Text>
              <AntDesign
                name='arrowright'
                size={24}
                color={theme.textColor.white}
                style={styles.headerArrow}
              />
            </Pressable>
            <Pressable style={styles.headerLeft} onPress={moveToWritingPaper}>
              <AntDesign name='form' size={24} color={theme.mainColor.dark} />
            </Pressable>
          </View>
        </View>
        <Pressable
          style={styles.leftPageBottlesLocation}
          onPress={handleModalPop}
        />
        <Pressable style={styles.myBottleBox} onPress={navigateToMyBottle}>
          {resNew && <NewBadge right={30} top={5} />}
        </Pressable>
      </View>
    </View>
  );
}
