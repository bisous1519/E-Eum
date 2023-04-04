import dayjs from 'dayjs';
import { useState } from 'react';

export default function useDate() {
  const [date, setDate] = useState<string>('');
  const setNewDate = (regTime: Date): void => {
    setDate(
      dayjs(regTime.toString(), 'YYYY-MM-DD HH:mm:ss').format('YY.MM.DD')
    );
  };
  //   setDate(dayjs(regTime.toString(), 'YYYY-MM-DD HH:mm:ss').format('YY.MM.DD'));
  return [date, setNewDate];
}
