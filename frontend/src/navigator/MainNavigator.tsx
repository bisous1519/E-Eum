import React, { useState } from 'react';
import SigninStack from './SigninStack';
import TabNavigator from './TabNavigator';

export default function MainNavigator(): JSX.Element {
  // NOTE: 로그인 기능 구현 전까지는 "로그인화면-false", "나머지 화면들-true" 로 해놓고 구현하면돼염염소고기바베큐
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // return <>{isLoggedIn ? <TabNavigator /> : <SigninStack />}</>;
  return <TabNavigator />;
}

