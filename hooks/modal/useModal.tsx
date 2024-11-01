import { useState } from "react";

interface UseModalReturn {
  isOpen: boolean;
  openModal: (message?: string | Error | unknown) => void;
  closeModal: () => void;
  inputValue: string;
  modalMessage: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleConfirm: (callback: (() => void) | ((value: string) => void)) => void;
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

  // 콜백 함수가 인자를 받는지에 따라 다르게 처리
  const handleConfirm = (
    callback: (() => void) | ((value: string) => void)
  ) => {
    if (callback.length === 0) {
      (callback as () => void)();
    } else {
      (callback as (value: string) => void)(inputValue);
    }
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
