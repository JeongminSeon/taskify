import React, { useState, useEffect } from "react";
import Portal from "@/components/UI/modal/ModalPotal";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import DashboardDetail from "./[dashboardsId]";
import { getDashboards, getDashboardDetail } from "@/pages/api/dashboardsApi";
import {
  Dashboard,
  DashboardDetailResponse,
  DashboardResponse,
} from "@/types/dashboards";
import DashBoardLayout from "@/components/Layout/DashBoardLayout";

const DashboardsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedDashboard, setSelectedDashboard] =
    useState<DashboardDetailResponse | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDashboards = async () => {
      try {
        const dashboardsData: DashboardResponse = await getDashboards(1, 10);
        console.log("응답 데이터:", dashboardsData);
        setDashboards(dashboardsData.dashboards);
        setError(null);
      } catch (error) {
        handleError(error, "대시보드 목록을 가져오는 중 오류가 발생했습니다.");
      }
    };

    fetchDashboards();
  }, []);

  const openModal = async (dashboardId: number) => {
    console.log("대시보드 ID:", dashboardId);

    try {
      const dashboardDetail = await getDashboardDetail(dashboardId);
      console.log("대시보드 상세 정보:", dashboardDetail);

      if (dashboardDetail) {
        setSelectedDashboard(dashboardDetail);
        setIsModalOpen(true);
      } else {
        throw new Error("대시보드 상세 정보가 없습니다.");
      }
    } catch (error) {
      handleError(error, "대시보드 상세 정보를 가져오는 데 실패했습니다.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDashboard(null);
  };

  const handleError = (error: unknown, defaultMessage: string) => {
    console.error(defaultMessage, error);
    if (error instanceof AxiosError) {
      console.error("상태 코드:", error.response?.status);
      console.error("응답 데이터:", error.response?.data);
      if (error.response?.status === 401) {
        setError("인증 오류: 로그인이 필요합니다.");
        router.push("/login");
      } else if (error.response?.status === 400) {
        setError(`잘못된 요청: ${error.response.data.message}`);
      } else {
        setError(defaultMessage);
      }
    } else {
      setError(defaultMessage);
    }
  };

  return (
    <DashBoardLayout>
      <div className="p-4">
        <div>
          <h2>대시보드 목록</h2>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ul>
              {dashboards.map((dashboard) => (
                <li key={dashboard.id}>
                  <button onClick={() => openModal(dashboard.id)}>
                    🩶 {dashboard.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Portal>
          <DashboardDetail
            isOpen={isModalOpen}
            onClose={closeModal}
            dashboard={selectedDashboard}
          />
        </Portal>
      </div>
    </DashBoardLayout>
  );
};

export default DashboardsPage;
