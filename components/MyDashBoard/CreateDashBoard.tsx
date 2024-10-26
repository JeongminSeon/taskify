import React from "react";
import Portal from "../UI/modal/ModalPotal";
import ModalLayout from "../Layout/ModalLayout";
import Input from "../Auth/Input";
import useInput from "@/hooks/useInput";
import { isEntered } from "@/utils/validation";

interface DashBoardProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateDashBoard = ({ isOpen, onClose }: DashBoardProps) => {
  if (!isOpen) return null;

  const {
    enteredValue: nameValue,
    handleInputChange,
    handleBlurChange,
    error,
  } = useInput({
    defaultValue: "",
    hasError: (enteredValue: string) => isEntered(enteredValue),
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Portal>
      <ModalLayout>
        <div className="bg-white rounded-2xl md:w-[584px] p-5 flex flex-col gap-3">
          <h2 className="text-black text-2xl font-bold">새로운 대시보드</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-5">
            <Input
              id="name"
              label="대시보드 이름"
              onBlur={handleBlurChange}
              onChange={(event) => handleInputChange(event)}
              value={nameValue}
              isPassword={false}
              placeholder=""
              type="text"
              labelStyle="text-xl font-bold"
            />
            <div className="flex gap-2">
              <li>그린</li>
              <li>블루</li>
              <li>주황</li>
              <li>파랑</li>
              <li>핑크</li>
            </div>
          </form>
          <div className="flex justify-between gap-3 mt-5">
            <button
              className="border w-full py-3.5 px-11 rounded-lg text-lg"
              onClick={onClose}
            >
              취소
            </button>
            <button
              className="border w-full py-3.5 px-11 rounded-lg text-lg text-white border-purple200 bg-purple200"
              onClick={onClose}
            >
              생성
            </button>
          </div>
        </div>
      </ModalLayout>
    </Portal>
  );
};

export default CreateDashBoard;
