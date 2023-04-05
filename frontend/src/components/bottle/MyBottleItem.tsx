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
  onToggleDetailModal: () => void;
};

export default function MyBottleItem({
  item,
  onToggleDetailModal,
}: MyBottleItemPropsType): JSX.Element {
  const [myBottleRes, setMyBottleRes] =
    useRecoilState<MyBottleResStateType>(myBottleResState);

  const [date, setNewDate] = useDate();
  // const [date, setDate] = useState();
  const [type, setType] = useState<'고민 상담' | '전문가 상담'>();

  const onPressItem = (bottleId: number) => {
    // getMyBottleRes(bottleId)
    //   .then((data) => setMyBottleRes(data))
    //   .then(() => {
    //     // console.log(myBottleRes);
    onToggleDetailModal();
    //   });
  };

  const fetchData = () => {
    getMyBottleRes(item.id).then((data: MyBottleResStateType) =>
      setMyBottleRes(data)
    );
    // .then(() => {
    //   // console.log(myBottleRes);
    //   onToggleDetailModal();
    // });
  };

  useEffect(() => {
    if (item) {
      // // 날짜 형식 세팅
      (setNewDate as (regTime: Date) => void)(item.regTime);
      // 타입 세팅
      item.type === 1 ? setType('고민 상담') : setType('전문가 상담');
    }
  }, [item]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {item ? (
        <Pressable
          style={styles.container}
          onPress={() => onPressItem(item.id)}
        >
          <View style={styles.leftWrapper}>
            <View style={styles.header}>
              {date ? <Text style={styles.date}>{date as string}</Text> : <></>}
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
            {myBottleRes && !myBottleRes.resRead ? (
              <View style={styles.newBadge}></View>
            ) : (
              <></>
            )}
            <Text style={styles.count}>+{item.resCnt}</Text>
          </View>
        </Pressable>
      ) : (
        <></>
      )}
    </>
  );
}

