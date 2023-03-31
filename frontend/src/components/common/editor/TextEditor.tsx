import React, { useState, useRef } from 'react';
import { View } from 'react-native';
// Text Editor
import {
  actions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import theme from '../../../utils/theme';

type TextEditorInputType = {
  // input type이 뭔지 모르니..일단 any
  onChangeContext: (data: any) => void;
  context?: string;
};

export default function TextEditor({
  onChangeContext,
  context = '',
}: TextEditorInputType): JSX.Element {
  const richText = useRef<RichEditor>(null);
  return (
    <View>
      <RichEditor
        ref={richText}
        placeholder='내용을 입력하세요'
        initialContentHTML={context}
        initialFocus={false}
        initialHeight={500}
        editorStyle={{ backgroundColor: theme.background }}
        androidHardwareAccelerationDisabled={true}
        onChange={onChangeContext}
      />
      <RichToolbar
        editor={richText}
        selectedIconTint={theme.mainColor.dark}
        actions={[
          actions.insertImage,
          actions.setBold,
          actions.setItalic,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.setStrikethrough,
          actions.setUnderline,
        ]}
        style={{ backgroundColor: theme.background }}
        onPressAddImage={() => {}}
      />
    </View>
  );
}

