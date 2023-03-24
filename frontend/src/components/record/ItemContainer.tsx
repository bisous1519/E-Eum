import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import theme from '../../utils/theme';
import SwipeableItem from './SwipeableItem';
import MockupDateGroupType from '../../models/record/mockupDateGroupType';
import MockupItemType from '../../models/record/mockupItemType';

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

type ItemContainerPropsType = {
  regTime: string;
  list: MockupItemType[];
  onToggleDelete: () => void;
};

export default function ItemContainer({
  regTime,
  list,
  onToggleDelete,
}: ItemContainerPropsType): JSX.Element {
  return (
    <View style={stylesFeed.dateContainer}>
      <View style={stylesFeed.dateHeader}>
        <View style={stylesFeed.dot}></View>
        <Text style={stylesFeed.date}>{regTime}</Text>
      </View>
      <View style={stylesFeed.contentWrapper}>
        <View
          style={StyleSheet.flatten([stylesFeed.dot, stylesFeed.fakedot])}
        ></View>
        <View style={stylesFeed.contents}>
          {list &&
            list.map((item) => (
              <SwipeableItem
                key={item.id}
                id={item.id}
                regTime={item.regTime}
                tag={item.tag}
                content={item.content}
                onToggleDelete={onToggleDelete}
              />
            ))}
        </View>
      </View>
    </View>
  );
}
