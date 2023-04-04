// 해류병 타입
export type BottleType_normal = 1; // 1: 고민상담
export type BottleType_expert = 2; // 2: 전문가상담
export const BOTTLETYPE_NORMAL: string = '고민상담';
export const BOTTLETYPE_EXPERT: string = '전문가상담';
// ---
export type BottleType = BottleType_normal | BottleType_expert;

// 감정 타입
type SentimentType_normal = 0; // 0: 중립
type SentimentType_positive = 1; // 1: 긍정
type SentimentType_negative = -1; // -1: 부정
// ---
export type SentimentType =
  | SentimentType_normal
  | SentimentType_positive
  | SentimentType_negative;

// 해류병 상태
type StatusType_normal = 1; // 1: 정상
type StatusType_deleted = 2; // 2: 삭제됨
type StatusType_reported = 3; // 3: 신고됨
// ---
export type StatusType =
  | StatusType_normal
  | StatusType_deleted
  | StatusType_reported;

// 해류병 신고된 상태
type ReportStatusType_received = 0; // 0: 신고접수
type ReportStatusType_handled = 1; // 1: 신고처리
// ---
export type ReportStatusType =
  | ReportStatusType_received
  | ReportStatusType_handled;

// 신고된 타입
type ReportType_reqBottle = 1; // 고민 작성된 해류병
type ReportType_resBottle = 2; // 답변 작성된 해류병
type ReportType_record = 3; // 꿈기록
type ReportType_support = 4; // 꿈후원 글
type ReportType_user = 5; // 회원 신고
// ---
export type ReportType =
  | ReportType_reqBottle
  | ReportType_resBottle
  | ReportType_record
  | ReportType_support
  | ReportType_user;
// --- 신고된 타입
export const REPORT_TYPE = {
  reqBottle: 1,
  resBottle: 2,
  record: 3,
  support: 4,
  user: 5,
};

// ---------------------------------------------

// 작성한 질문 해류병 목록
export type MyBottleStateType = {
  id: number;
  content: string;
  type: BottleType;
  sentiment: SentimentType;
  regTime: Date;
  resCnt: number;
};

// 특정 질문에 대한 답변 해류병 목록
export type MyBottleResStateType = {
  id: number;
  content: string;
  type: BottleType;
  sentiment: SentimentType;
  regTime: Date;
  status: StatusType;
  writerId: number;
  read: boolean;
  resRead: boolean;
  resBottles: ResBottleStateType[];
};

// 답변 해류병
export type ResBottleStateType = {
  id: number;
  userNickname: string | null;
  userBadges: any[] | null;
  content: string;
  ttsPath: string | null;
  regTime: Date;
  status: StatusType;
  likeDto: LikeDtoType | null;
};

// 답변 해류병 좋아요 리턴 타입
export type LikeDtoType = {
  id: number;
  userId: number;
  resBottleId: number;
};

// 해류병 신고 바디 타입
export type PostBottleReportBodyType = {
  type: number;
  targetId: number;
  content: string;
};

// 해류병 신고 리턴 타입
export type PostBottleReportReturnType = {
  id: number;
  type: number;
  targetId: number;
  content: string;
  regTime: Date;
  status: StatusType;
};

