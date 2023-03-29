import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useDimension from '../../hooks/useDimension';
import theme from '../../utils/theme';
// import Video from 'react-native-video';
import { Video } from 'expo-av';
import Swiper from 'react-native-swiper';
import BottleLeft from './BottleLeft';
import BottleRight from './BottleRight';

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
  leftPagePressableLocation: {
    position: 'absolute',
    width: 200,
    height: 170,
    borderWidth: 1,
    borderColor: 'red',
    top: 290,
    left: 160,
  },
  leftPageRedPressable: {
    width: 50,
    height: 50,
  },
  leftPageBlackPressable: {},
  leftPageBluePressable: {},
});

export default function BottleList(): JSX.Element {
  const beachVideo = require('../../assets/videos/beachblue.mp4');
  return (
    <Swiper>
      <View style={styles.container}>
        <View style={styles.backgroundVideo}>
          <BottleLeft />
        </View>
        <View style={styles.popupFromBackground}>
          <View style={styles.leftPagePressableLocation}>
            <Pressable
              style={StyleSheet.flatten([
                styles.tempBorderBlue,
                styles.leftPageRedPressable,
              ])}
            ></Pressable>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.backgroundVideo}>
          <BottleRight />
        </View>
        <View style={styles.popupFromBackground}></View>
      </View>
    </Swiper>
    // <KeyboardAwareScrollView
    //   // style={styles.container}
    //   keyboardShouldPersistTaps='handled'
    //   contentContainerStyle={styles.container}
    // >
    //   <View style={{ width: DEVICE_WIDTH * 0.8 }}>

    //   </View>
    // </KeyboardAwareScrollView>
  );
}
