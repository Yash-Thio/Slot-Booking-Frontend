import { atom } from 'recoil';

const getInitialLoginState = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('Authorization');
    return Boolean(token);
  }
  return false;
};

export const isLogin = atom<boolean>({
  key: 'isLogin',
  default: getInitialLoginState(),
});