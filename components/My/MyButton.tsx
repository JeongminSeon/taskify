import { ButtonProps } from "@/types/my";

const MyButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full h-[54px] rounded-lg text-[16px] font-[600] mt-2
        ${
          disabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-purple100 text-white100"
        }
      `}
    >
      {children}
    </button>
  );
};

export default MyButton;
