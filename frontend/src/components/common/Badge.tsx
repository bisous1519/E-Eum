import React from 'react';
import {
  ImageBackground,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import styled from 'styled-components/native';
import BadgeType from '../../models/user/badgeType';

const BadgeBox = styled.ImageBackground<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

type BadgePropsType = {
  badge: BadgeType;
  size?: number;
  styles?: StyleProp<ViewStyle>;
};

export default function Badge({
  badge,
  size = 30, // width, height 크기
  styles = undefined, // 추가적으로 style 작성해서 넘겨줄 수 있음
}: BadgePropsType): JSX.Element {
  return (
    <>
      {badge ? (
        <BadgeBox
          size={size}
          //   source={require(badge.imagePath)}
          source={require('../../assets/images/badge_sample.png')}
          imageStyle={{ borderRadius: size }}
          style={styles}
        />
      ) : (
        <></>
      )}
    </>
  );
}

