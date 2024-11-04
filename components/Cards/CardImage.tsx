import React from "react";
import Image from "next/image";

// 컴포넌트의 props 타입 정의
interface CardImageProps {
  imageUrl: string; // 카드에 표시될 이미지 URL
}

// 카드 이미지를 표시하는 컴포넌트 정의
const CardImage: React.FC<CardImageProps> = ({ imageUrl }) => (
  <div className="overflow-hidden relative w-full h-40 md:flex-[0_0_90px] lg:flex-1 md:h-[53px] lg:h-40 rounded-md">
    {/* 이미지 컴포넌트 */}
    <Image
      src={imageUrl || "/images/resource/card_image1.png"}
      className="object-cover"
      fill
      alt="카드 이미지"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      draggable="false"
    />
  </div>
);

export default CardImage;
