import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Notice from '../screen/notice/Notice';
import BottleStack from './BottleStack';
import MypageStack from './MypageStack';
import RecordStack from './RecordStack';
import SupportStack from './SupportStack';
import SigninStack from './SigninStack';
import AdminStack from './AdminStack';
import Nav from '../components/common/nav/Nav';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <>
      <Tab.Navigator
        initialRouteName='SigninStack'
        screenOptions={{ headerShown: false }}
        tabBar={() => null}
      >
        <Tab.Screen
          name='SigninStack'
          component={SigninStack}
          options={{ title: '로그인' }}
        />
        <Tab.Screen
          name='BottleBlue'
          component={BottleStack}
          options={{ title: '해류병 목록' }}
        />
        <Tab.Screen
          name='RecordStack'
          component={RecordStack}
          options={{ title: '꿈피드', unmountOnBlur: true }}
        />
        <Tab.Screen
          name='SupportStack'
          component={SupportStack}
          options={{ title: '꿈후원 목록' }}
        />
        <Tab.Screen
          name='MypageStack'
          component={MypageStack}
          options={{ title: '마이페이지' }}
        />
        <Tab.Screen
          name='AdminStack'
          component={AdminStack}
          options={{ title: '관리자' }}
        />
      </Tab.Navigator>
    </>
  );
}
