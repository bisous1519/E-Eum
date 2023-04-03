import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import MyBottleItem from '../../components/bottle/MyBottleItem';
import MyBottleModal from '../../components/bottle/MyBottleModal';
import theme from '../../utils/theme';
import useNav from '../../hooks/useNav';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderComp from '../../components/common/HeaderComp';
import { getMyBottles } from '../../modules/apis/bottle/bottleApis';
import {
  MyBottleResStateType,
  MyBottleStateType,
} from '../../modules/apis/bottle/bottleAtomTypes';
import { useRecoilState } from 'recoil';
import {
  myBottleResState,
  myBottlesState,
} from '../../modules/apis/bottle/bottleAtoms';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.background,
    flex: 1,
  },
  itemContainer: {},
});

export default function MyBottle(): JSX.Element {
  const [myBottles, setMyBottles] =
    useRecoilState<MyBottleStateType[]>(myBottlesState);

  const [detailModal, setDetailModal] = useState<boolean>(false);

  const onToggleDetailModal = (): void => {
    setDetailModal((prev) => !prev);
  };

  const fetchData = () => {
    getMyBottles(1).then((data: MyBottleStateType[]) => setMyBottles(data));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComp title='고민 목록' />
      {myBottles ? (
        <FlatList
          data={myBottles}
          renderItem={({ item }) => (
            <MyBottleItem
              item={item}
              onToggleDetailModal={onToggleDetailModal}
            />
          )}
        />
      ) : (
        <></>
      )}
      {detailModal ? (
        <MyBottleModal onToggleDetailModal={onToggleDetailModal} />
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
}
