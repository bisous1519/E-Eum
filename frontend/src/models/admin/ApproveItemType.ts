type ApproveItemType = {
  id: number;
  type: 1 | 2; // 1: 자문단신청, 2: 자립준비청년 인증
  name: string;
  email: string;
  date: string; // 신청일자
  imgPath: string;
};

export default ApproveItemType;
