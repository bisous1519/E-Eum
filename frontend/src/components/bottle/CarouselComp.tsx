import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import useDimension from '../../hooks/useDimension';
import Letter from './Letter';
import useLetterSize from '../../hooks/useLetterSize';

const { DEVICE_WIDTH, DEVICE_HEIGHT } = useDimension();
const { LETTER_WIDTH, LETTER_HEIGHT } = useLetterSize();

const styles = StyleSheet.create({
  carouselWrapper: {
    width: DEVICE_WIDTH, // modal 사이즈
    height: DEVICE_HEIGHT * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    width: '100%', // modal 사이즈
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function CarouselComp(): JSX.Element {
  const data = React.useRef<number[]>([...new Array(6).keys()]).current;
  const viewCount = 5;
  return (
    <View style={styles.carouselWrapper}>
      <Carousel
        style={styles.carousel}
        width={LETTER_WIDTH} // letter 하나 사이즈
        height={LETTER_HEIGHT}
        pagingEnabled={true}
        snapEnabled={true}
        mode='horizontal-stack'
        loop={true}
        autoPlay={false}
        autoPlayReverse={false}
        data={data}
        modeConfig={{
          snapDirection: 'left',
          stackInterval: 18,
        }}
        customConfig={() => ({ type: 'positive', viewCount })}
        renderItem={({ index }) => <Letter />}
      />
    </View>
  );
}

