import Axios from "axios";

const axiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// accessToken을 Authorization 헤더에 자동으로 포함하는 인터셉터
axiosInstance.interceptors.request.use(async (config) => {
  try {
    const token = await getToken();
    console.log("Token:", token); // 이곳에서 로그 확인
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    console.error("Error fetching token:", error); // 토큰 가져오는 중 에러
    return config; // 오류가 발생하더라도 config를 반환하여 요청이 계속 진행
  }
});

// 토큰을 가져오는 함수 (구현 필요)
const getToken = async () => {
  // 예: 로컬 스토리지에서 토큰 가져오기
  return localStorage.getItem("accessToken");
};

export default axiosInstance;
