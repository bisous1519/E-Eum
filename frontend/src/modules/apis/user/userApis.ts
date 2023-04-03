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
