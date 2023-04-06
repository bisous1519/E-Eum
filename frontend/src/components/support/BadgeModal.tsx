import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import theme from '../../utils/theme';
import ModalComp from '../common/ModalComp';
import useDimension from '../../hooks/useDimension';
import Badge from '../common/Badge';

const { DEVICE_WIDTH, DEVICE_HEIGHT } = useDimension();

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT * 0.3,
    paddingVertical: DEVICE_HEIGHT * 0.065,
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  titleGroup: {
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
});

type BadgeModalPropsType = {
  badge: any;
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
          <Badge badge={badge} size={40} />
          <Text style={styles.title}>{badge.name}</Text>
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
