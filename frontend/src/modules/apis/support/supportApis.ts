import axios from 'axios';
import { NewSupportStateType } from './supportAtomTypes';

// 꿈후원 목록 조회
export async function getSupports() {
  try {
    const { data } = await axios.get(
      `http://j8a607.p.ssafy.io/api/dream/support/req?sortType=1`
    );
    return data;
  } catch (e) {
    console.error(e);
  }
}

// 신규 꿈후원 작성
export async function addSupport(data: NewSupportStateType) {
  try {
    await axios.post(`http://j8a607.p.ssafy.io/api/dream/support/req`, {
      data: data,
    });
  } catch (e) {
    console.error(e);
  }
}
