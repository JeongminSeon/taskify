import { createContext, useContext, useEffect, useState } from "react";
import { getDashboards } from "@/utils/api/dashboardsApi";
import { DashboardDetailResponse, DashboardResponse } from "@/types/dashboards";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

interface DashboardContextType {
  dashboards: DashboardResponse | null;
  dashboardDetail: DashboardDetailResponse | null;
  setDashboards: React.Dispatch<React.SetStateAction<DashboardResponse | null>>;
  setDashboardDetail: React.Dispatch<
    React.SetStateAction<DashboardDetailResponse | null>
  >;
  loading: boolean;
  error: string | null;
}

// 대시보드와 관련된 상태를 관리할 Context를 생성
const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

// 대시보드의 상세 정보를 저장할 상태를 정의
export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [dashboards, setDashboards] = useState<DashboardResponse | null>(null);
  const [dashboardDetail, setDashboardDetail] =
    useState<DashboardDetailResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboards = async () => {
      const accessToken = Cookies.get("accessToken");
      const isLoginPage = router.pathname === "/login";
      if (!accessToken && !isLoginPage) {
        router.push("/");
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
    <DashboardContext.Provider
      value={{
        dashboards,
        dashboardDetail,
        setDashboards,
        setDashboardDetail,
        loading,
        error,
      }}
    >
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
