import AsyncStorage from '@react-native-async-storage/async-storage';

type SetDataPropsType = {
  key: string;
  value: string;
};

export const setStorageData = async ({ key, value }: SetDataPropsType) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    //saving error
  }
};

// Storing object value //
// const setStorageData = async (value) => {
//   try {
//     const jsonValue = JSON.stringify(value);
//     await AsyncStorage.setItem('@storage_Key', jsonValue);
//   } catch (e) {
//     // saving error
//   }
// };

export const getStorageData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
};

// Reading object value //
// const getStorageData = async () => {
//   try {
//     const jsonValue = await AsyncStorage.getItem('@storage_Key');
//     return jsonValue != null ? JSON.parse(jsonValue) : null;
//   } catch (e) {
//     // error reading value
//   }
// };
