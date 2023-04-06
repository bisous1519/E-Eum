import React, { useState } from 'react';
import ModalComp from '../common/ModalComp';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import useDimension from '../../hooks/useDimension';
import theme from '../../utils/theme';
import { regularSupport } from '../../modules/apis/support/supportApis';

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
    paddingBottom: DEVICE_HEIGHT * 0.02,
  },
  pointBox: {
    alignItems: 'center',
  },
  pointInput: {
    fontSize: theme.fontSize.bigger,
    width: DEVICE_WIDTH * 0.5,
    borderBottomWidth: 1,
    borderBottomColor: theme.mainColor.main,
    textAlign: 'center',
  },
  dateBox: {
    height: DEVICE_HEIGHT * 0.1,
    alignItems: 'center',
  },
  dateTag: {
    height: DEVICE_HEIGHT * 0.03,
    width: DEVICE_WIDTH * 0.15,
    borderRadius: 15,
    backgroundColor: theme.mainColor.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: DEVICE_WIDTH * 0.02,
  },
  dateText: {
    color: theme.textColor.white,
  },
  button: {
    borderTopWidth: 1,
    borderTopColor: theme.grayColor.lightGray,
    paddingTop: DEVICE_HEIGHT * 0.03,
    width: DEVICE_WIDTH * 0.6,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: theme.fontSize.small,
    fontWeight: '700',
  },
});

type RegularSupportModalPropsType = {
  uid: number;
  sid: number;
  onToggleDelete: () => void;
};

export default function RegularSupportModal({
  uid,
  sid,
  onToggleDelete,
}: RegularSupportModalPropsType): JSX.Element {
  const [supportPoint, setSupportPoint] = useState<number>(0);
  const [date, setDate] = useState<number>(5);

  // 정기후원 결제일자
  const dateArr: number[] = [5, 15, 25];

  const handleSupportPoint = (e: any) => {
    setSupportPoint(e);
  };

  const handleDatePress = (data: number) => {
    setDate(data);
  };

  const handleRegularSupport = async () => {
    await regularSupport(uid, sid, supportPoint, date);
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
            // value={supportPoint}
            onChange={handleSupportPoint}
          />
        </View>
        <View style={styles.dateBox}>
          <Text style={styles.miniTitle}>후원일자</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dateArr.map((data) => (
              <TouchableOpacity
                key={data}
                style={styles.dateTag}
                activeOpacity={0.6}
                onPress={() => handleDatePress(data)}
              >
                <Text style={styles.dateText}>{data}일</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <Pressable onPress={handleRegularSupport} style={styles.button}>
          <Text style={styles.buttonText}>정기후원</Text>
        </Pressable>
      </View>
    </ModalComp>
  );
}
