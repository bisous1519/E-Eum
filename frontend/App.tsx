import { StatusBar } from "react-native";
import styled, { ThemeProvider } from "styled-components/native";
import Home from "./src/pages/Home";
import { theme } from "./src/utils/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar />
      <Home />
    </ThemeProvider>
  );
}
