import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Mypage from '../screen/mypage/Mypage';

const Stack = createNativeStackNavigator();

const MypageStack = () => {
  return (
    <Stack.Navigator initialRouteName='Mypage'>
      <Stack.Screen name='Mypage' component={Mypage} />
    </Stack.Navigator>
  );
};

export default MypageStack;
