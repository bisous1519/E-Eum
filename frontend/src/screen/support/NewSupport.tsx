import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';

// Text Editor
import {
  actions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';

// Image Picker
import * as ImagePicker from 'expo-image-picker';

// Date Picker
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import ButtonComp from '../../components/common/button/ButtonComp';
import theme from '../../utils/theme';

// 신규 게시물
export default function NewSupport(): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const [context, setContext] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [goal, setGoal] = useState<number>(0);
  // 모집 기한 ==================================================
  const [due, setDue] = useState<string>(new Date().toString());
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date: any) => {
    console.warn('날짜가 선택되었습니다: ', date);
    hideDatePicker();
  };

  const placeholder = '마감 날짜를 선택해주세요';
  const [text, setText] = useState<string>('');
  // ===========================================================

  const [addImage, setAddImage] = useState<string[]>([]);
  const richText = React.useRef();

  // ImagePicker 사용을 위한 부분
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // 사진 O, 동영상 X
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const prevImage = [...addImage];
      prevImage.push(result.assets[0].uri); // 흠..일단 확인 ㄱㄱㄱ
      setAddImage(prevImage);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* 1. 제목 */}
      <View style={styles.write}>
        <Text>제목</Text>
        <TextInput
          placeholder='제목을 입력하세요'
          onChangeText={(e) => setTitle(e)}
        />
      </View>
      {/* 2. 내용 */}
      <View style={styles.write}>
        <Text>내용</Text>
        {/* TextInput 말고 에디터 API 갖다 쓰자..! */}
        <RichEditor
          // ref={richText}
          placeholder='내용을 입력하세요'
          initialHeight={250}
          editorStyle={{ backgroundColor: theme.grayColor.lightGray }}
          androidHardwareAccelerationDisabled={true}
          onChange={(e) => setContext(e)}
        />
        <RichToolbar
          editor={richText}
          actions={[
            actions.insertImage,
            actions.setBold,
            actions.setItalic,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.setStrikethrough,
            actions.setUnderline,
          ]}
        />
      </View>
      {/* 3. 구매링크 */}
      <View style={styles.write}>
        <View style={styles.guideline}>
          <Text>구매링크</Text>
          <Text style={{ fontSize: 8, marginLeft: 5 }}>
            * 후원받으려는 물품의 구매 링크를 입력해주세요
          </Text>
        </View>
        <TextInput
          placeholder='구매링크를 입력하세요'
          onChangeText={(e) => setLink(e)}
        />
      </View>
      {/* 4. 목표금액 */}
      <View style={styles.write}>
        <Text>목표금액</Text>
        <TextInput
          placeholder='목표금액을 입력하세요'
          // onChange={(e) => setGoal(e)}
        />
      </View>
      {/* 5. 사진첨부 */}
      <View style={styles.write}>
        <View style={styles.guideline}>
          <Text>사진첨부</Text>
          <Text style={{ fontSize: 8, marginLeft: 5 }}>
            * 최대 5개까지 첨부 가능합니다
          </Text>
        </View>
        <View style={styles.img}>
          <Button title='+' onPress={pickImage} />
          {/* {addImage && (
              <Image
                source={{ uri: addImage }}
                style={{ width: 200, height: 200 }}
              />
            )} */}
        </View>
        {/* 이곳에 image picker를 쓰고 싶은디..? */}
      </View>
      {/* 6. 마감기한 */}
      <View style={styles.write}>
        <Text>마감기한</Text>
        {/* 이곳에는 date picker를 쓰고 싶은디..! */}
        <TouchableOpacity onPress={showDatePicker}>
          <TextInput
            pointerEvents='none'
            placeholder={placeholder}
            placeholderTextColor={theme.textColor.main}
            style={styles.textInput}
            underlineColorAndroid={theme.mainColor.main}
            editable={false}
            value={text}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode='date'
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </TouchableOpacity>
      </View>
      {/* 000. 등록버튼 */}
      <ButtonComp />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  write: {
    color: theme.textColor.light,
    marginVertical: 10,
    marginHorizontal: 20,
    borderBottomColor: theme.mainColor.light,
    borderBottomWidth: 2,
  },
  guideline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    flex: 1,
    width: 40,
    margin: 8,
  },
  textInput: {
    fontSize: 16,
    color: '#000000',
    height: 50,
    width: 300,
    padding: 10,
  },
});
