import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native';
import useDimension from '../../hooks/useDimension';
import theme from '../../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {
  getMySupports,
  getSupports,
  searchSupports,
} from '../../modules/apis/support/supportApis';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SupportsStateType } from '../../modules/apis/support/supportAtomTypes';
import {
  sortType,
  supportsState,
} from '../../modules/apis/support/supportAtoms';
import SortModal from './SortModal';

const { DEVICE_WIDTH, DEVICE_HEIGHT } = useDimension();

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT * 0.08,
    backgroundColor: theme.background,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: DEVICE_WIDTH * 0.06,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    color: theme.mainColor.dark,
    marginRight: 10,
  },
  searchInput: {
    fontSize: theme.fontSize.small,
    width: DEVICE_HEIGHT * 0.23,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  sortBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sort: {
    marginRight: 8,
  },
  mySupportSelected: {
    backgroundColor: theme.mainColor.main,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  mySupportNotSelected: {
    backgroundColor: theme.background,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
});

export default function CustomHeader(): JSX.Element {
  const loginUser: number = 1;

  const [supports, setSupports] =
    useRecoilState<SupportsStateType[]>(supportsState);
  const sort = useRecoilValue<number>(sortType);

  const [sortPressed, setSortPressed] = useState<boolean>(false);
  const [supportPressed, setSupportPressed] = useState<boolean>(false);

  const sortName: string[] = [
    '최신순',
    '마감 임박 순',
    '달성률 높은 순',
    '달성률 낮은 순',
  ];

  // 검색 input값
  const [keyword, setKeyword] = useState<string>('');

  // input에 입력된 값을 search에 저장
  const handleInput = (e: any) => {
    setKeyword(e.nativeEvent.text);
  };

  // 검색 API를 푸슝
  const handleSearch = () => {
    searchSupports(keyword).then((data) => {
      setSupports(data);
    });
  };

  const handleSortPress = () => {
    setSortPressed(true);
  };

  const handleSupportPress = () => {
    setSupportPressed((prev) => !prev);
    if (supportPressed) {
      getSupports(sort).then((data) => {
        setSupports(data);
      });
    } else {
      getMySupports(loginUser).then((data) => {
        setSupports(data);
      });
    }
  };

  const handleToggleDelete = () => {
    setSortPressed(false);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.search}>
          <Ionicons name='search' size={22} style={styles.searchIcon} />
          <TextInput
            value={keyword}
            onChange={handleInput}
            onSubmitEditing={handleSearch}
            style={styles.searchInput}
          />
        </View>
        <View style={styles.rightContent}>
          <Pressable style={styles.sort} onPress={handleSortPress}>
            <View style={styles.sortBox}>
              <MaterialIcons
                name='keyboard-arrow-down'
                size={24}
                color={theme.mainColor.dark}
              />
              <Text>{sortName[sort - 1]}</Text>
            </View>
          </Pressable>
          {supportPressed ? (
            <Pressable
              style={styles.mySupportSelected}
              onPress={handleSupportPress}
            >
              <Text>내 후원</Text>
            </Pressable>
          ) : (
            <Pressable
              style={styles.mySupportNotSelected}
              onPress={handleSupportPress}
            >
              <Text>내 후원</Text>
            </Pressable>
          )}
        </View>
      </View>
      {sortPressed && <SortModal onToggleDelete={handleToggleDelete} />}
    </>
  );
}
