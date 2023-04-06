import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import ButtonComp from '../../components/common/button/ButtonComp';
import InputComp from '../../components/common/input/InputComp';
import useInputText from '../../hooks/useInputText';
import useNav from '../../hooks/useNav';
import theme from '../../utils/theme';
import { getNameAndEmail } from '../../modules/apis/user/userApis';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

const stylesTempBorder = StyleSheet.create({
  //일반 보더 확인용
  Red: {
    // borderWidth: 1,
    // borderColor: 'red',
  },
  Blue: {
    // borderWidth: 1,
    // borderColor: 'blue',
  },
  Yellow: {
    // borderWidth: 1,
    // borderColor: 'yellow',
  },
});

const stylesGlobalContainer = StyleSheet.create({
  scrollContainer: {
    backgroundColor: theme.background,
  },
  //가장 큰 페이지
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.background,
    padding: 0,
    marginBottom: 10,
    marginTop: 20,
  },
});

const stylesInnerContainer = StyleSheet.create({
  //내부 내용 global container
  container: {
    // backgroundColor: 'black',
    // flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.9,
  },
});

const stylesSignupInput = StyleSheet.create({
  box: {
    width: '100%',
    // marginBottom: 10,
    // marginTop: 20,
    // borderBottomWidth: 2,
    // borderBottomColor: theme.mainColor.main,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'flex-end',
    // paddingBottom: 10,
    // height: 60,
  },
});

export default function JoinPW(): JSX.Element {
  const navigation = useNav();

  //이름
  const { text: userName, onChangeText: onChangeUserName } = useInputText();

  //이메일 인증
  const { text: userEmail, onChangeText: onChangeUserEmail } = useInputText();

  const checkAndNext = () => {
    console.log('name : ' + userName);
    console.log('userEMail : ' + userEmail);
    getNameAndEmail(userName, userEmail).then((returndata) =>
      returndata
        ? navigation.push('SetNewPW', { userEmail: userEmail })
        : setReCheck(true)
    );
  };
  const [reCheck, setReCheck] = useState<boolean>(false);

  return (
    <ScrollView style={stylesGlobalContainer.scrollContainer}>
      <View
        style={StyleSheet.flatten([
          stylesTempBorder.Blue,
          stylesGlobalContainer.container,
        ])}
      >
        <View
          testID='inner'
          style={StyleSheet.flatten([
            stylesTempBorder.Red,
            stylesInnerContainer.container,
          ])}
        >
          <View
            style={StyleSheet.flatten([
              stylesTempBorder.Yellow,
              stylesSignupInput.box,
            ])}
          >
            <InputComp
              name={'이름'}
              text={userName}
              onChangeText={onChangeUserName}
            />
          </View>
          <View
            style={StyleSheet.flatten([
              stylesTempBorder.Yellow,
              stylesSignupInput.box,
            ])}
          >
            <InputComp
              name={'이메일'}
              text={userEmail}
              onChangeText={onChangeUserEmail}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <ButtonComp
              text={reCheck ? '다시 시도' : '인증 및 다음'}
              onPressBtn={checkAndNext}
            />
          </View>
        </View>
        {/* inner container */}
      </View>
    </ScrollView>
  );
}
