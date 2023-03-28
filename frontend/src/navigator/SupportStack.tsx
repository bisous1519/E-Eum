import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewSupport from '../screen/support/NewSupport';
import SupportDetail from '../screen/support/SupportDetail';
import SupportList from '../screen/support/SupportList';

const Stack = createNativeStackNavigator();

const SupportStack = () => {
  return (
    <Stack.Navigator initialRouteName='SupportList'>
      <Stack.Screen
        name='꿈후원'
        component={SupportList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='SupportDetail'
        component={SupportDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='NewSupport'
        component={NewSupport}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SupportStack;
