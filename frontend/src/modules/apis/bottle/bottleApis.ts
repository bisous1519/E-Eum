import axios from 'axios';
import { MyBottleStateType } from './bottleAtomTypes';

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

