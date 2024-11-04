import { styles } from "../UI/modal/CardModal/styles";
import InputField from "../My/InputField";

// CommentInput 컴포넌트의 props 타입 정의
interface CommentInputProps {
  content: string; // 댓글 내용
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 댓글 내용 변경 핸들러
  onSubmit: () => void; // 댓글 제출 핸들러
}

// CommentInput 컴포넌트 정의
export const CommentInput = ({
  content,
  onChange,
  onSubmit,
}: CommentInputProps) => {
  // 키보드 입력 이벤트 핸들러
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      onSubmit(); // Enter 키를 누르면 onSubmit 호출
    } else {
      return;
    }
  };

  return (
    <div
      className="mb-6 relative w-full"
      onSubmit={onSubmit}
      onKeyDown={handleKeyDown}
    >
      <InputField
        label=""
        name="content"
        placeholder="댓글 작성하기"
        value={content}
        onChange={onChange}
      />
      <button className={styles.commentSubmitButton} type="submit">
        입력
      </button>
    </div>
  );
};
