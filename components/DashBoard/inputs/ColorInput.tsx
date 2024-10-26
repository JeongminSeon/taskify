import React from "react";

interface ColorPorps {
  color: string;
}
const ColorInput = ({ color }: ColorPorps) => {
  const colorClass = {
    green: "bg-green100",
    violet: "bg-violet100",
    orange: "bg-orange100",
    blue: "bg-blue100",
    pink: "bg-pink100",
  };

  return (
    <button
      type="button"
      className={`p-1 ${colorClass[color]} rounded-full w-8 h-8`}
    />
  );
};

export default ColorInput;
