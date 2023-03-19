import React from "react";
import { Text, View } from "react-native";

export default function BottleList({ navigation }: any): JSX.Element {
  return (
    <View>
      <Text>BottleList</Text>

      <Text
        style={{ color: "red" }}
        onPress={() => navigation.navigate("RecordStack")}
      >
        꿈피드
      </Text>
      <Text>꿈후원 목록</Text>
      <Text>마이페이지</Text>
      <Text>알림</Text>
    </View>
  );
}

