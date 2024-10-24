import { useCallback, useEffect, useState } from "react";
import axiosInstance from "@/utils/api/axiosInstanceApi";
import { DashboardResponse } from "@/types/dashboards";

export const useGetDashboardList = (
  method: "pagination" | "infiniteScroll",
  cursorId?: number,
  page?: number,
  size?: number
) => {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const getDashboard = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<DashboardResponse>(
        `/dashboards?navigationMethod=${method}&cursorId=${cursorId}&page=${page}&size=${size}`
      );
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
