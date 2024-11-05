import React, { useState } from "react";
import { isEntered } from "@/utils/validation";
import Portal from "../UI/modal/ModalPotal";
import ModalLayout from "../Layout/ModalLayout";
import Input from "../Auth/Input";
import useInput from "@/hooks/useInput";
import ColorInput from "../DashBoard/inputs/ColorInput";
import { createDashboard } from "@/utils/api/dashboardsApi";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useDashBoardStore } from "@/store/dashBoardStore"; // 상태 관리 스토어 가져오기

type ColorKey = "green" | "violet" | "orange" | "blue" | "pink";

// 컴포넌트 Props 인터페이스 정의
interface DashBoardProps {
  isOpen: boolean;
  onClose: () => void;
}

// 색상 정의
const COLOR: Record<ColorKey, string> = {
  green: "#7ac555",
  violet: "#760dde",
  orange: "#ffa500",
  blue: "#76a5ea",
  pink: "#e876ea",
};

const CreateDashBoard = ({ isOpen, onClose }: DashBoardProps) => {
  const router = useRouter(); // 라우터 객체 생성
  const [selectedColor, setSelectedColor] = useState<string>(""); // 선택된 색상 상태

  // 입력 필드 상태 관리
  const {
    enteredValue: nameValue,
    handleInputChange,
    handleBlurChange,
    error: isNameNotValid,
  } = useInput({
    defaultValue: "",
    hasError: (enteredValue: string) => isEntered(enteredValue), // 입력 검증
  });

  // 제출 가능 여부 체크
  const isSubmitEnabled = !isNameNotValid && selectedColor !== "";

  const isDisabled = !isSubmitEnabled;

  // useDashBoardStore에서 addDashboard와 setDashboards 함수를 가져오기
  const { addDashboard } = useDashBoardStore();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // 새로운 대시보드 생성
      const response = await createDashboard(nameValue, selectedColor);
      const { id, color, title, createdAt, updatedAt, userId, createdByMe } =
        response;

      // 새로운 대시보드를 store에 추가하여 즉시 반영
      addDashboard({
        id,
        color,
        title,
        createdAt,
        updatedAt,
        userId,
        createdByMe,
      });
      router.push(`/dashboards/${id}`);
      onClose();
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error;
        console.error(message, error);
      }
    }
  };

  // 모달이 닫혀 있으면 아무 것도 렌더링하지 않음
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
