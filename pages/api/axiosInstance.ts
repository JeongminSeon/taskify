import Axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const axiosInstance = Axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// accessToken을 Authorization 헤더에 자동으로 포함하는 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // 또는 다른 방식으로 토큰을 가져옵니다
    console.log("현재 토큰:", token); // 토큰 로그 추가
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
