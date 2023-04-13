import React, { useEffect } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import theme from '../../utils/theme';
import ModalComp from '../common/ModalComp';
import useDimension from '../../hooks/useDimension';
import Badge from '../common/Badge';
import { useRecoilState } from 'recoil';
import { BadgeStateType } from '../../modules/apis/user/userAtomTypes';
import { badgeListState } from '../../modules/apis/user/userAtoms';
import { getBadgeList } from '../../modules/apis/user/userApis';

const { DEVICE_WIDTH, DEVICE_HEIGHT } = useDimension();

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT * 0.3,
    paddingVertical: DEVICE_HEIGHT * 0.065,
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  title: {
    fontSize: theme.fontSize.regular,
    fontWeight: '500',
  },
  infoGroup: {
    alignItems: 'center',
  },
  text: {
    color: theme.textColor.light,
  },
  check: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: theme.grayColor.lightGray,
    width: '100%',
    alignItems: 'center',
  },
  checkText: {
    fontSize: theme.fontSize.small,
  },
  badge: {
    backgroundColor: theme.textColor.white,
    borderRadius: 5,
    width: DEVICE_WIDTH * 0.12,
    height: DEVICE_WIDTH * 0.12,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: DEVICE_WIDTH * 0.055,
  },
  uniBadge: {
    backgroundColor: theme.textColor.white,
    borderRadius: 5,
    width: DEVICE_WIDTH * 0.12,
    height: DEVICE_WIDTH * 0.12,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: DEVICE_WIDTH * 0.055,
  },
  emptyBox: {
    paddingBottom: DEVICE_HEIGHT * 0.15,
  },
  emptyText: {
    fontSize: theme.fontSize.big,
  },
});

type BadgeModalPropsType = {
  uid: number;
  onToggleModal: () => void;
};

export default function BadgeListModal({
  uid,
  onToggleModal,
}: BadgeModalPropsType): JSX.Element {
  const handlePressBadge = () => {
    onToggleModal();
  };

  const [badgeList, setBadgeList] =
    useRecoilState<BadgeStateType[]>(badgeListState);

  const updateBadgeList = () => {
    getBadgeList(uid).then((badge) => {
      setBadgeList(badge.badgeList);
    });
  };

  useEffect(() => {
    updateBadgeList();
  }, []);

  return (
    <ModalComp onCloseModal={onToggleModal}>
      <View style={styles.container}>
        {badgeList ? (
          <FlatList
            data={badgeList}
            renderItem={(badge) => (
              <View style={styles.uniBadge}>
                <Badge key={badge.item.id} badge={badge.item} size={40} />
              </View>
            )}
            numColumns={3}
          />
        ) : (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>뱃지를 수집중입니다 👊</Text>
          </View>
        )}
      </View>
      <Pressable style={styles.check} onPress={handlePressBadge}>
        <Text style={styles.checkText}>확인</Text>
      </Pressable>
    </ModalComp>
  );
}
