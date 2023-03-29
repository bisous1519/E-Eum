import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import useDimension from '../../hooks/useDimension';
import { AntDesign } from '@expo/vector-icons';
import theme from '../../utils/theme';

const { DEVICE_WIDTH, DEVICE_HEIGHT } = useDimension();

const styles = StyleSheet.create({
  layer: {
    flex: 1,
    backgroundColor: theme.layerColor,
    position: 'absolute',
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

type SortModalPropsType = {
  onToggleDelete: () => void;
};

type SelectedType = {
  option1: boolean;
  option2: boolean;
  option3: boolean;
  option4: boolean;
};

export default function SortModal({
  onToggleDelete,
}: SortModalPropsType): JSX.Element {
  const [selected, setSelected] = useState<SelectedType>({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
  });

  const handleSelected = () => {
    setSelected((prev: SelectedType) => {
      return { ...prev };
    });
  };

  return (
    <View style={styles.layer}>
      <Text>정렬 기준</Text>
      <Pressable>
        <Text>최신순</Text>
        <AntDesign name='check' size={24} color='black' />
      </Pressable>
      <Pressable>
        <Text>마감 임박 순</Text>
        <AntDesign name='check' size={24} color='black' />
      </Pressable>
      <Pressable>
        <Text>달성률 높은 순</Text>
        <AntDesign name='check' size={24} color='black' />
      </Pressable>
      <Pressable>
        <Text>달성률 낮은 순</Text>
        <AntDesign name='check' size={24} color='black' />
      </Pressable>
    </View>
  );
}
