import React, { useRef, useState } from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import useNav from '../../hooks/useNav';
import theme from '../../utils/theme';
import { RecordStateType } from '../../modules/apis/record/recordAtomTypes';
import TextRender from '../common/editor/TextRender';

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
  contentWrapper: {
    marginTop: 10,
  },
});

type SwipeablePropsType = {
  item: RecordStateType;
  onToggleDelete: () => void;
};

export default function SwipeableItem({
  item,
  onToggleDelete,
}: SwipeablePropsType): JSX.Element {
  const navigation = useNav();
  const swipeableRef = useRef<Swipeable>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const [convertedContent, setConvertedContent] = useState('');

  const onLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    setContentHeight(height);
  };
  const onPressUpdate = () => {
    swipeableRef.current?.close();
    navigation.push('RecordEditor', { item });
  };
  const onPressDelete = () => {
    swipeableRef.current?.close();
    onToggleDelete();
  };
  const onPressSupport = () => {
    swipeableRef.current?.close();
    navigation.push('RecordEditor');
  };

  const renderRightActions = (): JSX.Element => {
    return (
      <Pressable
        onPress={onPressSupport}
        style={StyleSheet.flatten([
          stylesRenderLeft.rec,
          stylesRenderLeft.update,
          { height: contentHeight },
        ])}
      >
        <Text style={stylesRenderLeft.text}>후원</Text>
      </Pressable>
    );
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
          onPress={onPressDelete}
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
      overshootLeft={false}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
    >
      <View onLayout={onLayout} style={stylesFeed.content}>
        <Text style={stylesFeed.tag}># {item.tagName}</Text>
        <View style={stylesFeed.contentWrapper}>
          <TextRender content={item.content} />
        </View>
      </View>
    </Swipeable>
  );
}

