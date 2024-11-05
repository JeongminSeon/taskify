import { boxStyle, imageStyle, labelStyle } from "../styles";
import { TodoFormProps } from "@/types/dashboards";
import { createCardImage } from "@/utils/api/columnsApi";
import React from "react";
import Image from "next/image";

// ImageUploadProps 인터페이스 정의
interface ImageUploadProps {
  setFormData: React.Dispatch<React.SetStateAction<TodoFormProps>>; // 상태 업데이트 함수
  preview: string | null; // 이미지 미리보기 URL
  columnId: number; // 열 ID
}

const ImageInput = ({ setFormData, preview, columnId }: ImageUploadProps) => {
  // 파일 입력 변화 처리 함수
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // 선택된 파일 가져오기

    if (file) {
      try {
        // 카드 이미지 생성 API 호출
        const response = await createCardImage({ columnId, image: file });
        if (response?.imageUrl) {
          // 응답에서 이미지 URL이 있을 경우 상태 업데이트
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
