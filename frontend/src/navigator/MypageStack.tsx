import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Mypage from '../screen/mypage/Mypage';
import UpdateMypage from '../screen/mypage/UpdateMypage';

const Stack = createNativeStackNavigator();

const MypageStack = () => {
  return (
    <Stack.Navigator initialRouteName='Mypage'>
      <Stack.Screen
        name='Mypage'
        component={Mypage}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='UpdateMypage' component={UpdateMypage} />
    </Stack.Navigator>
  );
};

export default MypageStack;
