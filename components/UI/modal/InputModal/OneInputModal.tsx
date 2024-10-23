import React, { useState } from "react";
import Image from "next/image";
import { styles } from "./styles";

interface OneInputModalProps {
  isOpen: boolean;
  modalTitle: string;
  inputLabel: string;
  inputPlaceholder: string;
  onCancle: () => void;
  cancleButtonText?: string;
  onConfirm: (value: string) => void;
  confirmButtonText?: string;
}

/**
 * @param isOpen 모달 오픈 여부
 * @param modalTitle 모달 제목
 * @param inputLabel 입력창 라벨
 * @param inputPlaceholder 입력창 placeholder
 * @param onCancle 모달 닫기 핸들러
 * @param onConfirm 확인 버튼 클릭 핸들러
 * @param confirmButtonText 확인 버튼 텍스트
 */

const OneInputModal: React.FC<OneInputModalProps> = ({
  isOpen,
  modalTitle,
  inputLabel,
  inputPlaceholder,
  onCancle,
  cancleButtonText,
  onConfirm,
  confirmButtonText,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleCancle = () => {
    setInputValue(""); // 입력값 초기화
    onCancle();
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(inputValue);
    setInputValue(""); // 입력값 초기화
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{modalTitle}</h2>
          <button
            onClick={handleCancle}
            className={styles.closeButton}
            aria-label="닫기"
          >
            <Image
              src="/images/icons/icon_close.svg"
              width={14}
              height={14}
              alt="닫기"
            />
          </button>
        </div>
        <form onSubmit={handleConfirm}>
          <div className="mb-4">
            <label htmlFor="modalInput" className={styles.inputLabel}>
              {inputLabel}
            </label>
            <input
              type="text"
              id="modalInput"
              className={styles.input}
              placeholder={inputPlaceholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCancle}
              className={styles.cancelButton}
            >
              {cancleButtonText}
            </button>
            <button type="submit" className={styles.confirmButton}>
              {confirmButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OneInputModal;
