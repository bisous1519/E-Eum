import axios from 'axios';
import PostRecordType from '../../../models/record/postRecordType';
import PostTagType from '../../../models/record/postTagType';
import PutDataType from '../../../models/record/putTagType';
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

// 꿈기록 목록 조회 with 태그
export async function getRecordsWithTag(userId: number, tagId: number) {
  try {
    const { data } = await axios.get<RecordsStateType>(
      `http://j8a607.p.ssafy.io/api/dream/record/user/${userId}?tid=${tagId}`
    );
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(error as string);
  }
}

// 꿈기록 작성
export async function postRecord(postData: PostRecordType) {
  try {
    const { data } = await axios.post<RecordStateType>(
      `http://j8a607.p.ssafy.io/api/dream/record`,
      postData
    );
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(error as string);
  }
}

// 꿈기록 수정
export async function putRecord(recordId: number, putData: PostRecordType) {
  try {
    const { data } = await axios.put<RecordStateType>(
      `http://j8a607.p.ssafy.io/api/dream/record/${recordId}`,
      putData
    );
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(error as string);
  }
}

// 꿈기록 삭제
export async function deleteRecord(recordId: number) {
  try {
    const { data } = await axios.delete<RecordStateType>(
      `http://j8a607.p.ssafy.io/api/dream/record/${recordId}`
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

// 태그 생성
export async function postTag(postData: PostTagType) {
  try {
    const { data } = await axios.post<TagStateType>(
      `http://j8a607.p.ssafy.io/api/dream/tag`,
      postData
    );
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(error as string);
  }
}

// 태그 수정
export async function putTag(tagId: number, putData: PutDataType) {
  try {
    const { data } = await axios.put<TagStateType>(
      `http://j8a607.p.ssafy.io/api/dream/tag/${tagId}`,
      putData
    );
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(error as string);
  }
}

// 태그 삭제
export async function deleteTag(tagId: number) {
  try {
    const { data } = await axios.delete<TagStateType>(
      `http://j8a607.p.ssafy.io/api/dream/tag/${tagId}`
    );
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(error as string);
  }
}

// 꿈피드 회원정보 조회
export async function getProfileData(uid: number) {
  try {
    const { data } = await axios.get(
      `http://j8a607.p.ssafy.io/api/user/dream/${uid}`
    );
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
