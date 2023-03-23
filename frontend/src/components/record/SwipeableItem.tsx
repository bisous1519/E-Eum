import React, { RefObject, useRef, useState } from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewComponent,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import MockupItemType from '../../models/record/mockupItemType';
import theme from '../../utils/theme';
import DeleteModal from './DeleteModal';

const stylesRenderLeft = StyleSheet.create({
  rec: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  update: {
    backgroundColor: theme.mainColor.main,
  },
  delete: {
    backgroundColor: theme.textColor.error,
  },
  text: {
    fontSize: theme.fontSize.small,
  },
});

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

type SwipeablePropsType = {
  id: number;
  regTime: string;
  tag: string;
  content: string;
  onToggleDelete: () => void;
};

export default function SwipeableItem({
  id,
  regTime,
  tag,
  content,
  onToggleDelete,
}: SwipeablePropsType): JSX.Element {
  const swipeableRef = useRef<Swipeable>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  const onLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    setContentHeight(height);
  };
  const onPressUpdate = () => {
    console.log('수정!!!!!');
  };

  const renderLeftActions = (): JSX.Element => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Pressable
          onPress={onPressUpdate}
          style={StyleSheet.flatten([
            stylesRenderLeft.rec,
            stylesRenderLeft.update,
            { height: contentHeight },
          ])}
        >
          <Text style={stylesRenderLeft.text}>수정</Text>
        </Pressable>
        <Pressable
          onPress={onToggleDelete}
          style={StyleSheet.flatten([
            stylesRenderLeft.rec,
            stylesRenderLeft.delete,
            { height: contentHeight },
          ])}
        >
          <Text style={stylesRenderLeft.text}>삭제</Text>
        </Pressable>
      </View>
    );
  };
  return (
    <Swipeable
      ref={swipeableRef}
      friction={1}
      rightThreshold={30}
      overshootRight={false}
      renderLeftActions={renderLeftActions}
    >
      <View onLayout={onLayout} style={stylesFeed.content}>
        <Text style={stylesFeed.tag}># {tag}</Text>
        <Text style={stylesFeed.text}>{content}</Text>
      </View>
    </Swipeable>
  );
}
