import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import theme from '../../utils/theme';

const styles = StyleSheet.create({
  basicTag: {
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
  selectedTag: {
    backgroundColor: theme.mainColor.main,
  },
  text: {
    fontSize: theme.fontSize.small,
  },
});

type TagPropsType = {
  text: string;
  isSelected?: boolean;
  onPressTag: () => void;
};

export default function Tag({
  text,
  isSelected,
  onPressTag,
}: TagPropsType): JSX.Element {
  return (
    <Pressable
      style={StyleSheet.flatten([
        styles.basicTag,
        isSelected && styles.selectedTag,
      ])}
      onPress={onPressTag}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

