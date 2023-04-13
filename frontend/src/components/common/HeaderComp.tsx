import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import theme from '../../utils/theme';
import { AntDesign } from '@expo/vector-icons';
import useNav from '../../hooks/useNav';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 70,
  },
  headerTitle: {
    marginLeft: 15,
    color: theme.textColor.main,
    fontSize: theme.fontSize.big,
    fontFamily: theme.fontFamily.title,
  },
});

type HeaderCompPropsType = {
  title: string;
};

export default function HeaderComp({ title }: HeaderCompPropsType) {
  const navigation = useNav();
  const onPressBack = (): void => {
    navigation.pop();
  };
  return (
    <View style={styles.header}>
      <AntDesign
        name='arrowleft'
        size={24}
        color='black'
        onPress={onPressBack}
      />
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

