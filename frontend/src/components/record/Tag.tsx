import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TagStateType } from '../../modules/apis/record/recordAtomTypes';
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
  tag: TagStateType;
  isSelected?: boolean;
  onPressTag: () => void;
  onLongPressTag?: (tag: TagStateType) => void;
};

export default function Tag({
  tag,
  isSelected,
  onPressTag,
  onLongPressTag,
}: TagPropsType): JSX.Element {
  const onLongPress = () => {
    if (onLongPressTag) {
      onLongPressTag(tag);
    }
  };
  return (
    <Pressable
      style={StyleSheet.flatten([
        styles.basicTag,
        isSelected && styles.selectedTag,
      ])}
      onPress={onPressTag}
      onLongPress={onLongPress}
    >
      <Text style={styles.text}>{tag.name}</Text>
    </Pressable>
  );
}
