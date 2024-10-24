import ModalCard from "@/components/UI/modal/CardModal/CardDetailModal";
import Portal from "@/components/UI/modal/ModalPotal";
import { Columns, ColumnsResponse } from "@/types/columns";
import { useEffect, useState } from "react";
import { getColumns } from "../../utils/api/columnsApi";

const CardsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [columns, setColumns] = useState<Columns[]>([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const columnsData: ColumnsResponse = await getColumns({
          teamId: "9-1",
          dashboardId: 12009,
        });
        setColumns(columnsData.data);
        console.log("컬럼 데이터:", columnsData.data);
      } catch (error) {
        console.error("컬럼을 가져오는 중 오류가 발생했습니다:", error);
      }
    };
    fetchColumns();
  }, []);

  return (
    <div>
      <button
        className="bg-blue-100 text-4xl rounded-xl p-7"
        onClick={openModal}
      >
        모달 열기
      </button>
      {columns.map((column) => (
        <div key={column.id}>
          <h2>{column.title}</h2>
        </div>
      ))}
      <Portal>
        <ModalCard
          id={1}
          title="카드 제목"
          description="이것은 카드 내용입니다."
          tags={[]}
          dueDate=""
          assignee={{ profileImageUrl: "", nickname: "", id: 1 }}
          isOpen={isModalOpen}
          onClose={closeModal}
          imageUrl=""
          columnId={1}
          createdAt={new Date().toISOString()}
          updatedAt={new Date().toISOString()}
        />
      </Portal>
    </div>
  );
};

export default CardsPage;
