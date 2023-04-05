import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useDimension from '../../hooks/useDimension';
import { AntDesign } from '@expo/vector-icons';
import theme from '../../utils/theme';
import { useRecoilState } from 'recoil';
import { SupportsStateType } from '../../modules/apis/support/supportAtomTypes';
import {
  sortType,
  supportsState,
} from '../../modules/apis/support/supportAtoms';

const { DEVICE_WIDTH, DEVICE_HEIGHT } = useDimension();

const styles = StyleSheet.create({
  layer: {
    flex: 1,
    backgroundColor: theme.layerColor,
    position: 'absolute',
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: theme.background,
    height: DEVICE_HEIGHT * 0.6,
    width: DEVICE_WIDTH,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: DEVICE_HEIGHT * 0.05,
    alignContent: 'center',
    alignItems: 'center',
  },
  sortTitle: {
    fontSize: theme.fontSize.big,
  },
  sortGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: DEVICE_WIDTH * 0.05,
  },
  selected: {
    color: theme.mainColor.main,
  },
  unselected: {
    color: theme.background,
  },
  selectedText: {
    fontSize: theme.fontSize.regular,
    color: theme.mainColor.main,
  },
  unselectedText: {
    fontSize: theme.fontSize.regular,
  },
  options: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT * 0.4,
    justifyContent: 'space-evenly',
  },
  button: {
    borderTopWidth: 1,
    borderColor: theme.grayColor.lightGray,
    width: DEVICE_WIDTH * 0.9,
    height: DEVICE_HEIGHT * 0.1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type SortModalPropsType = {
  onToggleDelete: () => void;
};

export default function SortModal({
  onToggleDelete,
}: SortModalPropsType): JSX.Element {
  const [supports, setSupports] =
    useRecoilState<SupportsStateType>(supportsState);

  const [sort, setSort] = useRecoilState<number>(sortType);

  return (
    <>
      <View style={styles.layer}>
        <View style={styles.container}>
          <Text style={styles.sortTitle}>정렬 기준</Text>
          <View style={styles.options}>
            <Pressable onPress={() => setSort(1)} style={styles.sortGroup}>
              <Text
                style={
                  sort === 1 ? styles.selectedText : styles.unselectedText
                }>
                최신순
              </Text>
              <AntDesign
                name='check'
                size={24}
                style={sort === 1 ? styles.selected : styles.unselected}
              />
            </Pressable>
            <Pressable onPress={() => setSort(2)} style={styles.sortGroup}>
              <Text
                style={
                  sort === 2 ? styles.selectedText : styles.unselectedText
                }>
                마감 임박 순
              </Text>
              <AntDesign
                name='check'
                size={24}
                style={sort === 2 ? styles.selected : styles.unselected}
              />
            </Pressable>
            <Pressable onPress={() => setSort(3)} style={styles.sortGroup}>
              <Text
                style={
                  sort === 3 ? styles.selectedText : styles.unselectedText
                }>
                달성률 높은 순
              </Text>
              <AntDesign
                name='check'
                size={24}
                style={sort === 3 ? styles.selected : styles.unselected}
              />
            </Pressable>
            <Pressable onPress={() => setSort(4)} style={styles.sortGroup}>
              <Text
                style={
                  sort === 4 ? styles.selectedText : styles.unselectedText
                }>
                달성률 낮은 순
              </Text>
              <AntDesign
                name='check'
                size={24}
                style={sort === 4 ? styles.selected : styles.unselected}
              />
            </Pressable>
          </View>
          <TouchableOpacity
            onPress={onToggleDelete}
            activeOpacity={0.6}
            style={styles.button}>
            <Text style={styles.unselectedText}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
