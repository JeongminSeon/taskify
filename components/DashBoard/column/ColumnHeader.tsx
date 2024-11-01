import OneInputModal from "@/components/UI/modal/InputModal/OneInputModal";
import Portal from "@/components/UI/modal/ModalPotal";
import useModal from "@/hooks/modal/useModal";
import { ColumnsUpdateParams } from "@/types/columns";
import { deleteColumn, updateColumn } from "@/utils/api/columnsApi";
import Image from "next/image";

const ColumnHeader = ({
  title,
  columnId,
  onRefresh,
}: {
  title: string;
  columnId: number;
  onRefresh: () => void;
}) => {
  const {
    isOpen,
    inputValue,
    openModal: handleSettingColumn,
    closeModal,
    handleInputChange,
    handleConfirm: handleModalConfirm,
  } = useModal();

  const handleDeleteColumn = async (columnId: number) => {
    console.log("삭제하려는 컬럼 ID:", columnId);
    try {
      await deleteColumn(columnId);
      closeModal();
      onRefresh(); // 삭제 후 다시 렌더링
    } catch (error) {
      console.error("컬럼 삭제 실패:", error);
    }
  };

  const handleUpdateColumn = async ({
    columnId,
    title,
  }: ColumnsUpdateParams) => {
    console.log("수정하려는 컬럼 ID:", columnId);
    try {
      await updateColumn({ columnId, title });
      closeModal();
      onRefresh(); // 수정 후 다시 렌더링
    } catch (error) {
      console.error("컬럼 수정 실패:", error);
    }
  };

  return (
    <h2 className="flex items-center gap-2 text-black100 font-bold">
      <span className="block w-2 h-2 rounded-full bg-purple100"></span>
      <p className="flex-1">{title}</p>
      <button type="button" onClick={handleSettingColumn}>
        <Image
          src="/images/icons/icon_settings.svg"
          width={22}
          height={22}
          alt="설정"
        />
      </button>
      {isOpen && (
        <Portal>
          <OneInputModal
            isOpen={isOpen}
            modalTitle="컬럼 관리"
            inputLabel="이름"
            inputPlaceholder={title}
            onCancel={closeModal} // X 버튼용 기본 닫기
            cancelAction={() => handleDeleteColumn(columnId)}
            cancelButtonText="삭제"
            onConfirm={() =>
              handleModalConfirm(() =>
                handleUpdateColumn({ columnId, title: inputValue })
              )
            }
            confirmButtonText="변경"
            inputValue={inputValue}
            onInputChange={handleInputChange}
          />
        </Portal>
      )}
    </h2>
  );
};

export default ColumnHeader;
