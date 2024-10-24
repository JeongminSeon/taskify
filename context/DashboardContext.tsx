import React, { createContext, useContext, useEffect, useState } from "react";
import { getDashboards } from "@/pages/api/dashboardsApi";
import { DashboardResponse } from "@/types/dashboards";
import { useRouter } from "next/router";

interface DashboardContextType {
  dashboards: DashboardResponse | null;
  loading: boolean;
  error: string | null;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [dashboards, setDashboards] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboards = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("로그인 필요");
        setLoading(false);
        router.push("/login");
        return;
      }

      try {
        const data = await getDashboards(1, 10);
        setDashboards(data);
      } catch (err) {
        console.error("대시보드 목록을 가져오는 데 실패했습니다:", err);
        setError("대시보드 목록을 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboards();
  }, [router]);

  return (
    <DashboardContext.Provider value={{ dashboards, loading, error }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within a DashboardProvider"
    );
  }
  return context;
};
