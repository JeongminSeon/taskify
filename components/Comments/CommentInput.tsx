import InputField from "../My/InputField";
import { styles } from "../UI/modal/CardModal/styles";

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
    if (e.nativeEvent.isComposing) {
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault(); // 엔터키 기본 동작 방지
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
      <button
        className={styles.commentSubmitButton}
        type="button"
        onClick={onSubmit}
      >
        입력
      </button>
    </div>
  );
};
