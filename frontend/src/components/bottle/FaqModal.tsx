import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetFooter,
} from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Pressable, Linking } from 'react-native';
import useDimension from '../../hooks/useDimension';
import FaqType from '../../models/user/faqType';
import theme from '../../utils/theme';
import TextRender from '../common/editor/TextRender';

const { DEVICE_WIDTH } = useDimension();

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // width: DEVICE_WIDTH,
  },
  contentContainer: {
    // backgroundColor: 'orange',
    // width: '100%',
    flex: 1,
  },
  contentWrapper: {
    width: DEVICE_WIDTH * 0.7,
  },
  faqTitle: {
    textAlign: 'center',
    fontSize: theme.fontSize.big,
    color: theme.textColor.main,
    marginVertical: 20,
  },
  faqContent: {
    fontSize: theme.fontSize.regular,
    color: theme.textColor.main,
  },
  faqLinkTo: {
    fontSize: theme.fontSize.regular,
    color: theme.mainColor.dark,
    textDecorationLine: 'underline',
    marginVertical: 20,
  },
  btnWrapper: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: theme.grayColor.lightGray,
  },
  btnText: {
    textAlign: 'center',
    color: theme.textColor.main,
    fontSize: theme.fontSize.small,
  },
});

type FaqModalPropsType = {
  data: FaqType;
  onCloseFaqModal: () => void;
};

export default function FaqModal({
  data,
  onCloseFaqModal,
}: FaqModalPropsType): JSX.Element {
  const sheetRef = useRef<BottomSheet>(null);
  const [content, setContent] = useState<string>(
    '<div>작성하신 내용을 바탕으로 추천된 정보입니다.<br></div>'
  );

  const onPressLink = () => {
    Linking.openURL(data.urlLink);
  };

  const onCloseBottomSheet = () => {
    sheetRef.current?.close();
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        // appearsOnIndex={1}
        // disappearsOnIndex={0}
        pressBehavior={'close'}
      />
    ),
    []
  );

  const renderFooterBtn = useCallback(
    (props: any) => (
      <BottomSheetFooter {...props} bottomInset={24}>
        <Pressable onPress={onCloseBottomSheet} style={styles.btnWrapper}>
          <Text style={styles.btnText}>닫기</Text>
        </Pressable>
      </BottomSheetFooter>
    ),
    []
  );

  useEffect(() => {
    if (data.content) {
      setContent((prev) => {
        return prev + data.content;
      });
    }
  }, []);

  return (
    <BottomSheet
      ref={sheetRef}
      index={0}
      enablePanDownToClose={true}
      snapPoints={['70%', '100%']}
      style={styles.container}
      backdropComponent={renderBackdrop}
      footerComponent={renderFooterBtn}
      onClose={onCloseFaqModal}
    >
      {data ? (
        <BottomSheetFlatList
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          data={[data]}
          renderItem={({ item }) => (
            <View style={styles.contentWrapper}>
              <Text style={styles.faqTitle}>{item.title}</Text>
              <TextRender content={content} style={{ marginVertical: 10 }} />
              <Text onPress={onPressLink} style={styles.faqLinkTo}>
                {item.urlName}
              </Text>
            </View>
          )}
        />
      ) : (
        <></>
      )}
    </BottomSheet>
  );
}

