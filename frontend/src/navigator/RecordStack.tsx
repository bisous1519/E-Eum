import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecordEditor from '../screen/record/RecordEditor';
import Record from '../screen/record/Record';
import Nav from '../components/common/nav/Nav';
import { RecordStateType } from '../modules/apis/record/recordAtomTypes';
import SupportProfile from '../screen/support/SupportProfile';
import NewSupport from '../screen/support/NewSupport';

export type RootStackParamList = {
  Record: undefined;
  RecordEditor: { item?: RecordStateType; itemId?: number } | undefined;
  SupportProfile: { uid: number };
  NewSupport: { tid: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RecordStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName='Record'
        screenOptions={{ headerShown: false, gestureDirection: 'horizontal' }}
      >
        <Stack.Screen name='Record' component={Record} />
        <Stack.Screen name='RecordEditor' component={RecordEditor} />
        <Stack.Screen
          name='SupportProfile'
          component={SupportProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='NewSupport'
          component={NewSupport}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <Nav />
    </>
  );
};

export default RecordStack;

