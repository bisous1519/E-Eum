import { Video } from 'expo-av';
import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, Modal } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import ButtonComp from '../../components/common/button/ButtonComp';
import useDimension from '../../hooks/useDimension';
import useNav, { RootStackParamList } from '../../hooks/useNav';
import theme from '../../utils/theme';
import { RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FnqType from '../../models/bottle/fnqType';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import FnqModal from '../../components/bottle/FnqModal';

const { DEVICE_WIDTH, DEVICE_HEIGHT } = useDimension();

const border = StyleSheet.create({
  red: {
    borderWidth: 1,
    borderColor: 'red',
  },
  blue: {
    borderWidth: 1,
    borderColor: 'blue',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: theme.mainColor.main,
    // backgroundColor: 'gray',
    // backgroundColor: theme.background,
    // flex: 1,
    // alignItems: 'center',
  },
  backgroundVideo: {
    width: '100%',
    height: '100%',
    zIndex: 0,
    position: 'absolute',
  },
  inputTextBox: {},
  popupBox: {
    zIndex: 1,
    width: '100%',
    height: '100%',
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
  paperInput: {
    marginLeft: 60,
    marginRight: 60,
    marginTop: 15,
    height: '83%',
    fontFamily: theme.fontFamily.main,
    color: theme.textColor.main,
    fontSize: theme.fontSize.big,
    textAlignVertical: 'top',
    textAlign: 'left',
    // borderWidth: 1,
    // borderColor: theme.grayColor.lightGray,
    // borderRadius: 20,
    padding: 10,
  },
  headerButtons: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 5,
    paddingLeft: 50,
    paddingRight: 50,
  },
  textLengthCountBox: {
    display: 'flex',
    alignItems: 'flex-end',
    paddingRight: 50,
  },
  textLength: {
    fontSize: theme.fontSize.big,
    color: theme.mainColor.light,
  },
});

const modalstyle = StyleSheet.create({
  container: {
    zIndex: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  content: {
    width: 310,
    height: 370,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderWidth: 5,
    borderRadius: 10,
    borderColor: 'white',
  },
  headerTextBox: {
    width: '100%',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'green',
  },
  headerText: {
    textAlign: 'center',
    fontSize: theme.fontSize.bigger,
    fontFamily: theme.fontFamily.mainBold,
    color: theme.textColor.white,
  },
  sendingVideoBox: {
    width: '100%',
    height: 300,
  },
});

type WritingPaperProp = NativeStackNavigationProp<
  RootStackParamList,
  'WritingPaper'
>;

export const fnqMockup: FnqType = {
  id: 1,
  title: '주거 관련 정보',
  content:
    '<div>경기도 내 아동복지시설 보호종료 5년이내 또는 종료예정인 자립준비청년을 대상으로  자립준비청년 주거기반 자립지원 참여자를 모집 중에 있습니다.<br><br> 매월 15일까지 온라인 또는 방문접수가 가능합니다.</div>',
  linkTo: 'http://naver.com',
};

export default function WritingPaper(): JSX.Element {
  const navigation = useNav();

  const route = useRoute<RouteProp<RootStackParamList, 'WritingPaper'>>();
  const messageNormal = route.params?.messageType === 1 ? true : false;
  const inputRef = useRef<TextInput>(null);

  const paperVideo = require('../../assets/videos/rollingpaper.mp4');

  const [startVideo, setStartVideo] = useState<boolean>(false);
  const [writtenTextValue, setWrittenTextValue] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(true);
  const [sendingModal, setSendingModal] = useState<boolean>(false);
  const [sended, setSended] = useState<boolean>(false);
  const sendingVideoPath = messageNormal
    ? require('../../assets/videos/sendingbottle(round).mp4')
    : require('../../assets/videos/sendingbottle(long).mp4');
  const [fnqModal, setFnqModal] = useState<boolean>(false);

  const writtenTextLength = writtenTextValue.length;

  const doneWriting = () => {
    setStartVideo(true);
    if (inputRef.current) {
      inputRef.current.blur();
    }
    // setWrittenTextValue('');
    setVisible(false);
    // setTimeout(() => {
    //   messageNormal
    //     ? navigation.navigate('BottleBlue')
    //     : navigation.navigate('BottleGreen');
    // }, 8600);
    setTimeout(() => {
      setSendingModal(true);
    }, 4000);
    setTimeout(() => {
      setSended(true);
    }, 7000);
    setTimeout(() => {
      // 여기가 맞나?
      setFnqModal(true);
      setSendingModal(false);
    }, 8500);
  };

  const onCloseFnqModal = () => {
    setFnqModal(false);
    messageNormal
      ? navigation.navigate('BottleBlue')
      : navigation.navigate('BottleGreen');
  };

  const handleTextChange = (text: string) => {
    setWrittenTextValue(text);
  };

  const clearText = () => {
    setWrittenTextValue('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundVideo}>
        <Video
          source={paperVideo}
          rate={1.0}
          // volume={1.0}
          isMuted={true}
          // resizeMode='cover'
          shouldPlay={startVideo}
          isLooping={false}
          style={{ width: '100%', height: '100%' }}
          onError={(error) => {
            console.log('paper 비디오 에러');
            console.log(error);
          }}
        />
      </View>
      {visible && (
        <View style={StyleSheet.flatten([border.blue, styles.popupBox])}>
          <View style={styles.headerButtons}>
            <ButtonComp text='보내기' onPressBtn={doneWriting} small={true} />
            <ButtonComp text='다시 쓰기' onPressBtn={clearText} small={true} />
          </View>
          <View
            style={StyleSheet.flatten([
              styles.inputTextBox,
              //  border.red
            ])}
          >
            <TextInput
              style={StyleSheet.flatten([styles.paperInput])}
              autoFocus={true}
              maxLength={500}
              multiline={true}
              value={writtenTextValue}
              autoCorrect={false}
              onChangeText={handleTextChange}
              ref={inputRef}
            ></TextInput>
            <View style={styles.textLengthCountBox}>
              <Text style={styles.textLength}>{writtenTextLength}/500</Text>
            </View>
          </View>
        </View>
      )}
      {sendingModal && (
        <View style={StyleSheet.flatten([modalstyle.container, border.blue])}>
          <Modal visible={true} transparent={true} animationType='fade'>
            <View style={StyleSheet.flatten([border.red, modalstyle.box])}>
              <View
                style={StyleSheet.flatten([border.blue, modalstyle.content])}
              >
                <View style={modalstyle.headerTextBox}>
                  <Text style={modalstyle.headerText}>
                    {sended ? '완료' : '흘려 보내는 중...'}
                  </Text>
                </View>
                <View style={modalstyle.sendingVideoBox}>
                  <Video
                    source={sendingVideoPath}
                    rate={1.0}
                    // volume={1.0}
                    isMuted={true}
                    // resizeMode='cover'
                    // shouldPlay
                    shouldPlay={sendingModal}
                    // isLooping={true}
                    isLooping={false}
                    style={{ width: '100%', height: '100%' }}
                    onError={(error) => {
                      console.log('에러');
                      console.log(error);
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
      {fnqModal ? (
        <FnqModal data={fnqMockup} onCloseFnqModal={onCloseFnqModal} />
      ) : (
        <></>
      )}
    </View>
  );
}
