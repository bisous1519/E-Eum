import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';
import theme from '../../../utils/theme';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    // backgroundColor: 'gray',
  },
  nameWrapper: {
    position: 'absolute',
    bottom: 7,
    // top: 0,
  },
  name: {
    // position: 'absolute',
    // bottom: 0,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: theme.mainColor.main,
    paddingTop: 20,
    height: 50,
  },
});

export default function InputComp(): JSX.Element {
  const [text, setText] = useState<string>('');
  const onChangeText = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setText(e.nativeEvent.text);
  };
  return (
    <View style={styles.container}>
      <View style={styles.nameWrapper}>
        <Text style={styles.name}>NAME</Text>
      </View>
      <TextInput
        style={styles.input}
        value={text}
        onChange={(e) => onChangeText(e)}
      />
    </View>
  );
}

// https://github.com/necolas/react-native-web/issues/2387
// https://codesandbox.io/s/react-native-keyframe-animation-bug-ts4ib9
