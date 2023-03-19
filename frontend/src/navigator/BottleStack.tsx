import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Bottle from "../screen/bottle/BottleList";

const Stack = createNativeStackNavigator();

const BottleStack = () => {
  return (
    <Stack.Navigator initialRouteName="Bottle">
      <Stack.Screen name="Bottle" component={Bottle} />
    </Stack.Navigator>
  );
};

export default BottleStack;

