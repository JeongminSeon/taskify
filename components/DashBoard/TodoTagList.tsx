import Image from "next/image";
import { TempTagsProps } from "./inputs/TagInput";

const TodoTagList = ({
  tags,
  onDelete,
}: {
  tags: TempTagsProps[];
  onDelete: (id: number) => void;
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
            onClick={() => {
              onDelete(tag.id);
            }}
          />
        </li>
      ))}
    </ul>
  );
};

export default TodoTagList;
