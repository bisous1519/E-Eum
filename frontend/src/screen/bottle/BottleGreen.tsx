import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import useDimension from '../../hooks/useDimension';
import theme from '../../utils/theme';
// import Video from 'react-native-video';
import { Video } from 'expo-av';
import ButtonComp from '../../components/common/button/ButtonComp';
import useNav from '../../hooks/useNav';
import { Feather } from '@expo/vector-icons';

const { DEVICE_WIDTH } = useDimension();
const styles = StyleSheet.create({
  tempBorderRed: {
    borderWidth: 1,
    borderColor: 'red',
  },
  tempBorderBlue: {
    borderWidth: 1,
    borderColor: 'blue',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.mainColor.main,
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
  greenPagePressableLocation: {
    position: 'absolute',
    width: 200,
    height: 170,
    borderWidth: 1,
    borderColor: 'red',
    top: 290,
    left: 160,
  },
  greenPageRedPressable: {
    position: 'absolute',
    marginTop: 30,
    marginLeft: 10,
    width: 70,
    height: 70,
  },
  greenPageBlackPressable: {
    position: 'absolute',
    marginTop: 17,
    marginLeft: 80,
    width: 70,
    height: 70,
  },
  greenPageGreenPressable: {
    position: 'absolute',
    marginTop: 87,
    marginLeft: 110,
    width: 70,
    height: 70,
  },
  titleButtonBox: {
    marginTop: 20,
    marginLeft: 10,
  },
  ackgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default function BottleBlue(): JSX.Element {
  const navigation = useNav();

  const beachVideoGreen = require('../../assets/videos/beachgreen.mp4');

  const convertBottle = () => {
    navigation.push('BottleBlue');
  };

  return (
    // <View>
    <View style={styles.container}>
      <View style={styles.backgroundVideo}>
        {/* <Video
          source={beachVideoGreen}
          rate={1.0}
          // volume={1.0}
          isMuted={true}
          // resizeMode='cover'
          shouldPlay
          isLooping={true}
          style={{ width: '100%', height: '100%' }}
        /> */}
      </View>
      <View style={styles.popupFromBackground}>
        <View style={[styles.titleButtonBox, styles.tempBorderBlue]}>
          <ButtonComp text={'전문가 상담 해류병'} onPressBtn={convertBottle} />
        </View>
        <View style={styles.greenPagePressableLocation}>
          <Pressable
            style={StyleSheet.flatten([
              styles.tempBorderBlue,
              styles.greenPageRedPressable,
            ])}
          ></Pressable>
          <Pressable
            style={StyleSheet.flatten([
              styles.tempBorderBlue,
              styles.greenPageBlackPressable,
            ])}
          ></Pressable>
          <Pressable
            style={StyleSheet.flatten([
              styles.tempBorderBlue,
              styles.greenPageGreenPressable,
            ])}
          ></Pressable>
        </View>
      </View>
    </View>
  );
}
