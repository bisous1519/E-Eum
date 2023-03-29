import React from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useDimension from '../../hooks/useDimension';
import theme from '../../utils/theme';
// import Video from 'react-native-video';
import { Video } from 'expo-av';

const { DEVICE_WIDTH } = useDimension();
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: theme.background,
    // flex: 1,
    // alignItems: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default function BottleRight(): JSX.Element {
  const beachVideoGreen = require('../../assets/videos/beachgreen.mp4');
  return (
    <Video
      source={beachVideoGreen}
      rate={1.0}
      // volume={1.0}
      isMuted={true}
      // resizeMode='cover'
      shouldPlay
      isLooping={true}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
