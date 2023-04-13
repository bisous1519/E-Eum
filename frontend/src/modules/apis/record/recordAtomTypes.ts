// 꿈기록 하나
export type RecordStateType = {
  id: number;
  content: string;
  regTime: string;
  writerId: number;
  tagName: string;
};

// 꿈기록 목록
export type RecordsStateType = {
  recordCnt: number;
  dateList: string[];
  recordList: RecordListType[];
};

type RecordListType = RecordStateType[];

// 태그 하나
export type TagStateType = {
  id: number;
  name: string;
};

// 꿈피드 회원정보
export type RecordProfileStateType = {
  nickname: string;
  imagePath: string | undefined;
  introduction: string | undefined;
  groupName: string | undefined;
  dayCnt: number | undefined;
};
