import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottleBlue from '../screen/bottle/BottleBlue';
import BottleGreen from '../screen/bottle/BottleGreen';
import MyBottle from '../screen/bottle/MyBottle';
import WritingPaper from '../screen/bottle/WritingPaper';
import Nav from '../components/common/nav/Nav';

const Stack = createNativeStackNavigator();

const BottleStack = () => {
  return (
    <>
      <Stack.Navigator initialRouteName='BottleBlue'>
        <Stack.Screen name='BottleBlue' component={BottleBlue} />
        <Stack.Screen name='BottleGreen' component={BottleGreen} />
        <Stack.Screen
          name='MyBottle'
          component={MyBottle}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='WritingPaper' component={WritingPaper} />
      </Stack.Navigator>
      <Nav />
    </>
  );
};

export default BottleStack;
