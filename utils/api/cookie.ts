import Cookies from "js-cookie"; // 클라이언트에서 쿠키를 다루기 위해 널리 사용되는 JavaScript 라이브러리

// Access Token 설정 함수
export const setAccessToken = (token: string) => {
  Cookies.set("accessToken", token, { expires: 1 }); // 유효기간 1일
};

// Access Token 가져오는 함수
export const getAccessToken = () => {
  return Cookies.get("accessToken") || null;
};
