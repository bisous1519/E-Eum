import axios from 'axios';
// import { UserUpdateStateType } from './userAtomTypes';

// 회원정보 수정
export async function updateProfile(
  uid: number,
  password: string,
  introduction: string,
  groupName: string
  // updateData: UserUpdateStateType
) {
  try {
    const { data } = await axios.put(
      `http://j8a607.p.ssafy.io/api/user/${uid}`,
      {
        password,
        introduction,
        groupName,
        // updateData,
      }
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
