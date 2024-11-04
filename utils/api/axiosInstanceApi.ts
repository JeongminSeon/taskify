import Axios from "axios"; // Axios 라이브러리 가져오기
import Cookies from "js-cookie"; // Cookies 라이브러리 가져오기

// Axios 인스턴스 생성
const axiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000", // API 기본 URL 설정
  timeout: 5000, // 요청 타임아웃 설정 (5초)
  withCredentials: false, // 쿠키를 요청에 포함하지 않음
  headers: {
    "Content-Type": "application/json", // 요청 시 Content-Type 헤더 설정
    Accept: "application/json", // 응답으로 받을 데이터 형식 설정
  },
});

// accessToken을 Authorization 헤더에 자동으로 포함하는 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken"); // 쿠키에서 accessToken 가져오기
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // 토큰이 있으면 Authorization 헤더에 추가
    }
    return config; // 수정된 config 반환
  },
  (error) => {
    return Promise.reject(error); // 요청 오류 발생 시 오류 반환
  }
);

export default axiosInstance; // 생성한 Axios 인스턴스 내보내기
