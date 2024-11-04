import React from "react";
import Image from "next/image";
import { boxStyle, imageStyle, labelStyle } from "../styles";
import { TodoFormProps } from "@/types/dashboards";
import { createCardImage } from "@/utils/api/columnsApi";

interface ImageUploadProps {
  setFormData: React.Dispatch<React.SetStateAction<TodoFormProps>>;
  preview: string | null;
  columnId: number;
}

const ImageInput = ({ setFormData, preview, columnId }: ImageUploadProps) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      try {
        const response = await createCardImage({ columnId, image: file });
        if (response?.imageUrl) {
          setFormData((prevData) => ({
            ...prevData,
            imageUrl: response.imageUrl,
          }));
        }
      } catch (error) {
        throw error;
      }
    }
  };

  return (
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
  );
};

export default ImageInput;
