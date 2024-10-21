import { InviteListResponse } from "@/types/dashboardsTypes";
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "@/pages/api/axiosInstance";

export const useGetInvitedList = (size: number = 10) => {
  const [data, setData] = useState<InviteListResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getDashboard = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<InviteListResponse>(
        `invitations?size=${size}`
      );
      setData(response.data);
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [size]);

  useEffect(() => {
    getDashboard();
  }, [getDashboard]);

  return { data, loading, error };
};
