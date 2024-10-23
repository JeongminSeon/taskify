import { useState, useCallback } from "react";

interface UseOneInputModalReturn {
  isModalOpen: boolean;
  inputValue: string;
  openModal: () => void;
  closeModal: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleConfirm: (callback: (value: string) => void) => void;
}

export const useOneInputModal = (): UseOneInputModalReturn => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setInputValue("");
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  const handleConfirm = useCallback(
    (callback: (value: string) => void) => {
      callback(inputValue);
      closeModal();
    },
    [inputValue, closeModal]
  );

  return {
    isModalOpen,
    inputValue,
    openModal,
    closeModal,
    handleInputChange,
    handleConfirm,
  };
};
