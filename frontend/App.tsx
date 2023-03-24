import { useEffect, useCallback, useState } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/utils/theme';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import useFonts from './src/hooks/useFonts';
import Landing from './src/screen/landing/Landing';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabNavigator from './src/navigator/TabNavigator';
import Nav from './src/components/common/nav/Nav';
import MainNavigator from './src/navigator/MainNavigator';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

// SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();
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
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar style='dark' />
          <NavigationContainer>
            <MainNavigator />
            <Nav />
          </NavigationContainer>
        </SafeAreaView>
      </ThemeProvider>
    );
}
