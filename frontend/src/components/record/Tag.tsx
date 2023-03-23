import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import theme from '../../utils/theme';

const styles = StyleSheet.create({
  basicBox: {
    borderColor: theme.mainColor.main,
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: theme.grayColor.lightGray,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedBox: {
    backgroundColor: theme.mainColor.main,
  },
  text: {
    fontSize: theme.fontSize.small,
  },
});

type TagPropsType = {
  text: string;
};

export default function Tag({ text }: TagPropsType): JSX.Element {
  const onPressTag = () => {
    console.log('tag 클릭');
  };
  return (
    <Pressable style={styles.basicBox} onPress={onPressTag}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

