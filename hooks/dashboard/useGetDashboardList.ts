import { useEffect, useState } from "react";
import { DashboardResponse } from "@/types/dashboards";
import { getDashboards } from "@/utils/api/dashboardsApi";

export const useGetDashboards = (page: number, size: number) => {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboards = async () => {
      const accessToken = localStorage.getItem("token");
      if (!accessToken) {
        setLoading(false);
        setError("Access token is missing");
        return;
      }

      try {
        setLoading(true);
        const response = await getDashboards(page, size);
        setData(response); // 데이터 저장
      } catch (err) {
        console.error("Error fetching dashboards:", err);
        setError("Failed to fetch dashboards");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboards();
  }, [page, size]); // 페이지나 크기가 변경될 때마다 재호출

  return { data, loading, error };
};

export default useGetDashboards;
