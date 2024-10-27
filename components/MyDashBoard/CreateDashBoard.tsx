import React, { useState } from "react";
import Portal from "../UI/modal/ModalPotal";
import ModalLayout from "../Layout/ModalLayout";
import Input from "../Auth/Input";
import useInput from "@/hooks/useInput";
import { isEntered } from "@/utils/validation";
import ColorInput from "../DashBoard/inputs/ColorInput";
import { ColorKey } from "@/types/color";

interface DashBoardProps {
  isOpen: boolean;
  onClose: () => void;
}

const COLOR: Record<ColorKey, string> = {
  green: "green",
  violet: "violet",
  orange: "orange",
  blue: "blue",
  pink: "pink",
};

const CreateDashBoard = ({ isOpen, onClose }: DashBoardProps) => {
  const [selectedColor, setSelectedColor] = useState<string>("");

  const {
    enteredValue: nameValue,
    handleInputChange,
    handleBlurChange,
    error: isNameValid,
  } = useInput({
    defaultValue: "",
    hasError: (enteredValue: string) => isEntered(enteredValue),
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const isSubmitEnabled = isNameValid && selectedColor === "";

  const isDisabled = !isSubmitEnabled;

  if (!isOpen) {
    return null;
  } else {
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
                error={isNameValid ? "대시보드 이름을 입력해주세요." : ""}
              />
              <div className="flex gap-3">
                {Object.entries(COLOR).map(([key, color]) => (
                  <ColorInput
                    color={color as ColorKey}
                    isSelected={selectedColor === color}
                    onClick={setSelectedColor}
                  />
                ))}
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
                className="border w-full py-3.5 px-11 rounded-lg text-lg text-white border-purple100 bg-purple100"
                onClick={onClose}
                disabled={isDisabled}
              >
                생성
              </button>
            </div>
          </div>
        </ModalLayout>
      </Portal>
    );
  }
};

export default CreateDashBoard;
