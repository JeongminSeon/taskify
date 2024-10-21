import { useCallback, useEffect, useState } from "react";
import axiosInstance from "@/pages/api/axiosInstance";
import { DashboardDetailResponse } from "@/types/dashboards";

export const useGetDashboardList = (
  method: "pagination" | "infiniteScroll",
  cursorId: number,
  page?: number,
  size?: number
  //lazy: boolean
) => {
  const [data, setData] = useState<DashboardDetailResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const getDashboard = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<DashboardDetailResponse>(
        `/dashboards?navigationMethod=${method}&cursorId=${cursorId}&page=${page}&size=${size}`
      );
      console.log("Response:", response);
      setData(response.data);
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [method, cursorId, page, size]);

  useEffect(() => {
    getDashboard();
  }, [getDashboard]);

  return { data, loading, error };
};
