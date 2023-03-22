import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import theme from '../../utils/theme';
import Item from './Item';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

const stylesFeed = StyleSheet.create({
  dateContainer: {},
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: theme.mainColor.light,
    marginRight: 15,
  },
  date: {
    fontSize: theme.fontSize.regular,
  },
  contentWrapper: {
    flexDirection: 'row',
  },
  fakedot: {
    opacity: 0,
  },
  contents: {
    flex: 1,
  },
});

export default function ItemContainer(): JSX.Element {
  return (
    <View style={stylesFeed.dateContainer}>
      <View style={stylesFeed.dateHeader}>
        <View style={stylesFeed.dot}></View>
        <Text style={stylesFeed.date}>23.03.11</Text>
      </View>
      <View style={stylesFeed.contentWrapper}>
        <View style={[stylesFeed.dot, stylesFeed.fakedot]}></View>
        <View style={stylesFeed.contents}>
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </View>
      </View>
    </View>
  );
}

