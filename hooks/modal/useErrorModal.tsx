import { useState } from "react";
import useModal from "@/hooks/modal/useModal";
import { AxiosError } from "axios";

const useErrorModal = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [errorMessage, setErrorMessage] = useState<string>("");

  // 에러 메시지 설정과 모달 열기
  const handleError = (error: unknown) => {
    if (error instanceof AxiosError) {
      setErrorMessage(
        error.response?.data.message || "초대 요청 중 오류가 발생했습니다."
      );
    } else if (error instanceof Error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("알 수 없는 오류가 발생했습니다.");
    }
    openModal();
  };

  // 모달을 닫고 에러 메시지 초기화
  const handleClose = () => {
    closeModal();
    setErrorMessage("");
  };

  return {
    isOpen,
    errorMessage,
    handleError,
    handleClose,
  };
};

export default useErrorModal;
