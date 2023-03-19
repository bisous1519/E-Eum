import React from "react";
import { StyleSheet, Text, View } from "react-native";
import theme from "../../../utils/theme";

const styles = StyleSheet.create({
  navWrapper: {
    width: 20,
    height: 20,
    backgroundColor: theme.mainColor.main,
    position: "relative",
    left: 10,
    bottom: 10,
  },
});

export default function Nav(): JSX.Element {
  return (
    <View style={styles.navWrapper}>
      <Text>nav</Text>
    </View>
  );
}

