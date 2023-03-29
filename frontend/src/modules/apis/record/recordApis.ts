import axios from 'axios';
import {
  RecordsStateType,
  RecordStateType,
  TagStateType,
} from './recordAtomTypes';

// 꿈기록 하나 조회
export async function getRecord(recordId: number) {
  try {
    const { data } = await axios.get<RecordStateType>(
      `http://j8a607.p.ssafy.io/api/dream/record/${recordId}`
    );
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(error as string);
  }
}

// 꿈기록 목록 조회
export async function getRecords(userId: number) {
  try {
    const { data } = await axios.get<RecordsStateType>(
      `http://j8a607.p.ssafy.io/api/dream/record/user/${userId}?tid=`
    );
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(error as string);
  }
}

// 태그 목록 조회
export async function getTags(userId: number) {
  try {
    const { data } = await axios.get<TagStateType[]>(
      `http://j8a607.p.ssafy.io/api/dream/tag/user?uid=${userId}`
    );
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(error as string);
  }
}
