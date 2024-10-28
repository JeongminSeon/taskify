import { useState } from "react";

interface UseModalReturn {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  inputValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleConfirm: (callback: (value: string) => void) => void;
}

const useModal = (): UseModalReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setInputValue("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleConfirm = (callback: (value: string) => void) => {
    callback(inputValue);
    closeModal();
  };

  return {
    isOpen,
    openModal,
    closeModal,
    inputValue,
    handleInputChange,
    handleConfirm,
  };
};

export default useModal;
