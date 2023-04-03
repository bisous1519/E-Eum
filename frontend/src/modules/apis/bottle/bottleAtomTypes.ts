// 작성한 질문 해류병 목록
export type MyBottleStateType = {
  id: number;
  content: string;
  type: number; // 1: 고민상담 / 2: 전문가상담
  sentiment: number;
  regTime: Date;
};

// 특정 질문에 대한 답변 해류병 목록
export type MyResBottlesStateType = {
  id: number;
  content: string;
  type: number;
  sentiment: number;
  regTime: Date;
  status: number;
  resBottles: ResBottleStateType[];
};

// 답변 해류병
export type ResBottleStateType = {
  id: number;
  userNickname: string | null;
  userBadges: any | null;
  content: string;
  regTime: Date;
  status: number;
};

//작성한 질문 해류병
export type WrittenMessageType = {
  id: number;
  writterId: number;
  content: string;
  type: number;
  sentiment: number;
  ttsPath: string;
  regTime: string;
  status: number;
};

//수신된 해류병 목록
export type ReceivedMessagesType = {
  user_req_bottle_id: number;
  reqBottle: reqBottleType;
};

export type reqBottleType = {
  id: number;
  writterId: number;
  content: string;
  sentiment: number;
  ttsPath: string;
  regTime: string;
  status: number;
};

export type WrittenResMessageType = {
  id: number;
  userReqBottlId: number;
  content: string;
  sentiment: number;
  ttsPath: string;
  regTime: string;
  status: number;
};
