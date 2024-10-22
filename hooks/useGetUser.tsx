import { UserResponse } from "@/types/users";
import { useEffect, useState } from "react";
import axiosInstance from "@/pages/api/axiosInstance";

export const useGetUser = () => {
  const [data, setData] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
