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
