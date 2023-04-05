import axios from 'axios';
import {
  LikeDtoType,
  MyBottleResStateType,
  MyBottleStateType,
  PostBottleReportBodyType,
  PostBottleReportReturnType,
  PostNewBottleReturnType,
} from './bottleAtomTypes';

// 작성한 질문 해류병 목록 조회
export async function getMyBottles(userId: number) {
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

// 특정 질문에 대한 답변 해류병 목록 조회
export async function getMyBottleRes(bottleId: number) {
  try {
    const { data } = await axios.get<MyBottleResStateType>(
      `http://j8a607.p.ssafy.io/api/bottle/req/${bottleId}/res-list`
    );
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(error as string);
  }
}

// 해류병 답변을 신고
export async function postBottleReport(postData: PostBottleReportBodyType) {
  try {
    const { data } = await axios.post<PostBottleReportReturnType>(
      'http://j8a607.p.ssafy.io/api/bottle/report',
      postData
    );
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(error as string);
  }
}

// 해류병 답변에 좋아요
export async function postBottleLike(userId: number, bottleId: number) {
  try {
    const { data } = await axios.post<LikeDtoType>(
      `http://j8a607.p.ssafy.io/api/bottle/res/${bottleId}/like`,
      { userId }
    );
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(error as string);
  }
}

// 새 해류병 질문 작성
export async function postNewBottle(
  writerId: number,
  content: string,
  type: number
) {
  try {
    const { data } = await axios.post<PostNewBottleReturnType>(
      'http://j8a607.p.ssafy.io/api/bottle/req',
      { writerId, content, type }
    );
    return data;
  } catch (error: unknown) {
    console.log('새 해류병 질문 작성 오류');
    console.error(error);
    throw new Error(error as string);
  }
}
