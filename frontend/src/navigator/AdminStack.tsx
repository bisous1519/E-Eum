import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminMain from '../screen/admin/AdminMain';
import Approve from '../screen/admin/Approve';

const Stack = createNativeStackNavigator();

const AdminStack = () => {
  return (
    <Stack.Navigator initialRouteName='AdminMain'>
      <Stack.Screen
        name='AdminMain'
        component={AdminMain}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Approve'
        component={Approve}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AdminStack;

