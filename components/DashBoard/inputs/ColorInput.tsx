import React from "react";
import Image from "next/image";
import checkImage from "../../../public/images/icons/icon_select.svg?url";

// 색상 키의 타입 정의
type ColorKey = "green" | "violet" | "orange" | "blue" | "pink";

// ColorInput 컴포넌트의 props 인터페이스 정의
interface ColorPorps {
  color: ColorKey; // 색상 키
  isSelected: boolean; // 선택 여부
  onClick: () => void; // 클릭 핸들러
}

// 각 색상에 대한 클래스 이름 매핑
const COLOR: Record<ColorKey, string> = {
  green: "bg-green100",
  violet: "bg-violet100",
  orange: "bg-orange100",
  blue: "bg-blue100",
  pink: "bg-pink100",
};

const ColorInput = ({ color, isSelected = true, onClick }: ColorPorps) => {
  return (
    <button
      type="button"
      className={`p-1 ${COLOR[color]} rounded-full w-8 h-8`}
      onClick={onClick}
    >
      {isSelected && (
        <Image src={checkImage} width={24} height={24} alt="check Image" />
      )}
    </button>
  );
};

export default ColorInput;
