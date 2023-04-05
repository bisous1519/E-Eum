import { atom } from 'recoil';
import {
  BadgeStateType,
  SponsorStateType,
  UserUpdateStateType,
} from './userAtomTypes';

const updateProfileInitialState: UserUpdateStateType = {
  password: '',
  introduction: '',
  groupName: '',
};

const badgeListInitialState: BadgeStateType = {
  id: 0,
  name: '',
  description: '',
  imagePath: '',
};

const sponsorInitialState: SponsorStateType = {
  uid: 1,
  imagePath: '',
  nickname: '',
  isConnected: undefined,
  sponsorId: 1,
  sponsorshipId: undefined,
  sponsorshipPoint: undefined,
  sponsorshipPaymentDate: undefined,
  countFromRegDate: undefined,
  myPoint: 0,
};

// 회원정보 수정
export const updateProfileState = atom<UserUpdateStateType>({
  key: 'updateProfileState',
  default: updateProfileInitialState,
});

// 뱃지 목록
export const badgeListState = atom<BadgeStateType[]>({
  key: 'badgeListState',
  default: [badgeListInitialState],
});

// 프로필(마이페이지 /)
export const sponsorState = atom<SponsorStateType>({
  key: 'sponsorState',
  default: sponsorInitialState,
});
