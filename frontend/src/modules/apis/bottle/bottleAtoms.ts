import { atom } from 'recoil';
import { MyBottleResStateType, MyBottleStateType } from './bottleAtomTypes';

// 특정 질문에 대한 답변 해류병 목록 initialState
const myBottleResInitialState: MyBottleResStateType = {
  id: 0,
  content: '',
  writerId: 0,
  type: 1,
  sentiment: 0,
  regTime: new Date(),
  status: 1,
  read: false,
  resRead: false,
  resBottles: [],
};

// 작성한 질문 해류병 목록
export const myBottlesState = atom<MyBottleStateType[]>({
  key: 'sendBottlesState',
  default: [],
});

// 특정 질문에 대한 답변 해류병 목록
export const myBottleResState = atom<MyBottleResStateType>({
  key: 'resBottlesState',
  default: myBottleResInitialState,
});

