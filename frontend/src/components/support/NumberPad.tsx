import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import theme from '../../utils/theme';
import useDimension from '../../hooks/useDimension';

const { DEVICE_WIDTH, DEVICE_HEIGHT } = useDimension();

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    height: DEVICE_HEIGHT * 0.48,
    padding: DEVICE_WIDTH * 0.05,
  },
  numberButton: {
    width: '30%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  numberText: {
    fontSize: theme.fontSize.big,
    fontWeight: '600',
    color: theme.textColor.main,
  },
});

type NumberPadProps = {
  onNumberPress: (data: string | null) => void;
  onDeletePress: () => void;
};

export default function NumberPad({
  onNumberPress,
  onDeletePress,
}: NumberPadProps): JSX.Element {
  const [numbers, setNumbers] = useState([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    null,
    '0',
  ]);

  const handleNumberPress = (number: string | null) => {
    onNumberPress(number);
  };

  const handleDeleteNumber = () => {
    onDeletePress();
  };

  return (
    <View style={styles.container}>
      {numbers.map((number) => (
        <TouchableOpacity
          key={number}
          style={styles.numberButton}
          onPress={() => handleNumberPress(number)}
        >
          <Text style={styles.numberText}>{number}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.numberButton}
        onPress={() => handleDeleteNumber()}
      >
        <Feather name='delete' style={styles.numberText} />
      </TouchableOpacity>
    </View>
  );
}
