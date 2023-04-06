import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Mypage from '../screen/mypage/Mypage';
import PointCharge from '../screen/mypage/PointCharge';
import Nav from '../components/common/nav/Nav';

const Stack = createNativeStackNavigator();

const MypageStack = () => {
  return (
    <>
      <Stack.Navigator initialRouteName='Mypage'>
        <Stack.Screen
          name='Mypage'
          component={Mypage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='PointCharge'
          component={PointCharge}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <Nav />
    </>
  );
};

export default MypageStack;
