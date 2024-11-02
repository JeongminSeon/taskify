import React, { useState } from "react";
import OneInputModal from "@/components/UI/modal/InputModal/OneInputModal";
import Portal from "@/components/UI/modal/ModalPotal";
import ModalAlert from "@/components/UI/modal/ModalAlert";
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
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const {
    isOpen,
    inputValue,
    openModal: handleSettingColumn,
    closeModal,
    handleInputChange,
  } = useModal();

  const handleDeleteColumn = async () => {
    try {
      await deleteColumn(columnId);
      closeModal();
      onRefresh();
    } catch (error) {
      console.error("컬럼 삭제 실패:", error);
    }
  };

  const handleUpdateColumn = async ({
    columnId,
    title,
  }: ColumnsUpdateParams) => {
    try {
      await updateColumn({ columnId, title });
      closeModal();
      onRefresh();
    } catch (error) {
      console.error("컬럼 수정 실패:", error);
    }
  };

  const handleConfirmUpdate = () => {
    handleUpdateColumn({ columnId, title: inputValue });
    setIsAlertOpen(false);
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
            cancelAction={() => setIsDeleteAlertOpen(true)}
            cancelButtonText="삭제"
            onConfirm={() => setIsAlertOpen(true)}
            confirmButtonText="변경"
            inputValue={inputValue}
            onInputChange={handleInputChange}
          />
        </Portal>
      )}
      {isAlertOpen && (
        <Portal>
          <ModalAlert
            isOpen={isAlertOpen}
            type="confirm"
            text="컬럼을 수정하시겠습니까?"
            onClose={() => setIsAlertOpen(false)}
            onConfirm={handleConfirmUpdate}
          />
        </Portal>
      )}
      {isDeleteAlertOpen && (
        <Portal>
          <ModalAlert
            isOpen={isDeleteAlertOpen}
            type="confirm"
            text="컬럼을 삭제하시겠습니까?"
            onClose={() => setIsDeleteAlertOpen(false)}
            onConfirm={handleDeleteColumn}
          />
        </Portal>
      )}
    </h2>
  );
};

export default ColumnHeader;
