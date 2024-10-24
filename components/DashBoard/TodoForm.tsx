import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  boxStyle,
  imageStyle,
  inputStyle,
  labelStyle,
  textAreaStyle,
} from "./styles";
import { MemberProps, TodoFormProps } from "@/types/dashboards";
import TodoButton from "./TodoButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import TodoTagList from "./TodoTagList";

const INITIAL_VALUES = {
  title: "",
  content: "",
  datetime: null,
  tags: [],
  image: null,
  manager: "",
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const TodoForm = ({
  members,
  onClose,
  data = INITIAL_VALUES,
}: {
  members: MemberProps[];
  onClose: () => void;
  data?: TodoFormProps;
}) => {
  const [formData, setFormData] = useState<TodoFormProps>(data);
  const [tag, setTag] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [preview, setPreview] = useState<string | null>(null);
  const idRef = useRef<number>(0);

  useEffect(() => {
    const isFormComplete =
      formData.title &&
      formData.content &&
      formData.datetime &&
      formData.tags.length > 0 &&
      formData.manager &&
      formData.image !== null;
    setIsButtonDisabled(!isFormComplete);
  }, [formData]);

  // 이미지 미리보기 설정
  useEffect(() => {
    if (!formData.image) return;

    const nextPreview = URL.createObjectURL(formData.image);
    setPreview(nextPreview);

    return () => {
      setPreview(null);
      URL.revokeObjectURL(nextPreview);
    };
  }, [formData.image]);

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
      datetime: date || new Date(),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setFormData(INITIAL_VALUES);
    onClose();
  };

  return (
    <form className="flex flex-col w-full text-[16px]" onSubmit={handleSubmit}>
      <div className={`${boxStyle}`}>
        <span className={`${labelStyle}`}>관리자</span>
        <select
          className={`${inputStyle}`}
          name="manager"
          value={formData.manager}
          onChange={handleInputChange}
        >
          <option value="temp1">임시1</option>
          <option value="temp2">임시2</option>
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
        <label className={`${labelStyle}`} htmlFor="content">
          설명 <span className="text-purple100">*</span>
        </label>
        <textarea
          className={`${textAreaStyle}`}
          name="content"
          id="content"
          placeholder="설명을 입력해 주세요."
          value={formData.content}
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
            selected={formData.datetime}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="yyyy. MM. dd HH:mm"
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
              className={`rounded-[6px] object-cover${imageStyle}`}
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
