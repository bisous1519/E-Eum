export type RecordStateType = {
  id: number;
  content: string;
  regTime: string;
  writerId: number;
  tagName: string;
};

export type RecordsStateType = {
  recordCnt: number;
  dateList: string[];
  recordList: RecordStateType[];
};
