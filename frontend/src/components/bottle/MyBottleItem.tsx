import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import theme from '../../utils/theme';

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
  onPressItem: () => void;
};

export default function MyBottleItem({
  onPressItem,
}: MyBottleItemPropsType): JSX.Element {
  return (
    <Pressable style={styles.container} onPress={onPressItem}>
      <View style={styles.leftWrapper}>
        <View style={styles.header}>
          <Text style={styles.date}>23.03.11</Text>
          <Text style={styles.headerDivider}>.</Text>
          <Text style={styles.kindof}>전문가 상담</Text>
        </View>
        <Text
          style={styles.content}
          // numberOfLines={2}
        >
          그 제가 고민이 있는데 있잖아요? 그게 말입니다 그런건데요 아휴
        </Text>
      </View>
      <View style={styles.countWrapper}>
        <View style={styles.newBadge}></View>
        <Text style={styles.count}>+3</Text>
      </View>
    </Pressable>
  );
}

