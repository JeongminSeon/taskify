import React from "react";
import { boxStyle, inputStyle, labelStyle } from "../styles";

interface TitleInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TitleInput = ({ value, onChange }: TitleInputProps) => {
  return (
    <div className={`${boxStyle}`}>
      <label className={`${labelStyle}`} htmlFor="title">
        제목 <span className="text-purple100">*</span>
      </label>
      <input
        className={`${inputStyle}`}
        name="title"
        id="title"
        type="text"
        placeholder="제목을 입력해 주세요."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default TitleInput;
