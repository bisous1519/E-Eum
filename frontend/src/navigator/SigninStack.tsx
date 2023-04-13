import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from '../screen/user/Signin';
import SigninWithPin from '../screen/user/SigninWithPin';
import Signup from '../screen/user/Signup';
import JoinPW from '../screen/user/JoinPW';
import SetNewPW from '../screen/user/SetNewPW';
import Nav from '../components/common/nav/Nav';

const Stack = createNativeStackNavigator();

const SigninStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Signin'
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen
        name='Signin'
        component={Signin}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='SigninWithPin' component={SigninWithPin} />
      <Stack.Screen name='Signup' component={Signup} />
      <Stack.Screen name='JoinPW' component={JoinPW} />
      <Stack.Screen name='SetNewPW' component={SetNewPW} />
    </Stack.Navigator>
  );
};

export default SigninStack;
