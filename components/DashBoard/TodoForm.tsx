import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  boxStyle,
  imageStyle,
  inputStyle,
  labelStyle,
  textAreaStyle,
} from "./styles";
import { TodoFormProps, TodoModalProps } from "@/types/dashboards";
import TodoButton from "./TodoButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import TodoTagList from "./TodoTagList";
import { format } from "date-fns";
import { getRandomColor, INITIAL_VALUES } from "@/utils/TodoForm";
import useImagePreview from "@/hooks/dashboard/useImagePreview";
import { createCardImage } from "@/utils/api/columnsApi";
import { createCard } from "@/utils/api/cardsApi";
import { CreateCardBody } from "@/types/cards";

const ASSIGNEEUSER_ID = 4689;
const DASHBOARD_ID = 12060;

const TodoForm = ({
  columnId,
  members,
  onClose,
  data = INITIAL_VALUES,
}: TodoModalProps) => {
  const [formData, setFormData] = useState<TodoFormProps>(data);
  const [tag, setTag] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const idRef = useRef<number>(0);

  const preview = useImagePreview(
    formData.imageUrl ? formData.imageUrl[0] : null
  );

  useEffect(() => {
    const isFormComplete =
      formData.title &&
      formData.description &&
      formData.dueDate &&
      formData.tags.length > 0 &&
      formData.imageUrl !== null;
    setIsButtonDisabled(!isFormComplete);
  }, [formData]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        imageUrl: [file],
      }));

      try {
        const response = await createCardImage({ columnId, image: file });
        console.log("이미지 생성 성공:", response);
      } catch (error) {
        console.error("이미지 생성 실패:", error);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prevData) => ({
      ...prevData,
      dueDate: date || new Date(),
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tag.length > 0) {
      e.preventDefault();
      const newTag = {
        text: tag,
        color: getRandomColor(),
        id: idRef.current++,
      };
      setFormData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, newTag],
      }));
      setTag("");
    }
  };

  const handleDelete = (id: number) => {
    const nextTags = formData.tags.filter((item) => item.id !== id);
    setFormData((prevData) => ({
      ...prevData,
      tags: nextTags,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let file: File | null = null;
    if (formData.imageUrl && formData.imageUrl[0]) {
      file = formData.imageUrl[0];
    }

    // 서버로 보내기 전에 formData 유효성 검사
    if (
      !formData.title ||
      !formData.description ||
      !formData.dueDate ||
      !formData.tags.length ||
      !file
    ) {
      console.error(
        "유효성 검사 오류: 모든 필드가 올바르게 입력되었는지 확인하세요."
      );
      return;
    }

    try {
      const updatedImage = await createCardImage({
        columnId,
        image: file,
      });

      const outputData: CreateCardBody = {
        assigneeUserId: ASSIGNEEUSER_ID,
        dashboardId: DASHBOARD_ID,
        columnId: columnId,
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate
          ? format(formData.dueDate, "yyyy-MM-dd HH:mm")
          : "",
        tags: formData.tags.map((tag) => tag.text),
        imageUrl: updatedImage.imageUrl,
      };

      await createCard(outputData);
      setFormData(INITIAL_VALUES);
      onClose();
    } catch (error) {
      console.error("제출 중 오류가 발생했습니다:", error);
    }
  };
  return (
    <form className="flex flex-col w-full text-[16px]" onSubmit={handleSubmit}>
      <div className={`${boxStyle}`}>
        <span className={`${labelStyle}`}>관리자</span>
        <select
          className={`${inputStyle}`}
          name="manager"
          value={ASSIGNEEUSER_ID}
          onChange={handleInputChange}
        >
          <option value="temp1">문균</option>
          {members &&
            members.map((item) => (
              <option key={item.id} value={item.nickname}>
                {item.nickname}
              </option>
            ))}
        </select>
      </div>

      <div className={`${boxStyle}`}>
        <label className={`${labelStyle}`} htmlFor="title">
          제목 <span className="text-purple100">*</span>
        </label>
        <input
          className={`${inputStyle}`}
          name="title"
          id="title"
          type="text"
          placeholder="제목을 입력해 주세요."
          value={formData.title}
          onChange={handleInputChange}
        />
      </div>

      <div className={`${boxStyle}`}>
        <label className={`${labelStyle}`} htmlFor="description">
          설명 <span className="text-purple100">*</span>
        </label>
        <textarea
          className={`${textAreaStyle}`}
          name="description"
          id="description"
          placeholder="설명을 입력해 주세요."
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>

      <div className={`${boxStyle}`}>
        <span className={`${labelStyle}`}>마감일</span>
        <div className={`${inputStyle} flex items-center gap-2`}>
          <Image
            src="/images/icons/icon_calendar.svg"
            alt="날짜"
            width="22"
            height="22"
          />
          <DatePicker
            selected={formData.dueDate}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="yyyy-MM-dd HH:mm"
            placeholderText="날짜를 입력해 주세요"
            locale={ko}
            className="outline-none md:w-[460px] sm:w-[240px]"
          />
        </div>
      </div>

      <div className={`${boxStyle}`}>
        <label className={`${labelStyle}`} htmlFor="tag">
          태그
        </label>
        <input
          className={`${inputStyle}`}
          name="tag"
          id="tag"
          type="text"
          placeholder="입력 후 Enter"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <TodoTagList formData={formData} onDelete={handleDelete} />
      </div>

      <div className={`${boxStyle}`}>
        <span className={`${labelStyle}`}>이미지</span>
        <label
          className="flex gap-2 md:w-[76px] sm:w-[58px]"
          htmlFor="image"
          aria-label="이미지 추가하기"
        >
          <Image
            className={`cursor-pointer ${imageStyle}`}
            src="/images/icons/icon_add_card.svg"
            alt="이미지 추가"
            width="76"
            height="76"
          />
          {preview && (
            <Image
              src={preview}
              alt="미리보기"
              className={`rounded-[6px] object-cover ${imageStyle}`}
              width="76"
              height="76"
            />
          )}
        </label>
        <input
          name="image"
          id="image"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <TodoButton onClose={onClose} text="생성" disabled={isButtonDisabled} />
    </form>
  );
};

export default TodoForm;
