import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MyBottleStateType } from '../../modules/apis/bottle/bottleAtomTypes';
import theme from '../../utils/theme';
import dayjs from 'dayjs';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: 'row',
    borderBottomColor: theme.grayColor.lightGray,
    borderBottomWidth: 1,
  },
  leftWrapper: {
    flex: 9,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  headerDivider: {
    marginHorizontal: 7,
  },
  date: {
    fontSize: theme.fontSize.small,
  },
  kindof: {
    fontSize: theme.fontSize.small,
    color: theme.textColor.light,
  },
  content: {
    fontSize: theme.fontSize.regular,
  },
  countWrapper: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  newBadge: {
    backgroundColor: theme.textColor.error,
    width: 6,
    height: 6,
    borderRadius: 6,
    position: 'absolute',
    right: 0,
  },
  count: {
    color: theme.mainColor.dark,
    fontSize: theme.fontSize.regular,
  },
});

type MyBottleItemPropsType = {
  item: MyBottleStateType;
  onPressItem: () => void;
};

export default function MyBottleItem({
  item,
  onPressItem,
}: MyBottleItemPropsType): JSX.Element {
  const [date, setDate] = useState<string>();
  const [type, setType] = useState<'고민 상담' | '전문가 상담'>();

  useEffect(() => {
    if (item) {
      // 날짜 형식 세팅
      setDate(
        dayjs(item.regTime.toString(), 'YYYY-MM-DD HH:mm:ss').format('YY.MM.DD')
      );
      // 타입 세팅
      item.type === 1 ? setType('고민 상담') : setType('전문가 상담');
    }
  }, [item]);
  return (
    <Pressable style={styles.container} onPress={onPressItem}>
      <View style={styles.leftWrapper}>
        <View style={styles.header}>
          {date ? <Text style={styles.date}>{date}</Text> : <></>}
          <Text style={styles.headerDivider}>.</Text>
          <Text style={styles.kindof}>{type}</Text>
        </View>
        <Text
          style={styles.content}
          // numberOfLines={2}
        >
          {item.content}
        </Text>
      </View>
      <View style={styles.countWrapper}>
        <View style={styles.newBadge}></View>
        <Text style={styles.count}>+3</Text>
      </View>
    </Pressable>
  );
}

