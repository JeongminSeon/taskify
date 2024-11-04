import Image from "next/image";
import { TempTagsProps } from "../inputs/TagInput";

// TodoTagList 컴포넌트 정의
const TodoTagList = ({
  tags,
  onDelete,
}: {
  tags: TempTagsProps[]; // 태그 객체 배열
  onDelete: (id: string) => void; // 태그 삭제를 위한 함수
}) => {
  return (
    <ul className="flex flex-wrap gap-[10px] mt-2">
      {tags.map((tag) => (
        <li
          key={tag.id}
          className="flex gap-1 items-center px-[6px] py-[6px] rounded bg-gray500"
        >
          {tag.text}
          <Image
            className="cursor-pointer"
            src="/images/icons/icon_x_round.svg"
            width="22"
            height="22"
            alt="태그 취소"
            onClick={() => onDelete(tag.id)}
          />
        </li>
      ))}
    </ul>
  );
};

export default TodoTagList;
