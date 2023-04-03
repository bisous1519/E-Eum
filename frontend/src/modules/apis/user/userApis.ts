import axios from 'axios';

// 이메일 인증 전송
export async function postEmailVerify(userEmail: string) {
  try {
    const { data } = await axios.post<string>(
      `http://j8a607.p.ssafy.io/api/user/join?email=${userEmail}`
    );
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(error as string);
  }
}
