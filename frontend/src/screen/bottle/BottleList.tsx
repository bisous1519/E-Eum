import React from 'react';
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import InputComp from '../../components/common/input/InputComp';
import useDimension from '../../hooks/useDimension';
import theme from '../../utils/theme';
const { DEVICE_WIDTH } = useDimension();
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.background,
    flex: 1,
    alignItems: 'center',
  },
});

export default function BottleList(): JSX.Element {
  const onPressBtn = (): void => {
    console.log('인증버튼클릭');
  };
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
        <Text>마이페이지</Text>
        <Text>알림</Text>
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

