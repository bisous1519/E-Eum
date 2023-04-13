import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import theme from '../../utils/theme';
import HeaderComp from '../../components/common/HeaderComp';
import { SafeAreaView } from 'react-native-safe-area-context';
import ApproveItem from '../../components/admin/ApproveItem';
import ApproveItemType from '../../models/admin/ApproveItemType';
import ApproveModal from '../../components/admin/ApproveModal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'orange',
    backgroundColor: theme.background,
  },
});

const mockup: ApproveItemType[] = [
  {
    id: 1,
    type: 2,
    name: '김자립',
    email: 'ssafy1@naver.com',
    date: '23.03.11',
    imgPath: '',
  },
  {
    id: 2,
    type: 1,
    name: '박자문',
    email: 'ffak_2@naver.com',
    date: '23.03.12',
    imgPath: '',
  },
  {
    id: 3,
    type: 2,
    name: '이자립',
    email: 'ssa_sa@naver.com',
    date: '23.03.13',
    imgPath: '',
  },
  {
    id: 4,
    type: 2,
    name: '나자립',
    email: 'ffysa@naver.com',
    date: '23.03.13',
    imgPath: '',
  },
  {
    id: 5,
    type: 1,
    name: '김자문',
    email: 'zzamun@naver.com',
    date: '23.03.14',
    imgPath: '',
  },
  {
    id: 6,
    type: 2,
    name: '강자립',
    email: 'jarip@naver.com',
    date: '23.03.15',
    imgPath: '',
  },
];

export default function Approve(): JSX.Element {
  const [detailModal, setDetailModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<number>();
  const [confirmArr, setConfirmArr] = useState(
    [...new Array(mockup.length)].map(() => false)
  );

  const onToggleDetailModal = (index?: number) => {
    if (index || index === 0) {
      setSelectedItem(index);
    }
    setDetailModal((prev) => !prev);
  };
  const onPressConfirm = (index: number) => {
    let tempArr = [...confirmArr];
    tempArr[index] = true;
    setConfirmArr([...tempArr]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComp title='승인 관리' />
      <FlatList
        data={mockup}
        renderItem={({ item, index }) => (
          <>
            {!confirmArr[index] ? (
              <ApproveItem
                item={item}
                index={index}
                onToggleDetailModal={onToggleDetailModal}
                onPressConfirm={onPressConfirm}
              />
            ) : (
              <></>
            )}
          </>
        )}
      />
      {detailModal && (selectedItem || selectedItem === 0) ? (
        <ApproveModal
          onToggleModal={onToggleDetailModal}
          item={mockup[selectedItem]}
        />
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
}
