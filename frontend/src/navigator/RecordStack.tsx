import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Record from "../screen/record/Record";

const Stack = createNativeStackNavigator();

const RecordStack = () => {
  return (
    <Stack.Navigator initialRouteName="Record">
      <Stack.Screen name="Record" component={Record} />
    </Stack.Navigator>
  );
};

export default RecordStack;

