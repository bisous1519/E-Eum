import { atom } from 'recoil';
import {
  NewSupportStateType,
  SupportDetailStateType,
  SupportsStateType,
} from './supportAtomTypes';

const supportsInitialState: SupportsStateType = {
  uid: 0,
  userNickname: '',
  userImagePath: '',
  sid: 0,
  title: '',
  targetAmount: 1000,
  achievementRate: 0,
};

const supportDetailInitialState: SupportDetailStateType = {
  imagePath: null,
  title: '',
  purchaseLink: '',
  purchaseLinkDetail: '',
  regTime: '2023-04-07',
  deadline: '2023-04-07',
  targetAmount: 1000,
  currentAmount: 0,
  achievementRate: 0,
  sponsorIdList: [],
  sponsorImagePathList: [],
  uid: 1,
  userNickname: '',
  userIntroduction: null,
  userImagePath: null,
  tid: 1,
  tagName: '',
  content: '',
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
export const supportsState = atom<SupportsStateType[]>({
  key: 'supportsState',
  default: [supportsInitialState],
});

// 후원 상세 정보
export const supportDetailState = atom<SupportDetailStateType>({
  key: 'supportDetailState',
  default: supportDetailInitialState,
});

// 신규 후원글 작성
export const newSupportState = atom<NewSupportStateType>({
  key: 'newSupportState',
  default: newSupportInitailState,
});
