import axios from 'axios';

// 꿈기록 하나 조회
export async function getRecord(recordId: number) {
  try {
    const { data } = await axios.get(
      `http://j8a607.p.ssafy.io/api/dream/record/${recordId}`
    );
    return data;
  } catch (e) {
    console.error(e);
  }
}

// 꿈기록 목록 조회
export async function getRecords(userId: number) {
  try {
    const { data } = await axios.get(
      `http://j8a607.p.ssafy.io/api/dream/record/user/${userId}?tid=`
    );
    return data;
  } catch (e) {
    console.error(e);
  }
}

