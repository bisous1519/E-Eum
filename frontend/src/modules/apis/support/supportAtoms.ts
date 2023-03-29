import { atom } from 'recoil';
import { NewSupportStateType, SupportsStateType } from './supportAtomTypes';

const supportsInitialState: SupportsStateType = {
  uid: 0,
  userNickname: '',
  userImagePath: '',
  sid: 0,
  title: '',
  targetAmount: 0,
  achievementRate: 0,
};

const newSupportInitailState: NewSupportStateType = {
  userId: 0,
  title: '',
  tid: 0,
  content: '',
  purchaseLink: '',
  purchaseLinkDetail: '',
  targetAmount: 0,
  deadline: '',
  roadAddress: '',
  detailAddress: '',
};

// 후원글 목록
export const supportsState = atom<SupportsStateType>({
  key: 'supportsState',
  default: supportsInitialState,
});

// 신규 후원글 작성
export const newSupportState = atom<NewSupportStateType>({
  key: 'newSupportState',
  default: newSupportInitailState,
});
