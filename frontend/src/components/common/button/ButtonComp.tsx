import React from 'react';
import { Button, Pressable, Text, View } from 'react-native';
import { ButtonCompBox, ButtonCompText, buttonStyles } from './styles';

export default function ButtonComp() {
  const onPressButton = () => {
    console.log('버튼누름!');
  };

  return (
    <View>
      <ButtonCompBox onPress={onPressButton}>
        {({ pressed }) => (
          <ButtonCompText>{pressed ? '눌림' : '버튼이라고!'}</ButtonCompText>
        )}
      </ButtonCompBox>
      <Pressable style={buttonStyles.buttonBox} onPress={onPressButton}>
        {({ pressed }) => (
          <Text
            style={
              !pressed
                ? buttonStyles.buttonText
                : [buttonStyles.buttonText, buttonStyles.buttonTextActive]
            }
          >
            버어튼
          </Text>
        )}
      </Pressable>
    </View>
  );
}
