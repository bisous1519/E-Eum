import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native';
import useDimension from '../../hooks/useDimension';
import theme from '../../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

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
    marginRight: 15,
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
  const [sortPressed, setSortPressed] = useState<boolean>(false);
  const [supportPressed, setSupportPressed] = useState<boolean>(false);

  // 검색 input값
  const [keyword, setKeyword] = useState<string>('');

  // input에 입력된 값을 search에 저장
  const handleInput = (e: any) => {
    console.log(e.nativeEvent.text);
    setKeyword(e);
  };

  // 검색 API를 푸슝
  const handleSearch = () => {
    console.log('검색 API로 결과 목록 가져오기');
  };

  const handleSupportPress = () => {
    setSupportPressed((prev) => !prev);
    if (supportPressed) {
      console.log('전체 후원을 보여주는 API');
    } else {
      console.log('내 후원만 보여주는 API');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Ionicons name='search' size={22} style={styles.searchIcon} />
        <TextInput
          value={keyword}
          onChange={handleInput}
          onSubmitEditing={handleSearch}
        />
      </View>
      <View style={styles.rightContent}>
        <Pressable style={styles.sort}>
          <View style={styles.sortBox}>
            <MaterialIcons
              name='keyboard-arrow-down'
              size={24}
              color={theme.mainColor.dark}
            />
            <Text>최신순</Text>
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
  );
}
