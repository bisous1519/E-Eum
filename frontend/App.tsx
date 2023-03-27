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
import {
  focusManager,
  QueryClient,
  QueryClientProvider,
  onlineManager,
} from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
import { AppState, Platform } from 'react-native';
import type { AppStateStatus } from 'react-native';

// SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

// 이렇게 쓰는게 맞는지, 필요한건지 잘 모루겟넹
// onlineManager.setEventListener((setOnline) => {
//   return NetInfo.addEventListener((state: any) => {
//     setOnline(!!state.isConnected);
//   });
// });

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

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

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => subscription.remove();
  }, []);

  if (!isReady) return <Landing />;
  else
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style='dark' />
            <NavigationContainer>
              <MainNavigator />
              <Nav />
            </NavigationContainer>
          </SafeAreaView>
        </ThemeProvider>
      </QueryClientProvider>
    );
}

// redux: https://133hyun.tistory.com/59
// react-native-redux:  https://github.com/Yasser-G/react-native-redux
// AsyncStorage: https://react-native-async-storage.github.io/async-storage/docs/usage
