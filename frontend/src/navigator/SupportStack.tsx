import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomHeader from '../components/support/CustomHeader';
import NewSupport from '../screen/support/NewSupport';
import SupportDetail from '../screen/support/SupportDetail';
import SupportList from '../screen/support/SupportList';

const Stack = createNativeStackNavigator();

const SupportStack = () => {
  return (
    <Stack.Navigator initialRouteName='SupportList'>
      <Stack.Screen
        name='SupportList'
        component={SupportList}
        options={{ headerTitle: '', header: () => <CustomHeader /> }}
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

// 각 화면으로 넘어갈 때 어떤 데이터를 넘겨줄 것인지 지정
export type RootStackParamList = {
  SupportList: undefined;
  SupportDetail: { sid: number };
  NewSupport: undefined;
};
