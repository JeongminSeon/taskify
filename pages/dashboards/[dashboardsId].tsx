import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createColumn, getColumns } from "../api/columnsApi";
import { ColoumnsParams, Columns, ColumnsResponse } from "@/types/columns";
import Image from "next/image";
import Column from "@/components/DashBoard/Column";
import DashBoardLayout from "@/components/Layout/DashBoardLayout";
import Portal from "@/components/UI/Modal/ModalPotal";
import OneInputModal from "@/components/UI/Modal/InputModal/OneInputModal";

const DashboardDetail: React.FC = () => {
  const teamId: string = "9-1";
  const router = useRouter();
  const { dashboardsId } = router.query;
  const [columns, setColumns] = useState<Columns[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleAddColumn = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async (inputValue: string) => {
    alert("새로운 칼럼이 생성되었습니다.");
    setIsModalOpen(false);
    const newColumn = await createColumn({
      teamId,
      title: inputValue,
      dashboardId: Number(dashboardsId),
    });

    if (newColumn) {
      setColumns((prev) => [
        ...prev,
        { ...newColumn, teamId, dashboardId: Number(dashboardsId) },
      ]);
    }
    // 샐행 후 컬럼 목록을 다시 불러오는 코드 작성
    fetchColumns();
  };

  // 컬럼 목록 조회
  const fetchColumns = useCallback(async () => {
    const dashboardId = Number(dashboardsId); // dashboardsId 숫자로 변환
    const params: ColoumnsParams = { teamId, dashboardId };

    try {
      const columnsData: ColumnsResponse = await getColumns(params);
      setColumns(columnsData.data);
    } catch (err) {
      console.error("Error fetching columns:", err);
      setError("Failed to fetch columns. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [teamId, dashboardsId]); // 의존성 배열에 teamId와 dashboardsId 포함

  useEffect(() => {
    if (dashboardsId) {
      fetchColumns();
    }
  }, [dashboardsId, fetchColumns]); // fetchColumns를 의존성으로 추가

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (columns.length === 0) return <div>No columns available.</div>;

  return (
    <DashBoardLayout>
      <div className="columns flex flex-col lg:flex-row">
        {columns.map((item) => (
          <Column key={item.id} id={item.id} title={item.title} />
        ))}
        <div className="columnList flex-1 h-screen py-4 px-3 md:p-5 border-r border-[gray600]">
          <button
            type="button"
            className="flex justify-center items-center gap-3 w-full sm:h-[66px] h-[70px] lg:mt-12 border border-gray400 rounded-md bg-white100 text-black300 font-bold"
            onClick={handleAddColumn}
          >
            새로운 컬럼 추가하기
            <Image
              src="/images/icons/icon_add_column.svg"
              width={16}
              height={16}
              alt="할 일 추가"
            />
          </button>
        </div>
        <Portal>
          <OneInputModal
            isOpen={isModalOpen}
            modalTitle="새 칼럼 생성"
            inputLabel="이름"
            inputPlaceholder="컬럼 이름을 입력해주세요"
            onCancle={closeModal}
            cancleButtonText="취소"
            onConfirm={handleConfirm}
            confirmButtonText="생성"
          />
        </Portal>
      </div>
    </DashBoardLayout>
  );
};

export default DashboardDetail;
