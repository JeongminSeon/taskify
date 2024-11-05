import { todoButtonStyle } from "../styles";

// TodoButton 컴포넌트 정의
const TodoButton = ({
  text = "생성",
  onClose,
  disabled = false,
}: {
  text: string; // 버튼 텍스트
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void; // 클릭 이벤트 핸들러
  disabled?: boolean; // 비활성화 상태
}) => {
  return (
    <div>
      <button
        className={`${todoButtonStyle} bg-white100 text-gray200 border border-gray400 md:mr-2 sm:mr-[11px] rounded-lg hover:opacity-85`}
        onClick={onClose}
      >
        취소
      </button>
      <button
        className={`${todoButtonStyle} bg-purple100 text-white rounded-lg hover:opacity-85 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        type="submit"
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
};

export default TodoButton;
