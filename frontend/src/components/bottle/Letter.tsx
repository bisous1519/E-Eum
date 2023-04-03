import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import useLetterSize from '../../hooks/useLetterSize';
import { shadowStyle } from '../common/shadowStyle';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../utils/theme';
import Badge from '../common/Badge';
import BadgeType from '../../models/user/badgeType';
import TextRender from '../common/editor/TextRender';

const paperImage = require('../../assets/images/paper.png');
const { LETTER_WIDTH, LETTER_HEIGHT } = useLetterSize();

const styles = StyleSheet.create({
  containerBackgroundImage: {
    width: LETTER_WIDTH,
    height: LETTER_HEIGHT,
    padding: 20,
  },
  container: {
    width: '100%',
    height: '100%',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  report: {
    fontSize: theme.fontSize.small,
    color: theme.grayColor.darkGray,
  },
  contentWrapper: {
    marginBottom: 20,
  },
  bottom: {},
  badgesWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  from: {
    marginTop: 10,
    width: '100%',
    textAlign: 'right',
    fontSize: theme.fontSize.small,
    color: theme.textColor.main,
  },
});

const badgeMockup: BadgeType[] = [
  {
    id: 1,
    name: 'badge',
    description: 'badge인뎅',
    imagePath: '',
  },
  {
    id: 2,
    name: 'badge',
    description: 'badge인뎅',
    imagePath: '',
  },
  {
    id: 3,
    name: 'badge',
    description: 'badge인뎅',
    imagePath: '',
  },
];

type LetterPropsType = {
  content?: string;
};

export default function Letter({ content }: LetterPropsType): JSX.Element {
  const [isLike, setisLike] = useState<boolean>(false);
  const [fromWhom, setfromWhom] = useState<string>('익명의 사용자');

  const onSendReport = (): void => {
    console.log('신고누름');
  };
  const onPressLike = (): void => {
    console.log('좋아요 눌므');
    if (!isLike) {
      setisLike((prev) => !prev);
    }
  };

  return (
    <ImageBackground
      source={paperImage}
      style={StyleSheet.flatten([
        styles.containerBackgroundImage,
        shadowStyle.shadow,
      ])}
    >
      <View style={styles.container}>
        <View style={styles.top}>
          <MaterialCommunityIcons
            name={isLike ? 'thumb-up' : 'thumb-up-outline'}
            size={24}
            color={isLike ? theme.textColor.error : theme.grayColor.inputIcon}
            onPress={onPressLike}
          />
          <Text style={styles.report} onPress={onSendReport}>
            신고
          </Text>
        </View>
        <FlatList
          data={[
            '<div>안녕하세요.<br> 너는 잘해내고 계세요!<br> 당신은 짱!<br> 초콜릿 많이 먹어!안녕하세요.<br> 너는 잘해내고 계세요!<br> 당신은 짱!<br> 초콜릿 많이 먹어!안녕하세요.<br> 너는 잘해내고 계세요!<br> 당신은 짱!<br> 초콜릿 많이 먹어!안녕하세요.<br> 너는 잘해내고 계세요!<br> 당신은 짱!<br> 초콜릿 많이 먹어!안녕하세요.<br> 너는 잘해내고 계세요!<br> 당신은 짱!<br> 초콜릿 많이 먹어!안녕하세요.<br> 너는 잘해내고 계세요!<br> 당신은 짱!<br> 초콜릿 많이 먹어!안녕하세요.<br> 너는 잘해내고 계세요!<br> 당신은 짱!<br> 초콜릿 많이 먹어!안녕하세요.<br>안녕하세요.<br> 너는 잘해내고 계세요!<br> 당신은 짱!<br> 초콜릿 많이 먹어!안녕하세요.<br> 너는 잘해내고 계세요!<br> 당신은 짱!<br> 초콜릿 많이 먹어!안녕하세요.<br> 너는 잘해내고 계세요!<br> 당신은 짱!<br> 초콜릿 많이 먹어! 너는 잘해내고 계세요!<br> 당신은 짱!<br> 초콜릿 많이 먹어!<div>',
          ]}
          style={styles.contentWrapper}
          renderItem={({ item }) => <TextRender content={item} />}
        />
        <View style={styles.bottom}>
          {/* 뱃지 */}
          <FlatList
            horizontal
            inverted
            contentContainerStyle={styles.badgesWrapper}
            data={badgeMockup}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <View
                style={{
                  zIndex: badgeMockup.length - index + 1,
                  right: 10 * index,
                }}
              >
                <Badge key={item.id} badge={item} />
              </View>
            )}
          />
          <Text style={styles.from}>from.{fromWhom}</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

