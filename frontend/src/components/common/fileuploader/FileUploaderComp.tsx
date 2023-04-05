import React, { useState, useEffect } from 'react';
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import theme from '../../../utils/theme';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  addButton: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  addButtonInnerBorder: {
    width: '100%',
    height: '100%',
    borderWidth: 3,
    borderColor: theme.grayColor.darkGray,
    borderStyle: 'dashed',
    borderRadius: 10,
  },
  addButtonText: {
    textAlign: 'center',
    fontSize: theme.fontSize.bigger,
    color: theme.grayColor.darkGray,
  },
  defaultBox: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: theme.grayColor.darkGray,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.grayColor.lightGray,
    borderStyle: 'dashed',
  },
  imageBox: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: theme.mainColor.dark,
  },
});

type FileUploaderCompPropsType = {
  imageUri: string; //기본으로 설정하는 이미지 uri Input
  onChangeImageUri: (newImageUri: string) => void; //선택한 이미지를 export하는 onChange 함수
};

export default function FileUploaderComp(props: FileUploaderCompPropsType) {
  const noImage = require('../../../assets/images/defaultimage(noimage).jpg');
  const [image, setImage] = useState<string>(props.imageUri);

  const getPermissionSelect = async () => {
    if (Platform.OS !== 'web') {
      //웹이가 모바일이가 니 (헉)
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('갤러리 접근 권한이 필요합니다.');
        return false;
      }
    }
    return true;
  };

  const selectImage = async () => {
    console.log('이미지 선택하기');
    let imageData = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, //모든 이미지 타입
      allowsEditing: true, //이미지 수정 여부
      aspect: [4, 4], //이미지 비율
      quality: 1, //용량수정
    });

    if (!imageData.canceled) {
      setImage(imageData.assets[0].uri);
    }
  };
  useEffect(() => {
    console.log('FileUploader Comp image: ' + image);
    props.onChangeImageUri(image);
  }, [image]);

  const handlePressSelectImage = async () => {
    if (await getPermissionSelect()) {
      await selectImage();
      // console.log('imageData(pick) : ' + image);
    }
  };

  // const getPermissionTake = async () => {
  //   if (Platform.OS !== 'web') {
  //     //웹이가 모바일이가 니 (헉)
  //     const { status } = await ImagePicker.requestCameraPermissionsAsync();
  //     if (status !== 'granted') {
  //       alert('카메라 접근 권한이 필요합니다.');
  //       return false;
  //     }
  //     return true;
  //   }
  // };

  // const takeImage = async () => {
  //   console.log('이미지 촬영하기');
  //   let imageData = await ImagePicker.launchCameraAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All, //모든 이미지 타입
  //     allowsEditing: true, //이미지 수정 여부
  //     aspect: [4, 4], //이미지 비율
  //     quality: 1, //용량수정
  //   });

  //   if (!imageData.canceled) {
  //     setImage(imageData.assets[0].uri);
  //   }
  // };

  // const handlePressTakeImage = async () => {
  //   if (await getPermissionTake()) {
  //     await takeImage();
  //     // console.log('imageData(take) : ' + image);
  //   }
  // };

  return (
    <View style={styles.container}>
      {/* <Pressable onPress={handlePressTakeImage}>
        <Text>이미지 촬영</Text>
      </Pressable> */}
      <View style={styles.defaultBox}>
        <Pressable
          style={image === '' ? styles.addButton : null}
          onPress={handlePressSelectImage}
        >
          {image === '' ? (
            <Text style={styles.addButtonText}>+</Text>
          ) : (
            <Image source={{ uri: image }} style={styles.imageBox} />
          )}
        </Pressable>
      </View>
    </View>
  );
}
