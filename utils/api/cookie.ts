import Cookies from "js-cookie";

// Access Token 설정 함수
export const setAccessToken = (token: string) => {
  Cookies.set("accessToken", token, { expires: 1 }); // 유효기간 1일
};

// Access Token 가져오는 함수
export const getAccessToken = () => {
  return Cookies.get("accessToken") || null;
};
