import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewRecord from '../screen/record/NewRecord';
import Record from '../screen/record/Record';

const Stack = createNativeStackNavigator();

const RecordStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Record'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Record' component={Record} />
      <Stack.Screen name='NewRecord' component={NewRecord} />
    </Stack.Navigator>
  );
};

export default RecordStack;
