import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/utils/theme';
import Home from './src/pages/Home';

// Import Components
import Notification from './src/pages/Notification';
import Donation from './src/pages/Donation';
import Counsel from './src/pages/Counsel';
import Diary from './src/pages/Diary';
import Profile from './src/pages/Profile';
import LogIn from './src/pages/LogIn';
import SignUp from './src/pages/SignUp';

// Stack Navigation 함수를 Stack이라는 변수명으로 저장
const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='LogIn' component={LogIn} />
          <Stack.Screen name='SignUp' component={SignUp} />
        </Stack.Navigator>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Notification' component={Notification} />
          <Stack.Screen name='Donation' component={Donation} />
          <Stack.Screen name='Counsel' component={Counsel} />
          <Stack.Screen name='Diary' component={Diary} />
          <Stack.Screen name='Profile' component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
