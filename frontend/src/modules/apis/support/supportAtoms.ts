import { atom } from 'recoil';
import { v1 } from 'uuid';
import {
  NewSupportStateType,
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
  targetAmount: 1000,
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

// 후원글 목록
export const supportsState = atom<SupportsStateType>({
  key: 'supportsState${v1}',
  default: supportsInitialState,
});

// 후원 상세 정보
export const supportDetailState = atom<SupportDetailStateType>({
  key: 'supportDetailState${v1}',
  default: supportDetailInitialState,
});

// 신규 후원글 작성
export const newSupportState = atom<NewSupportStateType>({
  key: 'newSupportState${v1}',
  default: newSupportInitailState,
});

// 후원글에 연결된 프로필
export const supportProfileState = atom<SupportProfileStateType>({
  key: 'supportProfileState${v1}',
  default: supportProfileInitailState,
});

// 포인트 후원하기
export const supportPointState = atom<SupportPointStateType>({
  key: 'supportPointState${v1}',
  default: supportPointInitialState,
});
