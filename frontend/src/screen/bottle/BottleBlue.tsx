import React, { useState, useEffect } from 'react';
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
import { getReceivedMessages } from '../../modules/apis/bottle/bottleApis';
import { ReceivedMessagesType } from '../../modules/apis/bottle/bottleAtomTypes';
import { receivedMessagesListState } from '../../modules/apis/bottle/bottleAtoms';
import { useRecoilState } from 'recoil';

const { DEVICE_WIDTH } = useDimension();
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
  },
  leftPageBottlesLocation: {
    position: 'absolute',
    width: 200,
    height: 170,
    borderWidth: 1,
    borderColor: 'red',
    top: 290,
    left: 160,
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
    width: 50,
    height: 30,
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

  const [userId, setUserId] = useState<number>(7);

  const beachVideoBlue = require('../../assets/videos/beachblue.mp4');

  const convertBottle = () => {
    navigation.push('BottleGreen');
  };

  const navigateToMyBottle = () => {
    navigation.push('MyBottle');
  };

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [receivedMessagesList, setReceivedMessagesList] = useRecoilState<
    ReceivedMessagesType[]
  >(receivedMessagesListState);

  const [preventModalPopup, setPreventModalPopup] = useState<boolean>(true);

  const handleModalPop = () => {
    setPreventModalPopup(false);
    console.log('답변하기 팻말 버튼 눌러짐 헉');
    setModalVisible(true);
  };
  const handleModalClose = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    getReceivedMessages(userId).then((data: ReceivedMessagesType[]) =>
      setReceivedMessagesList(data)
    );
    console.log('메시지 리스트 useEffect 헉');
    console.log(receivedMessagesList);
  }, []);

  type messageDataType = {
    user_req_bottle_id: number;
    reqBottle: reqBottleType;
  };
  type reqBottleType = {
    id: number;
    writterId: number;
    content: string;
    sentiment: number;
    ttsPath: string;
    regTime: string;
    status: number;
  };

  const popupPaper = () => {
    if (!preventModalPopup) navigation.push('WritingResPaperBlue');
  };
  const moveToWritingPaper = () => {
    navigation.push('WritingPaperBlue');
  };

  const modalMessageItem = ({ item }: { item: messageDataType }) => {
    let messageBoxBackgroundColor = '';

    if (item.reqBottle.sentiment === -1) {
      messageBoxBackgroundColor = theme.textColor.error;
    } else if (item.reqBottle.sentiment === 0) {
      messageBoxBackgroundColor = theme.grayColor.lightGray;
    } else {
      messageBoxBackgroundColor = theme.mainColor.main;
    }

    return (
      <Pressable onPress={popupPaper}>
        <View
          style={[
            modalstyles.messageBox,
            { backgroundColor: messageBoxBackgroundColor },
          ]}
        >
          <Text style={modalstyles.messageRegTime}>
            작성 날짜 : {item.reqBottle.regTime}
          </Text>
          <View>
            <Text>{item.reqBottle.content}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

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
                    <FontAwesome
                      name='close'
                      size={20}
                      color={theme.textColor.error}
                    />
                  </Pressable>
                </View>
                <View
                  style={StyleSheet.flatten([borders.red, modalstyles.listBox])}
                >
                  <FlatList
                    data={receivedMessagesList}
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
          source={beachVideoBlue}
          rate={1.0}
          // volume={1.0}
          isMuted={true}
          // resizeMode='cover'
          shouldPlay
          isLooping={true}
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
        <Pressable onPress={navigateToMyBottle}>
          <Text>마이보틀목록</Text>
        </Pressable>
      </View>
    </View>
  );
}
