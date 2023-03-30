import React, { RefObject, useEffect, useRef, useState } from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewComponent,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
// import WebView from 'react-native-webview';
import useNav from '../../hooks/useNav';
import MockupItemType from '../../models/record/mockupItemType';
import theme from '../../utils/theme';
import DeleteModal from './DeleteModal';
import RenderHTML from 'react-native-render-html';
import { RecordStateType } from '../../modules/apis/record/recordAtomTypes';

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
    // fontSize: theme.fontSize.regular,
    marginTop: 10,
  },
});

const contentTagsStyles = {
  div: {
    color: theme.textColor.main,
    fontSize: theme.fontSize.regular,
  },
  ul: {
    color: theme.textColor.main,
    fontSize: theme.fontSize.regular,
  },
  ol: {
    color: theme.textColor.main,
    fontSize: theme.fontSize.regular,
  },
  li: {
    color: theme.textColor.main,
    fontSize: theme.fontSize.regular,
  },
  strike: {
    color: theme.textColor.main,
    fontSize: theme.fontSize.regular,
  },
  u: {
    color: theme.textColor.main,
    fontSize: theme.fontSize.regular,
  },
  i: {
    color: theme.textColor.main,
    fontSize: theme.fontSize.regular,
  },
  b: {
    color: theme.textColor.main,
    fontSize: theme.fontSize.regular,
  },
};

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
        {/* <Text style={stylesFeed.text}>{content}</Text> */}
        <View style={stylesFeed.contentWrapper}>
          <RenderHTML
            tagsStyles={contentTagsStyles}
            source={{ html: item.content }}
            contentWidth={300}
          />
        </View>
      </View>
    </Swipeable>
  );
}

