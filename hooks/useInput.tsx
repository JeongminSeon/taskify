import React, { useState } from "react";

interface InputProps<T> {
  defaultValue: T;
  additioanlValue?: string;
  hasError: (value: T, ...args: any[]) => boolean;
}

const useInput = <T,>({
  defaultValue,
  hasError,
  additioanlValue,
}: InputProps<T>) => {
  const [enteredValue, setEnteredValue] = useState<T>(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value as unknown as T);
    setDidEdit(false);
  };

  const handleBlurChange = () => {
    setDidEdit(true);
  };

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
