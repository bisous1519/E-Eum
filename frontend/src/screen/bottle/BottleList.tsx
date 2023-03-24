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
import theme from '../../utils/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.background,
    flex: 1,
  },
});

export default function BottleList(): JSX.Element {
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      keyboardShouldPersistTaps='handled'
    >
      <View>
        <Text>BottleList</Text>

        <Text>꿈피드</Text>
        <Text>꿈후원 목록</Text>
        <Text>마이페이지</Text>
        <Text>알림</Text>
        <InputComp name='EMAIL' pw={true} />
      </View>
    </KeyboardAwareScrollView>
  );
}
