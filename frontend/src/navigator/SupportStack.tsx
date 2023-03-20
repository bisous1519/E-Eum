import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SupportDetail from '../screen/support/SupportDetail';
import SupportList from '../screen/support/SupportList';

const Stack = createNativeStackNavigator();

const SupportStack = () => {
  return (
    <Stack.Navigator initialRouteName='SupportList'>
      <Stack.Screen name='SupportList' component={SupportList} />
      <Stack.Screen name='SupportDetail' component={SupportDetail} />
    </Stack.Navigator>
  );
};

export default SupportStack;
