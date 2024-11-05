import React from "react";
import { boxStyle, textAreaStyle, labelStyle } from "../styles";

// DescriptionInput 컴포넌트의 props 인터페이스 정의
interface DescriptionInputProps {
  value: string; // 텍스트 영역의 현재 값
  onChange: (value: string) => void; // 값 변경 시 호출되는 함수
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
