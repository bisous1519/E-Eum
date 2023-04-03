import { atom } from 'recoil';
import {
  MyBottleStateType,
  ReceivedMessagesType,
  ResBottleStateType,
} from './bottleAtomTypes';

// 특정 질문에 대한 답변 해류병 목록 initialState
// const resBottlesInitialState: MyResBottlesStateType = {
//     id: 0,
//     content: "",

// }

// 작성한 질문 해류병 목록
export const myBottlesState = atom<MyBottleStateType[]>({
  key: 'sendBottlesState',
  default: [],
});

// 특정 질문에 대한 답변 해류병 목록
export const resBottlesState = atom<ResBottleStateType>({
  key: 'resBottlesState',
  //   default:
});

export const receivedMessagesListState = atom<ReceivedMessagesType[]>({
  key: 'receivedMessagesList',
  default: [],
});
