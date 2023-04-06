import React, { useEffect, useRef, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import {
  Animated,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import theme from '../../../utils/theme';
import { shadowStyle } from '../shadowStyle';
import useNav from '../../../hooks/useNav';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
const styles = StyleSheet.create({
  navWrapper: {
    position: 'absolute',
    left: 20,
    bottom: 20,
  },
  navButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    backgroundColor: theme.mainColor.main,
    borderRadius: 50,
  },
  navButtonIcon: {
    fontSize: 25,
    color: theme.textColor.white,
  },
  navListWrapper: {
    width: 160,
    // borderWidth: 5,
    // borderColor: theme.mainColor.main,
    // borderRadius: 15,
    // paddingLeft: 5,
    // paddingRight: 5,
    // paddingTop: 5,
    // paddingBottom: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  listItem: {
    // borderWidth: 3,
    // borderColor: theme.grayColor.darkGray,
    // marginBottom: 5,
    paddingHorizontal: 5,
    height: 40,
    // borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'rgba(0,0,0,0.15)',
    backgroundColor: theme.mainColor.main,
  },
  itemBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  itemIcon: {
    height: 35,
    width: 35,
    display: 'flex',
    borderRadius: 10,
    padding: 7,
    justifyContent: 'center',
    alignContent: 'center',
    // borderWidth: 1,
    marginRight: 10,
    // borderRightWidth: 1,
    // borderStyle: 'dashed',
    // borderColor: theme.grayColor.lightGray,
  },
  itemText: {
    fontFamily: theme.fontFamily.mainMedium,
    fontSize: theme.fontSize.regular,
    textAlignVertical: 'center',
    color: theme.textColor.white,
  },
  TopBorderRadius: {
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    borderBottomColor: theme.grayColor.lightGray,
    borderBottomWidth: 1,
  },
  BottomBorderRadius: {
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
  },
});

type navItemType = {
  icon: any;
  name: string;
  navigateTo: string;
};

const navItem: navItemType[] = [
  {
    icon: <FontAwesome5 name='wine-bottle' size={20} color='white' />,
    name: '고민 상담',
    navigateTo: 'BottleStack',
  },
  {
    icon: (
      <MaterialCommunityIcons
        name='clipboard-edit-outline'
        size={22}
        color='white'
      />
    ),
    name: '꿈기록',
    navigateTo: 'RecordStack',
  },
  {
    icon: <FontAwesome5 name='hand-holding-heart' size={20} color='white' />,
    name: '꿈후원',
    navigateTo: 'SupportStack',
  },
  {
    icon: <Ionicons name='md-person-sharp' size={22} color='white' />,
    name: '마이페이지',
    navigateTo: 'MypageStack',
  },
];

export default function Nav(): JSX.Element {
  const navigation = useNav();
  const [isOpenNav, setIsOpenNav] = useState<boolean>(false);

  const onPressNav = (): void => {
    setIsOpenNav((prev: boolean) => !prev);
  };

  const onPressNavList = (to: string): void => {
    setIsOpenNav(false);
    to === 'BottleStack'
      ? navigation.navigate('BottleBlue')
      : to === 'RecordStack'
      ? navigation.navigate('RecordStack')
      : to === 'SupportStack'
      ? navigation.navigate('SupportStack')
      : navigation.navigate('MypageStack');
  };

  const navListHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpenNav) {
      console.log('if isOpenNav : ' + isOpenNav);
      Animated.timing(navListHeight, {
        toValue: 165,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      console.log('else isOpenNav : ' + isOpenNav);
      Animated.timing(navListHeight, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [isOpenNav]);

  return (
    <View style={styles.navWrapper}>
      {isOpenNav ? (
        <Animated.View
          style={[styles.navListWrapper, { height: navListHeight }]}
        >
          {/* <View style={styles.navListWrapper}> */}
          <FlatList
            data={navItem}
            renderItem={({ item, index }) => (
              <View
                style={StyleSheet.flatten([
                  styles.listItem,
                  item.name === '마이페이지'
                    ? styles.BottomBorderRadius
                    : item.name === '고민 상담'
                    ? styles.TopBorderRadius
                    : {
                        borderBottomColor: theme.grayColor.lightGray,
                        borderBottomWidth: 1,
                      },
                ])}
              >
                <Pressable
                  key={index}
                  onPress={() => onPressNavList(item.navigateTo)}
                >
                  <View style={styles.itemBox}>
                    <Text style={styles.itemIcon}>{item.icon}</Text>
                    <Text style={styles.itemText}>{item.name}</Text>
                  </View>
                </Pressable>
              </View>
            )}
          />
          {/* </View> */}
        </Animated.View>
      ) : (
        <></>
      )}
      <Pressable
        style={StyleSheet.flatten([styles.navButton, shadowStyle.shadow])}
        onPress={onPressNav}
      >
        <Feather name='menu' style={styles.navButtonIcon} />
      </Pressable>
    </View>
  );
}

