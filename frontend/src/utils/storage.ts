import EncryptedStorage from 'react-native-encrypted-storage';

type SetUserTokenPropsType = {
  refreshToken: string;
  accessToken: string;
};

export async function setUserToken({
  accessToken,
  refreshToken,
}: SetUserTokenPropsType): Promise<void> {
  try {
    await EncryptedStorage.clear();

    await EncryptedStorage.setItem('access_token', accessToken);
    await EncryptedStorage.setItem('refresh_token', refreshToken);
  } catch (error: unknown) {
    console.log(error);
  }
}

export async function getUserAccessToken(): Promise<void> {
  try {
    const session = await EncryptedStorage.getItem('access_token');

    if (session !== undefined) {
      // retrieved value
    }
  } catch (error: unknown) {
    console.log(error);
  }
}

export async function getUserRefreshToken(): Promise<void> {
  try {
    const session = await EncryptedStorage.getItem('refresh_token');

    if (session !== undefined) {
      // retrieved value
    }
  } catch (error: unknown) {
    console.log(error);
  }
}

