import useDimension from './useDimension';

export default function useLetterSize() {
  const { DEVICE_WIDTH, DEVICE_HEIGHT } = useDimension();

  const LETTER_WIDTH = DEVICE_WIDTH * 0.6;
  const LETTER_HEIGHT = DEVICE_HEIGHT * 0.5;

  return { LETTER_WIDTH, LETTER_HEIGHT };
}

