import React, { useState, useEffect } from "react";
import Portal from "@/components/UI/modal/ModalPotal";
import { TestModal } from "@/components/UI/modal/TestModal";
import axiosInstance from "@/pages/api/axiosInstance";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

interface Dashboard {
  id: string;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

interface DashboardResponse {
  dashboards: Dashboard[];
}

const TestPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const teamId = "9-1"; // 실제 사용 시 동적으로 설정해야 할 수 있습니다.

  useEffect(() => {
    const fetchDashboards = async () => {
      try {
        const response = await axiosInstance.get<DashboardResponse>(
          `/${teamId}/dashboards`,
          {
            params: {
              navigationMethod: "pagination", // 또는 'infiniteScroll'
              page: 1,
              size: 10,
              // cursorId를 사용하려면 여기에 추가: cursorId: someValue
            },
          }
        );
        console.log("응답 데이터:", response.data);
        setDashboards(response.data.dashboards);
        setError(null);
      } catch (error) {
        console.error("대시보드 목록을 가져오는 중 오류 발생:", error);
        if (error instanceof AxiosError) {
          console.error("상태 코드:", error.response?.status);
          console.error("응답 데이터:", error.response?.data);
          if (error.response?.status === 401) {
            setError("인증 오류: 로그인이 필요합니다.");
            router.push("/login");
          } else if (error.response?.status === 400) {
            setError(`잘못된 요청: ${error.response.data.message}`);
          } else {
            setError("대시보드 목록을 가져오는 중 오류가 발생했습니다.");
          }
        } else {
          setError("알 수 없는 오류가 발생했습니다.");
        }
      }
    };

    fetchDashboards();
  }, [router, teamId]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className='p-4'>
      <button
        onClick={openModal}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        모달 열기
      </button>
      <Portal>
        <TestModal isOpen={isModalOpen} onClose={closeModal} />
      </Portal>
      <div>
        <h2>대시보드 목록</h2>
        {error ? (
          <p className='text-red-500'>{error}</p>
        ) : (
          <ul>
            {dashboards.map((dashboard) => (
              <li key={dashboard.id}>🩶 {dashboard.title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TestPage;
