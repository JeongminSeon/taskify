import Cookies from "js-cookie"; // 클라이언트에서 쿠키를 다루기 위한 라이브러리

// Access Token 설정 함수
export const setAccessToken = (token: string) => {
  // Access Token을 쿠키에 설정, 유효기간을 1일로 설정
  Cookies.set("accessToken", token, { expires: 1 });
};

// Access Token 가져오는 함수
export const getAccessToken = () => {
  // 쿠키에서 Access Token을 가져오고, 없을 경우 null 반환
  return Cookies.get("accessToken") || null;
};

// Access Token 삭제하는 함수
export const removeAccessToken = () => {
  // 쿠키에서 Access Token을 삭제
  Cookies.remove("accessToken");
};
