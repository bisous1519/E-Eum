import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';

// NOTE: navigate할 component / screen 이름 넣어둬~
type NavigationPropsType = {
  BottleStack?: undefined;
  RecordStack?: undefined;
  SupportStack?: undefined;
  MypageStack?: undefined;
  Notice?: undefined;
  NewRecord?: undefined;
  Signup?: undefined;
  SupportDetail?: undefined;
  NewSupport?: undefined;
};

// type RootStackParamList = {
//   Home?: undefined;
//   BottleStack?: undefined;
//   RecordStack?: undefined;
//   SupportStack?: undefined;
//   MypageStack?: undefined;
//   Notice?: undefined;
//   NewRecord?: undefined;
//   Signup?: undefined;
// };

export default function useNav() {
  const useNav =
    useNavigation<NativeStackNavigationProp<NavigationPropsType>>();
  //   const useNav =
  //     useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();
  return useNav;
}
