import React from "react";
import Image from "next/image";
import checkImage from "../../../public/images/icons/icon_select.svg?url";

type ColorKey = "green" | "violet" | "orange" | "blue" | "pink";

interface ColorPorps {
  color: ColorKey;
  isSelected: boolean;
  onClick: () => void;
}

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
