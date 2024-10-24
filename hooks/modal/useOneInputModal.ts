import { useState, useCallback } from "react";
import useModalAlert from "../useModalAlert";
import { createColumn } from "../../pages/api/columnsApi";
import { Columns } from "@/types/columns";

interface UseOneInputModalProps {
  teamId: string;
  dashboardId: number;
  setColumns: React.Dispatch<React.SetStateAction<Columns[]>>;
  fetchColumns: () => Promise<void>;
}

interface UseOneInputModalReturn {
  isOpen: boolean;
  inputValue: string;
  openModal: () => void;
  closeModal: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleConfirm: () => void;
  resetInputValue: () => void;
}

export const useOneInputModal = ({
  teamId,
  dashboardId,
  setColumns,
  fetchColumns,
}: UseOneInputModalProps): UseOneInputModalReturn => {
  const { isOpen: isOpen, openModal, closeModal } = useModalAlert();
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  const resetInputValue = useCallback(() => {
    setInputValue("");
  }, []);

  const handleConfirm = useCallback(async () => {
    try {
      const newColumn = await createColumn({
        teamId,
        title: inputValue,
        dashboardId,
      });

      if (newColumn) {
        setColumns((prev) => [...prev, { ...newColumn, teamId, dashboardId }]);
        await fetchColumns();
        alert("새로운 칼럼이 생성되었습니다.");
      }
    } catch (error) {
      console.error("칼럼 생성 중 오류 발생:", error);
      alert("칼럼 생성에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      closeModal();
      resetInputValue();
    }
  }, [
    inputValue,
    teamId,
    dashboardId,
    setColumns,
    fetchColumns,
    closeModal,
    resetInputValue,
  ]);

  return {
    isOpen,
    inputValue,
    openModal,
    closeModal,
    handleInputChange,
    handleConfirm,
    resetInputValue,
  };
};
