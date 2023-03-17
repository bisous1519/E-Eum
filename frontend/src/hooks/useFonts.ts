import * as Font from "expo-font";

export default async function useFonts() {
  await Font.loadAsync({
    Pretendard: require("../assets/fonts/PretendardVariable.ttf"),
    Yeongdo: require("../assets/fonts/Yeongdo.ttf"),
    YeongdoOTF: require("../assets/fonts/YeongdoOTF.otf"),
  });
}
