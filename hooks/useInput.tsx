import React, { useState } from "react";

// useInput 훅에 전달되는 props의 타입을 정의
interface InputProps<T> {
  defaultValue: T;
  additioanlValue?: string;
  hasError: (value: T, ...args: unknown[]) => boolean;
}

// 입력값을 관리하고 유효성 검사를 수행하는 역할
const useInput = <T,>({
  defaultValue,
  hasError,
  additioanlValue,
}: InputProps<T>) => {
  const [enteredValue, setEnteredValue] = useState<T>(defaultValue); // 입력된 값을 저장
  const [didEdit, setDidEdit] = useState(false); // 입력 필드가 편집되었는지 여부를 나타냄

  // 입력값이 변경될 때 호출
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value as unknown as T);
    setDidEdit(false);
  };

  // 입력 필드에서 포커스가 벗어났을 때 호출
  const handleBlurChange = () => {
    setDidEdit(true);
  };

  // 입력 필드의 값을 초기값으로 리셋
  const reset = () => {
    setEnteredValue(defaultValue);
    setDidEdit(false);
  };

  const error = hasError
    ? didEdit && !hasError(enteredValue, additioanlValue)
    : false;

  return {
    enteredValue,
    handleInputChange,
    handleBlurChange,
    error,
    reset,
  };
};

export default useInput;
