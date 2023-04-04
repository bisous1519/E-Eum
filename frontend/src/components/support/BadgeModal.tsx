import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import theme from '../../utils/theme';
import ModalComp from '../common/ModalComp';
import useDimension from '../../hooks/useDimension';
import { BadgeStateType } from '../../modules/apis/user/userAtomTypes';
import Badge from '../common/Badge';

const { DEVICE_WIDTH, DEVICE_HEIGHT } = useDimension();

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT * 0.3,
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  titleGroup: {
    flexDirection: 'row',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'space-between',
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
});

type BadgeModalPropsType = {
  badge: BadgeStateType;
  onToggleModal: () => void;
};

export default function BadgeModal({
  badge,
  onToggleModal,
}: BadgeModalPropsType): JSX.Element {
  const handlePressBadge = () => {
    onToggleModal();
  };

  return (
    <ModalComp onCloseModal={onToggleModal}>
      <View style={styles.container}>
        <View style={styles.titleGroup}>
          <Badge badge={badge} />
          <Text>{badge.name}</Text>
        </View>
        <View style={styles.infoGroup}>
          <Text style={styles.text}>획득 조건</Text>
          <Text>{badge.description}</Text>
        </View>
      </View>
      <Pressable style={styles.check} onPress={handlePressBadge}>
        <Text style={styles.checkText}>확인</Text>
      </Pressable>
    </ModalComp>
  );
}
