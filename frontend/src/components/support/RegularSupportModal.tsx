import React, { useState } from 'react';
import ModalComp from '../common/ModalComp';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import useDimension from '../../hooks/useDimension';
import theme from '../../utils/theme';

const { DEVICE_WIDTH, DEVICE_HEIGHT } = useDimension();

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT * 0.4,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: DEVICE_HEIGHT * 0.04,
  },
  miniTitle: {
    fontSize: theme.fontSize.regular,
  },
  pointBox: {
    alignItems: 'center',
  },
  pointInput: {
    fontSize: theme.fontSize.bigger,
    width: DEVICE_WIDTH * 0.5,
    borderBottomWidth: 1,
    borderBottomColor: theme.mainColor.main,
  },
  dateBox: {},
  button: {
    borderTopWidth: 1,
    borderTopColor: theme.grayColor.lightGray,
    paddingTop: DEVICE_HEIGHT * 0.03,
    width: DEVICE_WIDTH * 0.6,
    alignItems: 'center',
  },
});

type RegularSupportModalPropsType = {
  onToggleDelete: () => void;
};

export default function RegularSupportModal({
  onToggleDelete,
}: RegularSupportModalPropsType): JSX.Element {
  const [supportPoint, setSupportPoint] = useState<number>(0);

  const handleSupportPoint = (e: any) => {
    setSupportPoint(e);
  };

  const handleRegularSupport = () => {
    onToggleDelete();
    console.log('정기후원 등록 API');
  };

  return (
    <ModalComp onCloseModal={onToggleDelete}>
      <View style={styles.container}>
        <View style={styles.pointBox}>
          <Text style={styles.miniTitle}>후원금액</Text>
          <TextInput
            style={styles.pointInput}
            autoFocus={true}
            keyboardType='number-pad'
            value={supportPoint.toString()}
            onChange={handleSupportPoint}
          />
        </View>
        <View style={styles.dateBox}>
          <Text style={styles.miniTitle}>후원일자</Text>
        </View>
        <Pressable onPress={handleRegularSupport} style={styles.button}>
          <Text>정기후원</Text>
        </Pressable>
      </View>
    </ModalComp>
  );
}
