import { atom } from 'recoil';
import { v1 } from 'uuid';
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
  title: '제목',
  purchaseLink: '경로',
  purchaseLinkDetail: '링크설명',
  regTime: '2023-04-07',
  deadline: '2023-04-07',
  targetAmount: 1000,
  currentAmount: 0,
  achievementRate: 0,
  sponsorIdList: [],
  sponsorImagePathList: [],
  uid: 1,
  userNickname: '작성자',
  userIntroduction: '작성자 소개',
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
