import { useEffect } from 'react';
import { useAppContext } from '../context';

export default function UseTitle(titleName = '') {
  const { setTitle } = useAppContext();
  useEffect(() => {
    setTitle(titleName);
  }, [titleName]);

  return null;
}
