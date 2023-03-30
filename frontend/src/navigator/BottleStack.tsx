import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottleBlue from '../screen/bottle/BottleBlue';
import BottleGreen from '../screen/bottle/BottleGreen';
import MessagePaper from '../screen/bottle/MessagePaper';

const Stack = createNativeStackNavigator();

const BottleStack = () => {
  return (
    <Stack.Navigator initialRouteName='BottleBlue'>
      <Stack.Screen name='BottleBlue' component={BottleBlue} />
      <Stack.Screen name='BottleGreen' component={BottleGreen} />
      <Stack.Screen
        name='MessagePaper'
        component={MessagePaper}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default BottleStack;
