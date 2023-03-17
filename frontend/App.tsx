import { useEffect, useCallback, useState } from "react";
import { ThemeProvider } from "styled-components/native";
import Home from "./src/screen/home/Home";
import { theme } from "./src/utils/theme";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import useFonts from "./src/hooks/useFonts";
import Landing from "./src/screen/landing/Landing";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  t: {
    color: "black",
    fontFamily: "Yeongdo",
  },
});

// SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
  const [isReady, setIsReady] = useState(false);
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  const loadFonts = async () => {
    await useFonts();
    setIsFontLoaded(true);
  };

  useEffect(() => {
    if (isFontLoaded) {
      setTimeout(() => {
        // SplashScreen.hideAsync();
        setIsReady(true);
      }, 2000);
    }
  }, [isFontLoaded]);

  useEffect(() => {
    loadFonts();
  }, []);

  if (!isReady) return <Landing />;
  else
    return (
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            {/* <SafeAreaView style={styles.page}>
              <StatusBar style="dark" />
              <Text style={styles.t}>하이하이</Text>
            </SafeAreaView> */}
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    );
}
