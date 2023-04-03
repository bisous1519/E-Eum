import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottleBlue from '../screen/bottle/BottleBlue';
import BottleGreen from '../screen/bottle/BottleGreen';
import MessagePaper from '../screen/bottle/MessagePaper';
import WritingPaperBlue from '../screen/bottle/WritingPaperBlue';
import WritingPaperGreen from '../screen/bottle/WritingPaperGreen';
import MyBottle from '../screen/bottle/MyBottle';
import WritingResPaperBlue from '../screen/bottle/WritingResPaperBlue';

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
      <Stack.Screen name='WritingPaperBlue' component={WritingPaperBlue} />
      <Stack.Screen name='WritingPaperGreen' component={WritingPaperGreen} />
      <Stack.Screen
        name='WritingResPaperBlue'
        component={WritingResPaperBlue}
      />
      {/* <Stack.Screen name='WritingResPaperGreen' component={WritingResPaperGreen} /> */}
      <Stack.Screen
        name='MyBottle'
        component={MyBottle}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default BottleStack;
