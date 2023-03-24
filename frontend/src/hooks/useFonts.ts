import * as Font from 'expo-font';

export default async function useFonts() {
  await Font.loadAsync({
    // Pretendard: require('../assets/fonts/PretendardVariable.ttf'),
    PretendardRegular: require('../assets/fonts/Pretendard-Regular.otf'),
    PretendardMedium: require('../assets/fonts/Pretendard-Medium.otf'),
    PretendardSemiBold: require('../assets/fonts/Pretendard-SemiBold.otf'),
    PretendardThin: require('../assets/fonts/Pretendard-Thin.otf'),
    PretendardBlack: require('../assets/fonts/Pretendard-Black.otf'),
    PretendardBold: require('../assets/fonts/Pretendard-Bold.otf'),
    PretendardExtraBold: require('../assets/fonts/Pretendard-ExtraBold.otf'),
    PretendardExtraLight: require('../assets/fonts/Pretendard-ExtraLight.otf'),
    PretendardLight: require('../assets/fonts/Pretendard-Light.otf'),
    Yeongdo: require('../assets/fonts/Yeongdo.ttf'),
    YeongdoOTF: require('../assets/fonts/YeongdoOTF.otf'),
  });
}
