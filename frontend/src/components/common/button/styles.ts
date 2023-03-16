import { StyleSheet } from "react-native";
import styled, { css } from "styled-components/native";
import theme from "../../../utils/theme";

export const buttonStyles = StyleSheet.create({
  buttonBox: {
    backgroundColor: theme.mainColor.main,
    padding: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: theme.fontFamily.main,
    fontSize: 25,
    color: theme.textColor.white,
    textAlign: "center",
  },
  buttonTextActive: {
    color: theme.mainColor.light,
  },
});

export const ButtonCompText = styled.Text`
  font-size: 50px;
  color: ${({ theme }) => theme.mainColor.main};
`;
export const ButtonCompBox = styled.Pressable``;
