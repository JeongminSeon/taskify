import { InputFieldProps } from "@/types/my";

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  readOnly = false,
  error = false,
  errorMessage,
  onBlur,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block w-full md:text-[16px] sm:text-[14px]"
      >
        {label}
      </label>
      <input
        className={`w-full text-[16px] font-[400] h-[50px] px-4 py-3 mt-2 rounded-lg border 
          outline-0 ${error ? "border-red-500" : "border-gray400"} 
          placeholder:text-gray300`}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        readOnly={readOnly}
      />
      {error && errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;
