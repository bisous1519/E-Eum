import axios from 'axios';
import {
  SignUpReturnType,
  SignUpStateType,
  UserUpdateStateType,
} from './userAtomTypes';

// 프로필(마이페이지 / 후원자) 정보
export async function getSponsorProfile(uid: number, sponsorId: number) {
  try {
    const { data } = await axios.get(
      `http://j8a607.p.ssafy.io/api/user/sponsorship?uid=${uid}&sponsorId=${sponsorId}`
    );
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// 회원정보 수정
export async function updateProfile(
  uid: number,
  updateData: UserUpdateStateType
) {
  try {
    const { data } = await axios.put(
      `http://j8a607.p.ssafy.io/api/user/${uid}`,
      updateData
    );
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// 뱃지 목록
export async function getBadgeList(uid: number) {
  try {
    const { data } = await axios.get(
      `http://j8a607.p.ssafy.io/api/user/badge/${uid}`
    );
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// 이메일 인증 전송
export async function postEmailVerify(userEmail: string) {
  try {
    const { data } = await axios.post<string>(
      `http://j8a607.p.ssafy.io/api/user/join?email=${userEmail}`
    );
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(error as string);
  }
}

// 포인트 충전
export async function chargePoint(uid: number, point: number) {
  try {
    const { data } = await axios.put(
      `http://j8a607.p.ssafy.io/api/user/point/buy/${uid}`,
      { point }
    );
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// 회원가입
export async function postSignUp(postData: SignUpStateType) {
  try {
    const { data } = await axios.post<SignUpReturnType>(
      `http://j8a607.p.ssafy.io/api/user`,
      postData
    );
    return data;
  } catch (e) {
    console.log('회원가입 에러');
    console.error(e);
    throw e;
  }
}
