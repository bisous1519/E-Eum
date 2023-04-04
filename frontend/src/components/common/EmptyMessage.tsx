import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import theme from '../../utils/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    opacity: 0.3,
  },
  text: {
    marginTop: 10,
    color: theme.textColor.light,
  },
});

type EmptyMessagePropsType = {
  text: string;
  marginTop?: number | string; // 원래는 가로세로 정 가운데에 오도록 만들었는데 위치를 좀 내리고 싶으면 쓰세용
  marginBottom?: number | string; // 위치를 더 올리고 싶으면 쓰세여
};

export default function EmptyMessage({
  text,
  marginTop,
  marginBottom,
}: EmptyMessagePropsType): JSX.Element {
  return (
    <View style={styles.container}>
      <Image
        style={StyleSheet.flatten([styles.image, { marginTop }])}
        source={require('../../assets/images/dotBubble.png')}
      />
      <Text style={StyleSheet.flatten([styles.text, { marginBottom }])}>
        {text}
      </Text>
    </View>
  );
}

