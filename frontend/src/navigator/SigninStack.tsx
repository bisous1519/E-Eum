import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from '../screen/user/Signin';
import SigninWithPin from '../screen/user/SigninWithPin';
import Signup from '../screen/user/Signup';

const Stack = createNativeStackNavigator();

const SigninStack = () => {
  return (
    <Stack.Navigator initialRouteName='Signin'>
      <Stack.Screen name='Signin' component={Signin} />
      <Stack.Screen name='SigninWithPin' component={SigninWithPin} />
      <Stack.Screen name='Signup' component={Signup} />
    </Stack.Navigator>
  );
};

export default SigninStack;
