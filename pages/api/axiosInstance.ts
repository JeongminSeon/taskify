import Axios from "axios";

export const API_URL = "https://api.example.com";

const axiosInstance = Axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// accessToken을 Authorization 헤더에 자동으로 포함하는 인터셉터
// axiosInstance.interceptors.request.use((config) => {
//   const accessToken = cookies.get('accessToken');
//   if (accessToken) {
//     config.headers['Authorization'] = `Bearer ${accessToken}`;
//   }
//   return config;
// });

export default axiosInstance;
