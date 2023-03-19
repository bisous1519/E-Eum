import React from "react";
import { ImageBackground } from "react-native";

export default function Landing() {
  return (
    <ImageBackground
      source={require("../../assets/images/splash.png")}
      style={{ flex: 1 }}
    />
  );
}
