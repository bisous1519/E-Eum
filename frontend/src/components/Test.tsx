import React from "react";
import styled from "styled-components/native";
import { ThemeType } from "../utils/theme";

const Gg = styled.Text<{ theme: ThemeType }>`
  color: ${({ theme }) => theme.mainColor.dark};
`;

export default function Test() {
  return <Gg>fffffffffff</Gg>;
}
