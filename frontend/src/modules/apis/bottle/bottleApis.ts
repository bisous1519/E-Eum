import axios from 'axios';
import {
  ExpertBottlesReturnType,
  LikeDtoType,
  MyBottleResStateType,
  MyBottleStateType,
  NormalBottlesReturnType,
  PostBottleReportBodyType,
  PostBottleReportReturnType,
  PostNewBottleReturnType,
  PostResponseBottleReturnType,
  TossBottleReturnType,
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
  type: number,
  gender: number
) {
  try {
    const { data } = await axios.post<PostNewBottleReturnType>(
      `http://j8a607.p.ssafy.io/api/bottle/req?gender=${gender}`,
      { writerId, content, type }
    );
    return data;
  } catch (error: unknown) {
    console.log('새 해류병 질문 작성 오류');
  }
}

// 답변 해류병 작성
export async function postResponseBottle(
  gender: number,
  userReqBottleId: number,
  content: string
) {
  try {
    const { data } = await axios.post<PostResponseBottleReturnType>(
      `http://j8a607.p.ssafy.io/api/bottle/${userReqBottleId}/res?gender=${gender}`,
      { content }
    );
    return data;
  } catch (error: unknown) {
    console.log('답변 해류병 작성 오류');
    console.error(error);
    throw new Error(error as string);
  }
}

// 수신된 답변 해류병 new 체크
export async function getResNew(userId: number) {
  try {
    const { data } = await axios.get<boolean>(
      `http://j8a607.p.ssafy.io/api/bottle/receiver/${userId}/res-new`
    );
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(error as string);
  }
}

// 수신된 일반 해류병 목록 조회
export async function getNormalBottles(userId: number) {
  try {
    const { data } = await axios.get<NormalBottlesReturnType>(
      `http://j8a607.p.ssafy.io/api/bottle/receiver/${userId}/normal-list`
    );
    return data;
  } catch (error: unknown) {
    console.log('수신된 일반 해류병 목록 조회 오류');
    console.error(error);
    throw new Error(error as string);
  }
}

// 수신된 전문가 해류병 목록 조회
export async function getExpertBottles(userId: number) {
  try {
    const { data } = await axios.get<ExpertBottlesReturnType>(
      `http://j8a607.p.ssafy.io/api/bottle/receiver/${userId}/expert-list`
    );
    return data;
  } catch (error: unknown) {
    console.log('수신된 전문가 해류병 목록 조회 오류');
    console.error(error);
    throw new Error(error as string);
  }
}

//다른 사람에게 해류병 토스
export async function postTossBottle(
  userReqBottleId: number,
  reqBottleWriterId: number,
  userId: number,
  reqBottleType: number
) {
  try {
    const { data } = await axios.post<TossBottleReturnType>(
      `http://j8a607.p.ssafy.io/api/bottle/${userReqBottleId}/toss`,
      { reqBottleWriterId, userId, reqBottleType }
    );
    return data;
  } catch (error: unknown) {
    console.log('해류병 토스 오류');
    console.error(error);
    throw new Error(error as string);
  }
}
