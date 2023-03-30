import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RecordStateType } from '../modules/apis/record/recordAtomTypes';

type RootStackParamList = {
  BottleStack?: undefined;
  RecordStack?: undefined;
  SupportStack?: undefined;
  MypageStack?: undefined;
  Notice?: undefined;
  RecordEditor?: { item: RecordStateType } | undefined;
  Signup?: undefined;
  SupportDetail?: undefined;
  NewSupport?: undefined;
  JoinPW?: undefined;
  SetNewPW?: undefined;
  Signin?: undefined;
  BottleGreen?: undefined;
  BottleBlue?: undefined;
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
  const useNav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  //   const useNav =
  //     useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();
  return useNav;
}

