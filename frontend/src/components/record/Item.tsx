import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import theme from '../../utils/theme';

const stylesFeed = StyleSheet.create({
  content: {
    borderRadius: 15,
    backgroundColor: theme.mainColor.light,
    padding: 20,
    marginBottom: 15,
  },
  tag: {
    fontSize: theme.fontSize.small,
    color: theme.textColor.light,
  },
  text: {
    fontSize: theme.fontSize.regular,
    marginTop: 10,
  },
});

export default function Item(): JSX.Element {
  return (
    <View style={stylesFeed.content}>
      <Text style={stylesFeed.tag}># 꿈</Text>
      <Text style={stylesFeed.text}>
        구글 개발자 인터뷰를 봤다. 멋있다. 웅장하다!!!!! 안웅장하다 웅장하다!!!
      </Text>
    </View>
  );
}

