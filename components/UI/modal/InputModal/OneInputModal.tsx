import React, { useState } from "react";
import Image from "next/image";

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{modalTitle}</h2>
          <button onClick={handleCancle} className="" aria-label="닫기">
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
            <label
              htmlFor="modalInput"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {inputLabel}
            </label>
            <input
              type="text"
              id="modalInput"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple100"
              placeholder={inputPlaceholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCancle}
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple100"
            >
              {cancleButtonText}
            </button>
            <button
              type="submit"
              className=" w-full px-4 py-2 text-sm font-medium text-white bg-purple100 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-800"
            >
              {confirmButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OneInputModal;
