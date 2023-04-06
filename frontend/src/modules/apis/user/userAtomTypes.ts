export type UserUpdateStateType = {
  password: string;
  introduction: string;
  groupName: string;
};

export type BadgeStateType = {
  id: number;
  name: string;
  description: string;
  imagePath: string;
};

export type SponsorStateType = {
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

export type SignUpStateType = {
  name: string;
  email: string;
  password: string;
  nickname: string;
  gender: number;
  // image?: string | undefined;
  type: number;
  region: string;
};

export type SignUpReturnType = {
  name: string;
  introduction: string;
  groupName: string;
};

export type EditPWType = {
  name: string;
  introduction: string;
  groupName: string;
};

// 로그인한 사용자 타입
export type LoginUserStateType = {
  uid: number;
  email: string;
  name: string;
  nickname: string;
  gender: 1;
  imagePath: string;
  type: number;
  point: number;
  status: number;
  introduction: string;
  groupName: string;
  region: string;
};
