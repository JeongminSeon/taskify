import React, { useState } from "react";
import OneInputModal from "@/components/UI/modal/InputModal/OneInputModal";
import Portal from "@/components/UI/modal/ModalPotal";
import ModalAlert from "@/components/UI/modal/ModalAlert";
import useModal from "@/hooks/modal/useModal";
import { ColumnsUpdateParams } from "@/types/columns";
import { deleteColumn, updateColumn } from "@/utils/api/columnsApi";
import Image from "next/image";

// ColumnHeader 컴포넌트 정의
const ColumnHeader = ({
  title,
  columnId,
  onRefresh,
}: {
  title: string; // 열 제목
  columnId: number; // 열 ID
  onRefresh: () => void; // 새로 고침 함수
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false); // 수정 확인 알림 상태
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false); // 삭제 확인 알림 상태

  // 모달 관련 상태 및 함수
  const {
    isOpen,
    inputValue,
    openModal: handleSettingColumn,
    closeModal,
    handleInputChange,
  } = useModal();

  // 열 삭제 핸들러
  const handleDeleteColumn = async () => {
    try {
      await deleteColumn(columnId); // 열 삭제 API 호출
      closeModal(); // 모달 닫기
      onRefresh(); // 새로 고침 호출
    } catch (error) {
      throw error; // 오류 처리
    }
  };

  // 열 업데이트 핸들러
  const handleUpdateColumn = async ({
    columnId,
    title,
  }: ColumnsUpdateParams) => {
    try {
      await updateColumn({ columnId, title }); // 열 업데이트 API 호출
      closeModal(); // 모달 닫기
      onRefresh(); // 새로 고침 호출
    } catch (error) {
      throw error; // 오류 처리
    }
  };

  // 수정 확인 핸들러
  const handleConfirmUpdate = () => {
    handleUpdateColumn({ columnId, title: inputValue }); // 열 업데이트 호출
    setIsAlertOpen(false); // 수정 알림 닫기
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
      {isOpen && ( // 모달이 열려 있을 경우
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
      {isAlertOpen && ( // 수정 확인 알림이 열려 있을 경우
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
      {isDeleteAlertOpen && ( // 삭제 확인 알림이 열려 있을 경우
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
