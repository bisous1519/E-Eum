export type SupportsStateType = {
  uid: number;
  userNickname: string;
  userImagePath: string;
  sid: number;
  title: string;
  targetAmount: number;
  achievementRate: number;
};

export type SupportDetailStateType = {
  imagePath: string | null;
  title: string;
  purchaseLink: string;
  purchaseLinkDetail: string;
  regTime: string;
  deadline: string;
  targetAmount: number;
  currentAmount: number;
  achievementRate: number;
  sponsorIdList: number[];
  sponsorImagePathList: string[];
  uid: number;
  userNickname: string;
  userIntroduction: string | null;
  userImagePath: string | null;
  tid: number;
  tagName: string;
  content: string;
};

export type NewSupportStateType = {
  userId: number;
  title: string;
  tid: number;
  content: string;
  purchaseLink: string;
  purchaseLinkDetail: string;
  targetAmount: number;
  deadline: string;
  roadAddress: string;
  detailAddress: string;
};

export type SupportProfileStateType = {
  uid: number;
  nickname: string;
  introduction: string | null;
  imagePath: string | null;
};

export type SupportPointStateType = {
  sid: number;
  uid: number;
  point: number;
};

export type RegularSupportStateType = {
  sponsorId: number;
  uid: number;
  point: number;
  paymentDate: number;
};

export type SupportStatusStateType = {
  uid: number;
  imagePath: string | undefined;
  nickname: string;
  isConnected: boolean | undefined;
  sponsorId: number | undefined;
  sponsorshipId: number | undefined;
  sponsorshipPoint: number | undefined;
  sponsorshipPaymentDate: number | undefined;
  countFromRegDate: number | undefined;
  myPoint: number | undefined;
};
