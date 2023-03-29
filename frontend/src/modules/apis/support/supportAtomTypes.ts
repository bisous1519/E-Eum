export type SupportsStateType = {
  uid: number;
  userNickname: string;
  userImagePath: string;
  sid: number;
  title: string;
  targetAmount: number;
  achievementRate: number;
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
