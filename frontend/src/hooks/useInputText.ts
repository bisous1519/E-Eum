import { useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

interface useInputTextProps {
  initialValue?: string;
}

export default function useInputText({ initialValue }: useInputTextProps = {}) {
  const [text, setText] = useState<string>(initialValue ?? '');

  const onChangeText = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setText(e.nativeEvent.text);
  };

  return { text, onChangeText, setText };
}
