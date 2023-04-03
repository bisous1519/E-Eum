import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import MyBottleItem from '../../components/bottle/MyBottleItem';
import MyBottleModal from '../../components/bottle/MyBottleModal';
import theme from '../../utils/theme';
import useNav from '../../hooks/useNav';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderComp from '../../components/common/HeaderComp';
import { getSendBottles } from '../../modules/apis/bottle/bottleApis';
import { MyBottleStateType } from '../../modules/apis/bottle/bottleAtomTypes';
import { useRecoilState } from 'recoil';
import { myBottlesState } from '../../modules/apis/bottle/bottleAtoms';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.background,
  },
  itemContainer: {},
});

export default function MyBottle(): JSX.Element {
  const [sendBottles, setSendBottles] =
    useRecoilState<MyBottleStateType[]>(myBottlesState);

  const [detailModal, setDetailModal] = useState<boolean>(false);
  const onToggleDetailModal = (): void => {
    setDetailModal((prev) => !prev);
  };

  const fetchData = () => {
    getSendBottles(1).then((data: MyBottleStateType[]) => setSendBottles(data));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComp title='고민 목록' />
      {sendBottles ? (
        <FlatList
          data={sendBottles}
          renderItem={({ item }) => (
            <MyBottleItem item={item} onPressItem={onToggleDetailModal} />
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

