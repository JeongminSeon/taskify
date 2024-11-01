import { useState } from "react";

interface UseModalReturn {
  isOpen: boolean;
  openModal: (message?: string | Error | unknown) => void; // 수정
  closeModal: () => void;
  inputValue: string;
  modalMessage: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleConfirm: (callback: (value: string) => void) => void;
}

const useModal = (): UseModalReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [modalMessage, setModalMessage] = useState<string>("");

  const openModal = (message?: string | Error | unknown) => {
    let finalMessage = "";

    if (typeof message === "string") {
      finalMessage = message;
    } else if (message instanceof Error) {
      finalMessage = message.message;
    } else if (message && typeof message === "object" && "message" in message) {
      finalMessage = (message as { message: string }).message;
    }

    setModalMessage(finalMessage);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setInputValue("");
    setModalMessage(""); // 모달 닫을 때 메시지도 초기화
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
    modalMessage,
    inputValue,
    handleInputChange,
    handleConfirm,
  };
};

export default useModal;
