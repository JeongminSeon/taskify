import React from "react";
import Image from "next/image";

interface InputProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    identifier: string
  ) => void;
  onBlur: (identifier: string) => void;
  error?: string;
  isPassword: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isShowPW?: boolean;
  Icon?: string; // visibility 아이콘
  labelStyle?: string;
}

const Input = ({
  id,
  label,
  Icon,
  error,
  onChange: handleInputChange,
  onBlur: handleBlurChange,
  isPassword = false,
  onClick: handleShowPW,
  value,
  labelStyle,
  ...props
}: InputProps) => {
  const isFail = error ? "border-red100" : "";
  return (
    <>
      <label htmlFor={id} className={labelStyle}>
        {label}
      </label>
      <div className="flex items-center relative">
        <input
          className={`w-full border px-4 py-3 border-gray400 rounded-lg focus:outline-none focus:ring-0 focus:border-purple100 ${isFail}`}
          id={id}
          onChange={(event) => handleInputChange(event, id)}
          onBlur={() => handleBlurChange(id)}
          required
          value={value}
          {...props}
        />
        {isPassword && Icon && (
          <button
            type="button"
            className="absolute right-3 cursor-pointer "
            onClick={handleShowPW}
          >
            <Image src={Icon} alt="visiblity_icon" width={24} height={24} />
          </button>
        )}
      </div>
      {error && <div className="text-sm text-red100">{error}</div>}
    </>
  );
};

export default Input;
