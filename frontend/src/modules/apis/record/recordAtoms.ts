import { atom } from 'recoil';
import { RecordsStateType, RecordStateType } from './recordAtomTypes';

const recordInitialState: RecordStateType = {
  id: 0,
  content: '',
  regTime: '',
  writerId: 0,
  tagName: '',
};

const recordsInitialState: RecordsStateType = {
  recordCnt: 0,
  dateList: [],
  recordList: [],
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

