import Cookies from "js-cookie"; // 클라이언트에서 쿠키를 다루기 위해 널리 사용되는 JavaScript 라이브러리

// Access Token 설정 함수
export const setAccessToken = (token: string) => {
  Cookies.set("accessToken", token, { expires: 1 }); // 유효기간 1일
};

// Access Token 가져오는 함수
export const getAccessToken = () => {
  return Cookies.get("accessToken") || null;
};

// setAccessToken 함수는 더 이상 클라이언트에서 사용하지 않으므로 제거합니다.
// 대신 pages/api/auth/login.ts에서 사용하도록 변경했습니다.
