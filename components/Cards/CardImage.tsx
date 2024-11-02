import React from "react";
import Image from "next/image";

interface CardImageProps {
  imageUrl: string;
}

const CardImage: React.FC<CardImageProps> = ({ imageUrl }) => (
  <div className="overflow-hidden relative w-full h-40 md:flex-[0_0_90px] lg:flex-1 md:h-[53px] lg:h-40 rounded-md">
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
