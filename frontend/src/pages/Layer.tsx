import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import Test from "../components/Test";

const LayerContainer = styled.View``;

type LayerPropsType = {
  children: React.ReactNode;
};

export default function Layer({ children }: LayerPropsType) {
  return <LayerContainer>{children}</LayerContainer>;
}
