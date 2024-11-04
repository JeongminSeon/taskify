import { UserResponse } from "@/types/users";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/api/axiosInstanceApi";

// 사용자 정보를 가져오는 API 호출과 관련된 상태를 관리하는 역할을 함
export const useGetUser = () => {
  const [data, setData] = useState<UserResponse | null>(null); // 사용자 정보를 저장
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 사용자 정보를 가져오는 비동기 함수
    const fetchUser = async () => {
      try {
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
