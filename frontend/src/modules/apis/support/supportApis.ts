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
    throw e;
  }
}

// 신규 꿈후원 작성
export async function addSupport(data: NewSupportStateType) {
  try {
    await axios.post(`http://j8a607.p.ssafy.io/api/dream/support/req`, {
      userId: data.userId,
      title: data.title,
      tid: data.tid,
      content: data.content,
      purchaseLink: data.purchaseLink,
      purchaseLinkDetail: data.purchaseLinkDetail,
      targetAmount: data.targetAmount,
      deadline: data.deadline,
      roadAddress: data.roadAddress,
      detailAddress: data.detailAddress,
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
}
