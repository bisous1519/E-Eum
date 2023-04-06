import { atom } from 'recoil';
import {
  NewSupportStateType,
  RegularSupportStateType,
  SupportDetailStateType,
  SupportPointStateType,
  SupportProfileStateType,
  SupportsStateType,
} from './supportAtomTypes';

const supportsInitialState: SupportsStateType = {
  uid: 0,
  userNickname: '',
  userImagePath: '',
  sid: 0,
  title: '',
  targetAmount: 0,
  achievementRate: 0,
};

const supportDetailInitialState: SupportDetailStateType = {
  imagePath: null,
  title: '',
  purchaseLink: '',
  purchaseLinkDetail: '',
  regTime: '',
  deadline: '',
  targetAmount: 1,
  currentAmount: 0,
  achievementRate: 0,
  sponsorIdList: [],
  sponsorImagePathList: [],
  uid: 1,
  userNickname: '',
  userIntroduction: '',
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

const supportProfileInitailState: SupportProfileStateType = {
  uid: 1,
  nickname: '',
  introduction: null,
  imagePath: null,
};

const supportPointInitialState: SupportPointStateType = {
  sid: 1,
  uid: 1,
  point: 1,
};

const regularSupportInitialState: RegularSupportStateType = {
  sponsorId: 1,
  uid: 1,
  point: 0,
  paymentDate: 5,
};

// 후원글 목록
export const supportsState = atom<SupportsStateType[]>({
  key: 'supportsState',
  default: [],
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

// 후원글에 연결된 프로필
export const supportProfileState = atom<SupportProfileStateType>({
  key: 'supportProfileState',
  default: supportProfileInitailState,
});

// 일회성 후원하기
export const supportPointState = atom<SupportPointStateType>({
  key: 'supportPointState',
  default: supportPointInitialState,
});

// 정기 후원하기
export const regularSupportState = atom<RegularSupportStateType>({
  key: 'regularSupportState',
  default: regularSupportInitialState,
});

// 정렬 기준
export const sortType = atom<number>({
  key: 'sortType',
  default: 1,
});

// flag
export const flag = atom<boolean>({
  key: 'flag',
  default: false,
});
