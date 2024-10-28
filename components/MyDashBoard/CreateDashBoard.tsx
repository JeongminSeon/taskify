import React, { useState } from "react";
import Portal from "../UI/modal/ModalPotal";
import ModalLayout from "../Layout/ModalLayout";
import Input from "../Auth/Input";
import useInput from "@/hooks/useInput";
import { isEntered } from "@/utils/validation";
import ColorInput from "../DashBoard/inputs/ColorInput";
import { ColorKey } from "@/types/color";
import { createDashboard } from "@/utils/api/dashboardsApi";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

interface DashBoardProps {
  isOpen: boolean;
  onClose: () => void;
}

const COLOR: Record<ColorKey, string> = {
  green: "#7ac555",
  violet: "#760dde",
  orange: "#ffa500",
  blue: "#76a5ea",
  pink: "#e876ea",
};

const CreateDashBoard = ({ isOpen, onClose }: DashBoardProps) => {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState<string>("");

  const {
    enteredValue: nameValue,
    handleInputChange,
    handleBlurChange,
    error: isNameNotValid,
  } = useInput({
    defaultValue: "",
    hasError: (enteredValue: string) => isEntered(enteredValue),
  });

  const isSubmitEnabled = !isNameNotValid && selectedColor !== "";

  const isDisabled = !isSubmitEnabled;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await createDashboard(nameValue, selectedColor);
      const { id } = response;
      router.push(`dashboards/${id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error;
        console.error(message);
      }
    }
  };

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
                error={isNameNotValid ? "대시보드 이름을 입력해주세요." : ""}
              />
              <div className="flex gap-3">
                {Object.entries(COLOR).map(([key, color]) => (
                  <ColorInput
                    key={key}
                    color={key as ColorKey}
                    isSelected={selectedColor === color}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
              <div className="flex justify-between gap-3 mt-5">
                <button
                  className="border w-full py-3.5 px-11 rounded-lg text-lg"
                  onClick={onClose}
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="border w-full py-3.5 px-11 rounded-lg text-lg text-white border-purple100 bg-purple100"
                  disabled={isDisabled}
                >
                  생성
                </button>
              </div>
            </form>
          </div>
        </ModalLayout>
      </Portal>
    );
  }
};

export default CreateDashBoard;
