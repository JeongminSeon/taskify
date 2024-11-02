import React from "react";
import { boxStyle, textAreaStyle, labelStyle } from "../styles";

interface DescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

const DescriptionInput = ({ value, onChange }: DescriptionInputProps) => {
  return (
    <div className={`${boxStyle}`}>
      <label className={`${labelStyle}`} htmlFor="description">
        설명 <span className="text-purple100">*</span>
      </label>
      <textarea
        className={`${textAreaStyle}`}
        name="description"
        id="description"
        placeholder="설명을 입력해 주세요."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default DescriptionInput;
