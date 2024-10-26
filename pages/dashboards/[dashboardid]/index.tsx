import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getColumns, createColumn } from "@/utils/api/columnsApi";
import { ColoumnsParams, Columns, ColumnsResponse } from "@/types/columns";
import { useOneInputModal } from "@/hooks/modal/useOneInputModal";
import Image from "next/image";
import Column from "@/components/DashBoard/Column";
import DashBoardLayout from "@/components/Layout/DashBoardLayout";
import Portal from "@/components/UI/modal/ModalPotal";
import OneInputModal from "@/components/UI/modal/InputModal/OneInputModal";

const DashboardDetail: React.FC = () => {
  const teamId: string = "9-1";
  const router = useRouter();
  const { dashboardid } = router.query;
  const [columns, setColumns] = useState<Columns[]>([]);
  const [error, setError] = useState<string | null>(null);

  const {
    isModalOpen,
    inputValue,
    openModal: handleAddColumn,
    closeModal,
    handleInputChange,
    handleConfirm: handleModalConfirm,
  } = useOneInputModal();

  const fetchColumns = useCallback(async () => {
    const dashboardId = Number(dashboardid);
    const params: ColoumnsParams = { teamId, dashboardId };

    try {
      const columnsData: ColumnsResponse = await getColumns(params);
      setColumns(columnsData.data);
    } catch (err) {
      console.error("Error fetching columns:", err);
      setError("Failed to fetch columns. Please try again later.");
    }
  }, [teamId, dashboardid]);

  const handleConfirm = useCallback(
    (inputValue: string) => {
      alert("새로운 칼럼이 생성되었습니다.");
      createColumn({
        teamId,
        title: inputValue,
        dashboardId: Number(dashboardid),
      }).then((newColumn) => {
        if (newColumn) {
          setColumns((prev) => [
            ...prev,
            { ...newColumn, teamId, dashboardId: Number(dashboardid) },
          ]);
        }
        fetchColumns();
      });
    },
    [teamId, dashboardid, fetchColumns]
  );

  useEffect(() => {
    if (dashboardid) {
      fetchColumns();
    }
  }, [dashboardid, fetchColumns]);

  if (error) return <div>{error}</div>;

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
            onCancel={closeModal}
            cancelButtonText="취소"
            onConfirm={() => handleModalConfirm(handleConfirm)}
            confirmButtonText="생성"
            inputValue={inputValue}
            onInputChange={handleInputChange}
          />
        </Portal>
      </div>
    </DashBoardLayout>
  );
};

export default DashboardDetail;
