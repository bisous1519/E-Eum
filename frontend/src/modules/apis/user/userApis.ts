import axios from 'axios';
import { UserUpdateStateType } from './userAtomTypes';

// 회원정보 수정
export async function updateProfile(
  uid: number,
  updateData: UserUpdateStateType
) {
  try {
    const { data } = await axios.put(
      `http://j8a607.p.ssafy.io/api/user/${uid}`,
      {
        updateData,
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
  }
}
