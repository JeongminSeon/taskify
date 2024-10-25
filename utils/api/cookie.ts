import Cookies from 'js-cookie';

export const setAccessToken = (token: string) => {
  Cookies.set('accessToken', token, { expires: 1 }); // 유효기간 1일
};
