import React, { useState } from "react";

interface InputProps<T> {
  defaultValue: T;
  hasError: (enteredValues: T) => boolean;
}

const useInput = <T,>({ defaultValue, hasError }: InputProps<T>) => {
  const [enteredValue, setEnteredValue] = useState<T>(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value as unknown as T);
    setDidEdit(false);
  };

  const handleBlurChange = () => {
    setDidEdit(true);
  };

  const error = didEdit && !hasError(enteredValue);

  return {
    enteredValue,
    setEnteredValue,
    handleInputChange,
    handleBlurChange,
    setDidEdit,
    error,
  };
};

export default useInput;
