import { atom } from 'recoil';
import { BadgeStateType, UserUpdateStateType } from './userAtomTypes';

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

// 회원정보 수정
export const updateProfileState = atom<UserUpdateStateType>({
  key: 'updateProfileState',
  default: updateProfileInitialState,
});

// 뱃지 목록
export const badgeListState = atom<BadgeStateType>({
  key: 'badgeListState',
  default: badgeListInitialState,
});
