import { atom } from 'recoil';
import {
  RecordProfileStateType,
  RecordsStateType,
  RecordStateType,
  TagStateType,
} from './recordAtomTypes';

// 꿈기록 하나 initialState
const recordInitialState: RecordStateType = {
  id: 0,
  content: '',
  regTime: '',
  writerId: 0,
  tagName: '',
};

// 꿈기록 목록 initialState
const recordsInitialState: RecordsStateType = {
  recordCnt: 0,
  dateList: [],
  recordList: [],
};

// 태그 하나 initialState
const tagInitialState: TagStateType = {
  id: 0,
  name: '',
};

// 꿈피드 회원정보 initialState
const recordProfileInitialState: RecordProfileStateType = {
  nickname: '',
  imagePath: '',
  introduction: '',
  groupName: '',
  dayCnt: 0,
};

// 꿈기록 하나
export const recordState = atom<RecordStateType>({
  key: 'recordState',
  default: recordInitialState,
});

// 꿈기록 목록
export const recordsState = atom<RecordsStateType>({
  key: 'recordsState',
  default: recordsInitialState,
});

// 태그 하나
export const tagState = atom<TagStateType>({
  key: 'tagState',
  default: tagInitialState,
});

// 태그 목록
export const tagsState = atom<TagStateType[]>({
  key: 'tagsState',
  default: [],
});

// 꿈피드 회원정보
export const recordProfileState = atom<RecordProfileStateType>({
  key: 'recordProfileState',
  default: recordProfileInitialState,
});
