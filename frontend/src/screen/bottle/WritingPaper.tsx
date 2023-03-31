import { Video } from 'expo-av';
import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { DisplayP3ColorSpace } from 'three';
import ButtonComp from '../../components/common/button/ButtonComp';
import useDimension from '../../hooks/useDimension';
import useNav from '../../hooks/useNav';
import theme from '../../utils/theme';

const { DEVICE_WIDTH, DEVICE_HEIGHT } = useDimension();

const border = StyleSheet.create({
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

export default function WritingPaper(): JSX.Element {
  const navigation = useNav();

  const paperVideo = require('../../assets/videos/rollingpaper.mp4');

  const [startVideo, setStartVideo] = useState<boolean>(false);
  const [writtenTextValue, setWrittenTextValue] = useState<string>('');
  const writtenTextLength = writtenTextValue.length;
  const inputRef = useRef<TextInput>(null);
  const [visible, setVisible] = useState<boolean>(true);

  const doneWriting = () => {
    setStartVideo(true);
    if (inputRef.current) {
      inputRef.current.blur();
    }
    // setWrittenTextValue('');
    setVisible(false);
    setTimeout(() => {
      navigation.push('BottleBlue');
    }, 4000);
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
            <ButtonComp
              text='확인'
              onPressBtn={doneWriting}
              small={true}
            ></ButtonComp>
            <ButtonComp
              text='다시 쓰기'
              onPressBtn={clearText}
              small={true}
            ></ButtonComp>
          </View>
          <View style={StyleSheet.flatten([styles.inputTextBox, border.red])}>
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
    </View>
  );
}
