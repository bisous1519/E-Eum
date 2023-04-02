import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MyBottleItem from '../../components/bottle/MyBottleItem';
import MyBottleModal from '../../components/bottle/MyBottleModal';
import theme from '../../utils/theme';
import useNav from '../../hooks/useNav';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderComp from '../../components/common/HeaderComp';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.background,
  },
  itemContainer: {},
});

export default function MyBottle(): JSX.Element {
  const [detailModal, setDetailModal] = useState<boolean>(false);
  const onToggleDetailModal = (): void => {
    setDetailModal((prev) => !prev);
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComp title='고민 목록' />
      <ScrollView style={styles.itemContainer}>
        <MyBottleItem onPressItem={onToggleDetailModal} />
        <MyBottleItem onPressItem={onToggleDetailModal} />
        <MyBottleItem onPressItem={onToggleDetailModal} />
        <MyBottleItem onPressItem={onToggleDetailModal} />
        <MyBottleItem onPressItem={onToggleDetailModal} />
        <MyBottleItem onPressItem={onToggleDetailModal} />
        <MyBottleItem onPressItem={onToggleDetailModal} />
        <MyBottleItem onPressItem={onToggleDetailModal} />
        <MyBottleItem onPressItem={onToggleDetailModal} />
        <MyBottleItem onPressItem={onToggleDetailModal} />
        <MyBottleItem onPressItem={onToggleDetailModal} />
        <MyBottleItem onPressItem={onToggleDetailModal} />
        <MyBottleItem onPressItem={onToggleDetailModal} />
      </ScrollView>
      {detailModal ? (
        <MyBottleModal onToggleDetailModal={onToggleDetailModal} />
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
}

