import Axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  timeout: 5000, // 5초
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// accessToken을 Authorization 헤더에 자동으로 포함하는 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken"); // 또는 다른 방식으로 토큰을 가져옵니다
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
