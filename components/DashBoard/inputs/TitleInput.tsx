import React from "react";
import { boxStyle, inputStyle, labelStyle } from "../styles";

// TitleInputProps 인터페이스 정의
interface TitleInputProps {
  value: string; // 입력 필드의 현재 값
  onChange: (value: string) => void; // 값 변경 핸들러
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
