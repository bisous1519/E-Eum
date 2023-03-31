import axios from 'axios';
import { NewSupportStateType } from './supportAtomTypes';

// 꿈후원 목록 조회
export async function getSupports(sortType: number) {
  try {
    const { data } = await axios.get(
      `http://j8a607.p.ssafy.io/api/dream/support/req?sortType=${sortType}`
    );
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// 꿈후원 게시물 상세 조회
export async function supportDetail(sid: number) {
  try {
    const { data } = await axios.get(
      `http://j8a607.p.ssafy.io/api/dream/support/req/${sid}`
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
