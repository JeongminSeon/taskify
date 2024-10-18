import Axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const axiosInstance = Axios.create({
  baseURL: apiUrl,
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
