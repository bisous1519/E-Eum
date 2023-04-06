import React from 'react';
import ModalComp from '../common/ModalComp';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import ApproveItemType from '../../models/admin/ApproveItemType';
import theme from '../../utils/theme';
import useDimension from '../../hooks/useDimension';

const { DEVICE_WIDTH } = useDimension();

const styles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH * 0.7,
  },
  topWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  kindof: {
    fontSize: theme.fontSize.small,
    color: theme.textColor.main,
  },
  headerDivider: {
    marginHorizontal: 7,
  },
  date: {
    color: theme.textColor.light,
    fontSize: theme.fontSize.small,
  },
  userInfo: {
    fontSize: theme.fontSize.regular,
  },
  image: {
    width: '100%',
    // height: 'auto',
    height: 400,
    resizeMode: 'contain',
  },
  closeButton: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: theme.grayColor.lightGray,
    width: '100%',
    alignItems: 'center',
  },
  closeText: {
    fontSize: theme.fontSize.small,
  },
});

type ApproveModalPropsType = {
  onToggleModal: (index?: number) => void;
  item: ApproveItemType;
};

export default function ApproveModal({
  onToggleModal,
  item,
}: ApproveModalPropsType): JSX.Element {
  const onCloseModal = (): void => {
    onToggleModal();
  };
  return (
    <ModalComp onCloseModal={onCloseModal}>
      <View style={styles.container}>
        <View style={styles.topWrapper}>
          <View style={styles.header}>
            <Text style={styles.kindof}>
              {item.type === 1 ? '자문단 신청' : '자립준비청년 인증'}
            </Text>
            <Text style={styles.headerDivider}>.</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
          <Text style={styles.userInfo}>{`${item.name} (${item.email})`}</Text>
        </View>
        <Image
          style={styles.image}
          source={require('../../assets/images/approvalDoc.png')}
        />
      </View>
      <Pressable style={styles.closeButton} onPress={onCloseModal}>
        <Text style={styles.closeText}>닫기</Text>
      </Pressable>
    </ModalComp>
  );
}
