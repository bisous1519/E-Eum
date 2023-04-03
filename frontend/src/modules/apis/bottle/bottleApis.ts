import axios from 'axios';
import {
  MyBottleStateType,
  ReceivedMessagesType,
  WrittenMessageType,
  WrittenResMessageType,
} from './bottleAtomTypes';
import PostWrittenMessageType from '../../../models/bottle/postWrittenMessageType';
import PostWrittenResMessageType from '../../../models/bottle/postWrittenResMessage';

// 작성한 질문 해류병 목록 조회
export async function getSendBottles(userId: number) {
  try {
    const { data } = await axios.get<MyBottleStateType[]>(
      `http://j8a607.p.ssafy.io/api/bottle/sender/${userId}/list`
    );
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(error as string);
  }
}

// 질문 해류병 작성
export async function postWrittenMessage(postData: PostWrittenMessageType) {
  try {
    const { data } = await axios.post<WrittenMessageType>(
      `http://j8a607.p.ssafy.io/api/bottle/req`,
      postData
    );
    console.log('WrittenMEssage 성공');
    return data;
  } catch (error: unknown) {
    console.log('WrittenMessageError');
    console.error(error);
    throw new Error(error as string);
  }
}

// 수신된 해류병 목록 조회
export async function getReceivedMessages(userId: number) {
  try {
    const { data } = await axios.get<ReceivedMessagesType[]>(
      `http://j8a607.p.ssafy.io/api/bottle/receiver/${userId}/list`
    );
    return data;
  } catch (error: unknown) {
    console.log('getReceivedMessageError');
    console.error(error);
    throw new Error(error as string);
  }
}

// 답변 해류병 작성
export async function postWrittenResMessage(userId: number, content: string) {
  try {
    const { data } = await axios.post<WrittenResMessageType>(
      `http://j8a607.p.ssafy.io/api/bottle/${userId}/res`,
      { content }
    );
    return data;
  } catch (error: unknown) {
    console.log('getWrittenResMesasgeError');
    console.error(error);
    throw new Error(error as string);
  }
}
