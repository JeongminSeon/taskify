import React from "react";
import Image from "next/image";
import checkImage from "../../../public/images/icons/icon_select.svg?url";

interface ColorPorps {
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

const ColorInput = ({ color, isSelected = true, onClick }: ColorPorps) => {
  return (
    <button
      type="button"
      className={`p-1 bg-${color}100 rounded-full w-8 h-8`}
      onClick={onClick}
    >
      {isSelected && (
        <Image src={checkImage} width={24} height={24} alt="check Image" />
      )}
    </button>
  );
};

export default ColorInput;
