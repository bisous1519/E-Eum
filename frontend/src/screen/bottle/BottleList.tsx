import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import InputComp from '../../components/common/input/InputComp';
import useDimension from '../../hooks/useDimension';
import theme from '../../utils/theme';
import { useRecoilState } from 'recoil';
import { getRecord } from '../../modules/apis/record/recordApis';
import { recordState } from '../../modules/apis/record/recordAtoms';
import { RecordStateType } from '../../modules/apis/record/recordAtomTypes';

const { DEVICE_WIDTH } = useDimension();
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.background,
    flex: 1,
    alignItems: 'center',
  },
});

export default function BottleList(): JSX.Element {
  const [record, setRecord] = useRecoilState<RecordStateType>(recordState);

  const onPressBtn = (): void => {
    console.log('인증버튼클릭');
    // console.log(record);
  };

  const fetchData = async () => {
    const data = await getRecord(2);
    setRecord(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <KeyboardAwareScrollView
      // style={styles.container}
      keyboardShouldPersistTaps='handled'
      contentContainerStyle={styles.container}
    >
      <View style={{ width: DEVICE_WIDTH * 0.8 }}>
        <Text>BottleList</Text>

        <Text>꿈피드</Text>
        <Text>꿈후원 목록</Text>
        <Text>{record.tagName}</Text>
        <Text>{record.content}</Text>
        <InputComp
          name='EMAIL'
          btn={true}
          btnText='인증'
          onPressBtn={onPressBtn}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

