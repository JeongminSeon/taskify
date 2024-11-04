import { styles } from "../UI/modal/CardModal/styles";
import InputField from "../My/InputField";

// CommentInput 컴포넌트의 props 타입 정의
interface CommentInputProps {
  content: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export const CommentInput = ({
  content,
  onChange,
  onSubmit,
}: CommentInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      onSubmit();
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
