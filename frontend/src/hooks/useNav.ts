import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RecordStateType } from '../modules/apis/record/recordAtomTypes';

export type RootStackParamList = {
  // BottleStack?: undefined;
  RecordStack?: undefined;
  SupportStack?: undefined;
  MypageStack?: undefined;
  Mypage?: undefined;
  PointCharge?: undefined;
  Notice?: undefined;
  Record?: undefined;
  RecordEditor?: { item: RecordStateType } | undefined;
  Signup?: undefined;
  SupportDetail?: undefined;
  SupportProfile?: { uid: number } | undefined;
  NewSupport?: undefined;
  SupportRecord?: { uid: number; tid: number };
  JoinPW?: undefined;
  SetNewPW?: undefined;
  Signin?: undefined;
  BottleGreen?: undefined;
  BottleBlue?: undefined;
  MyBottle?: undefined;
  WritingPaper?: { messageType: number; newMessage: boolean }; // 1:일반 상담, 2: 전문가 상담 // true: 새 질문, false: 질문 답장
  AdminStack?: undefined;
  AdminMain?: undefined;
  Approve?: undefined;
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

