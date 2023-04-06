import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import useDimension from '../../hooks/useDimension';
import theme from '../../utils/theme';
// import Video from 'react-native-video';
import { Video } from 'expo-av';
import ButtonComp from '../../components/common/button/ButtonComp';
import useNav from '../../hooks/useNav';
import { FontAwesome } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import WritingPaperBlue from './WritingPaper';
import { getNormalBottles } from '../../modules/apis/bottle/bottleApis';
import {
  NormalBottleType,
  NormalBottlesReturnType,
} from '../../modules/apis/bottle/bottleAtomTypes';
import { faqMockup } from './WritingPaper';
import FaqModal from '../../components/bottle/FaqModal';
import NewBadge from '../../components/common/NewBadge';
import { getResNew } from '../../modules/apis/bottle/bottleApis';
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
    // backgroundColor: theme.background,
    // flex: 1,
    // alignItems: 'center',
  },
  backgroundVideo: {
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  popupFromBackground: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    // backgroundColor: 'orange',
    height: '100%',
  },
  leftPageBottlesLocation: {
    position: 'absolute',
    width: 200,
    height: 190,
    top: 250,
    left: 160,
  },
  myBottleBox: {
    position: 'absolute',
    width: 200,
    height: 200,
    // borderWidth: 1,
    // borderColor: 'red',
    right: 0,
    bottom: 50,
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
  headerButtonLeft: { width: '55%' },
  headerButtonRight: { width: '40%' },
  ackgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  headerButtons: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 20,
    width: DEVICE_WIDTH * 0.94,
    justifyContent: 'space-between',
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

  const beachVideoBlue = require('../../assets/videos/beachblue.mp4');

  const convertBottle = () => {
    navigation.push('BottleGreen');
    setPlayable(false);
  };

  const navigateToMyBottle = () => {
    navigation.push('MyBottle');
  };

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [resNew, setResNew] = useState<boolean>(false);

  const handleModalPop = () => {
    setModalVisible(true);
  };
  const handleModalClose = () => {
    setModalVisible(false);
  };

  const videoRef = useRef<Video>(null);
  const [playable, setPlayable] = useState<boolean>(true);

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

  const [userId, setUserId] = useState<number>(2);

  useEffect(() => {
    getNormalBottles(userId).then((data) => setReceivedNormalMessages(data));
  }, []);

  const [receivedNormalMessages, setReceivedNormalMessages] =
    useState<NormalBottlesReturnType>();

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
    getResNew(1).then((data: boolean) => setResNew(data));
  };

  useEffect(() => {
    fetchData();
    setModalVisible(false);
    console.log('로딩');
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
                    받은 해류병 목록
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
          style={{ width: '100%', height: '100%' }}
          onError={(error) => {
            console.log('에러');
            console.log(error);
          }}
        />
      </View>
      <View style={styles.popupFromBackground}>
        <View style={StyleSheet.flatten([styles.headerButtons, borders.red])}>
          <View style={[styles.headerButtonLeft, borders.blue]}>
            <ButtonComp
              text={'고민상담 해류병'}
              onPressBtn={convertBottle}
            ></ButtonComp>
          </View>
          <View style={[styles.headerButtonRight, borders.blue]}>
            <ButtonComp
              text={'고민 보내기'}
              onPressBtn={moveToWritingPaper}
            ></ButtonComp>
          </View>
        </View>
        <Pressable
          style={styles.leftPageBottlesLocation}
          onPress={handleModalPop}
        />
        <Pressable style={styles.myBottleBox} onPress={navigateToMyBottle}>
          {resNew && <NewBadge right={20} top={10} />}
        </Pressable>
      </View>
    </View>
  );
}
