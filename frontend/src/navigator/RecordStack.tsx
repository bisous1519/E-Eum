import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecordEditor from '../screen/record/RecordEditor';
import Record from '../screen/record/Record';

type RootStackParamList = {
  Record: undefined;
  RecordEditor: { itemId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RecordStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Record'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Record' component={Record} />
      <Stack.Screen name='RecordEditor' component={RecordEditor} />
    </Stack.Navigator>
  );
};

export default RecordStack;

