import { TodoFormProps } from "@/types/dashboards";
import Image from "next/image";

const hexToRgba = (hex: string, opacity: number) => {
  const r = parseInt(hex.slice(1, 3), 16); // red
  const g = parseInt(hex.slice(3, 5), 16); // green
  const b = parseInt(hex.slice(5, 7), 16); // blue

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const TodoTagList = ({
  formData,
  onDelete,
}: {
  formData: TodoFormProps;
  onDelete: (id: number) => void;
}) => {
  return (
    <ul className="flex flex-wrap gap-[10px] mt-2">
      {formData.tags.map((tag) => (
        <li
          key={tag.id}
          className="flex gap-1 items-center px-[6px] py-[6px] rounded"
          style={{
            backgroundColor: hexToRgba(tag.color, 0.2),
            color: tag.color,
          }}
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
