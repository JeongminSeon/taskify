import Image from "next/image";

// 카드 컴포넌트의 props 타입 정의
interface CardProps {
  imageSrc: string; // 이미지 소스 URL
  imageAlt: string; // 이미지 대체 텍스트
  title: string; // 카드 제목
  description: string; // 카드 설명
}

const Card = ({ imageSrc, imageAlt, title, description }: CardProps) => {
  return (
    <div>
      <div className="flex items-center justify-center bg-gray100 md:w-[378px] md:h-[260px] sm:w-[343px] sm:h-[236px] rounded-t-lg">
        <Image
          className="lg:w-[300px] md:w-[378px] sm:w-[260px]"
          src={imageSrc}
          alt={imageAlt}
          width="300"
          height="124"
          style={{ width: "auto", height: "auto" }}
        />
      </div>
      <div className="flex gap-[18px] justify-center flex-col bg-black200 md:w-[378px] md:h-[124px] sm:w-[343px] sm:h-[113px] rounded-b-lg pl-8">
        <span className="text-[18px] font-bold">{title}</span>
        <p className="text-[16px] font-[500px]">{description}</p>
      </div>
    </div>
  );
};

export default Card;
