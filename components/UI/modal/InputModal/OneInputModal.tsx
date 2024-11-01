import React from "react";
import Image from "next/image";
import { styles } from "./styles";

interface OneInputModalProps {
  isOpen: boolean;
  modalTitle: string;
  inputLabel: string;
  inputPlaceholder: string;
  onCancel: () => void; // 기본 닫기 동작 (X 버튼용)
  cancelAction?: () => void | Promise<void>; // 취소/삭제 등 버튼의 실제 동작
  cancelButtonText?: string;
  onConfirm: (value: string) => void;
  confirmButtonText?: string;
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const OneInputModal: React.FC<OneInputModalProps> = ({
  isOpen,
  modalTitle,
  inputLabel,
  inputPlaceholder,
  onCancel,
  cancelAction,
  cancelButtonText,
  onConfirm,
  confirmButtonText,
  inputValue,
  onInputChange,
}) => {
  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(inputValue);
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleCancelButtonClick = () => {
    if (cancelAction) {
      cancelAction();
    } else {
      handleCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{modalTitle}</h2>
          <button
            onClick={handleCancel} // X 버튼은 항상 기본 닫기 동작
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
              onChange={onInputChange}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCancelButtonClick}
              className={styles.cancelButton}
            >
              {cancelButtonText}
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
