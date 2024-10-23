import { UserResponse } from "@/types/users";
import { useEffect, useState } from "react";
import axiosInstance from "@/pages/api/axiosInstanceApi";

export const useGetUser = () => {
  const [data, setData] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = localStorage.getItem("token");
      if (!accessToken) {
        setLoading(false); // 토큰이 없으면 로딩 상태를 false로 설정
        return; // API 호출을 하지 않고 종료
      }
      try {
        setLoading(true);
        const res = await axiosInstance.get<UserResponse>("/users/me");
        setData(res.data);
      } catch (err) {
        const errorMessage = (err as Error).message;
        setError(errorMessage);
      } finally {
        setLoading(true);
      }
    };
    fetchUser();
  }, []);

  return { data, loading, error };
};

export default useGetUser;
