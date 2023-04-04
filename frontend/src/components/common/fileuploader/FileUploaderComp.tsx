import React from 'react';
import { Platform, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

type FileUploaderCompPropsType = {};

export default function FileUploaderComp({}: FileUploaderCompPropsType) {
  const getPermission = async () => {
    if (Platform.OS !== 'web') {
      //웹이가 모바일이가 니 (헉)
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('카메라 및 갤러리 접근 권한이 필요합니다.');
        return false;
      }
      return true;
    }
  };

  const pickImage = async () => {
    console.log('이미지 선택하기');
    let imageData = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, //모든 이미지 타입
      allowsEditing: true, //이미지 수정 여부
      aspect: [4, 4], //이미지 비율
      quality: 1, //용량수정
    });
  };

  return <View></View>;
}
