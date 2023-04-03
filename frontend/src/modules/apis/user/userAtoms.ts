import { atom } from 'recoil';
import { UserUpdateStateType } from './userAtomTypes';

const updateProfileInitialState: UserUpdateStateType = {
  password: '',
  introduction: '',
  groupName: '',
};

// 회원정보 수정
export const updateProfileState = atom<UserUpdateStateType>({
  key: 'updateProfileState',
  default: updateProfileInitialState,
});
