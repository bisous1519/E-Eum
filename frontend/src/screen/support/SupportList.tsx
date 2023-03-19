import React from "react";
import { Text, View } from "react-native";

export default function SupportList({ navigation }: any): JSX.Element {
  return (
    <View>
      <Text
        style={{ color: "red" }}
        onPress={() => navigation.push("SupportDetail")}
      >
        SupportList
      </Text>
    </View>
  );
}

