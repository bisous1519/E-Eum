import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
  return (
    <View style={styles.basicBox}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

