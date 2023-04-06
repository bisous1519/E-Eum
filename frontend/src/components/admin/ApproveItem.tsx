import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  MyBottleResStateType,
  MyBottleStateType,
} from '../../modules/apis/bottle/bottleAtomTypes';
import theme from '../../utils/theme';
// import dayjs from 'dayjs';
import { getMyBottleRes } from '../../modules/apis/bottle/bottleApis';
import { useRecoilState } from 'recoil';
import { myBottleResState } from '../../modules/apis/bottle/bottleAtoms';
import useDate from '../../hooks/useDate';
import ApproveItemType from '../../models/admin/ApproveItemType';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

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
    color: theme.textColor.light,
    fontSize: theme.fontSize.small,
  },
  kindof: {
    fontSize: theme.fontSize.small,
    color: theme.textColor.main,
  },
  content: {
    fontSize: theme.fontSize.regular,
  },
  countWrapper: {
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  count: {
    color: theme.mainColor.dark,
    // fontSize: theme.fontSize.regular,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 5,
    // backgroundColor: 'orange',
  },
});

type ApproveItemPropsType = {
  item: ApproveItemType;
  index: number;
  onPressConfirm: (index: number) => void;
  onToggleDetailModal: () => void;
};

export default function ApproveItem({
  item,
  index,
  onPressConfirm,
  onToggleDetailModal,
}: ApproveItemPropsType): JSX.Element {
  const onPressItem = () => {
    onToggleDetailModal();
  };

  return (
    <>
      {item ? (
        <Pressable style={styles.container} onPress={onPressItem}>
          <View style={styles.leftWrapper}>
            <View style={styles.header}>
              <Text style={styles.kindof}>
                {item.type === 1 ? '자문단 신청' : '자립준비청년 인증'}
              </Text>
              <Text style={styles.headerDivider}>.</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <Text
              style={styles.content}
              // numberOfLines={2}
            >
              {`${item.name} (${item.email})`}
            </Text>
          </View>
          <View style={styles.countWrapper}>
            <Feather
              name='check'
              size={24}
              style={styles.count}
              onPress={() => onPressConfirm(index)}
            />
            <AntDesign
              name='close'
              size={24}
              style={StyleSheet.flatten([
                styles.count,
                { color: theme.textColor.error },
              ])}
            />
          </View>
        </Pressable>
      ) : (
        <></>
      )}
    </>
  );
}

