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

// 꿈후원 검색 조회
export async function searchSupports(keyword: string) {
  try {
    const { data } = await axios.get(
      `http://j8a607.p.ssafy.io/api/dream/support/req/search?keyword=${keyword}`
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

// 후원글 프로필 조회
export async function checkProfile(uid: number) {
  try {
    const { data } = await axios.get(
      `http://j8a607.p.ssafy.io/api/user/support/${uid}`
    );
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// 일회성 후원
export async function supportPoint(sid: number, uid: number, point: number) {
  try {
    await axios.post(
      `http://j8a607.p.ssafy.io/api/dream/support/res?sid=${sid}&uid=${uid}&point=${point}`
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// 정기후원
export async function regularSupport(
  sponsorId: number,
  uid: number,
  point: number,
  paymentDate: number
) {
  try {
    await axios.post(`http://j8a607.p.ssafy.io/api/user/sponsorship`, {
      sponsorId,
      uid,
      point,
      paymentDate,
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
}
