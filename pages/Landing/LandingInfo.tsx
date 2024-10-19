import Image from "next/image";

interface CardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
}

const Card = ({ imageSrc, imageAlt, title, description }: CardProps) => {
  return (
    <div>
      <div className="flex items-center justify-center bg-gray100 w-[378px] h-[260px] rounded-t-lg">
        <Image src={imageSrc} alt={imageAlt} width="300" height="124" />
      </div>
      <div className="flex gap-[18px] justify-center flex-col bg-black200 w-[378px] h-[124px] rounded-b-lg pl-8">
        <span className="text-[18px] font-bold">{title}</span>
        <p className="text-[16px] font-[500px]">{description}</p>
      </div>
    </div>
  );
};

const LandingInfo = () => {
  // 공통 스타일 변수
  const sectionClass =
    "flex justify-between items-end bg-black200 rounded-lg text-white100 h-[600px] mb-[90px]";
  const textClass = "text-[22px] font-[500px] text-gray300";
  const headingClass = "text-[48px] font-bold mt-[100px]";

  return (
    <div>
      <div className={sectionClass}>
        <div className="ml-[60px] mb-[223px]">
          <span className={textClass}>Point 1</span>
          <h2 className={headingClass}>
            일의 <span className="text-gray300">우선순위</span>를
            <br />
            관리하세요
          </h2>
        </div>
        <Image
          src="/images/resource/landing1.png"
          alt="렌딩이미지1"
          width="594"
          height="497"
        />
      </div>

      <div className={sectionClass}>
        <Image
          className="ml-[108px]"
          src="/images/resource/landing2.png"
          alt="렌딩이미지2"
          width="436"
          height="502"
        />
        <div className="mr-[326px] mb-[223px]">
          <span className={textClass}>Point 2</span>
          <h2 className={headingClass}>
            해야 할 일을
            <br />
            등록하세요
          </h2>
        </div>
      </div>

      <div className="mb-40 text-white100">
        <h3 className="text-white100 text-[28px] font-bold mb-9">
          생산성을 높이는 다양한 설정 ⚡
        </h3>
        <div className="flex gap-[33px]">
          <Card
            imageSrc="/images/resource/landing3.png"
            imageAlt="렌딩이미지3"
            title="대시보드 설정"
            description="대시보드 사진과 이름을 변경할 수 있어요."
          />
          <Card
            imageSrc="/images/resource/landing4.png"
            imageAlt="렌딩이미지4"
            title="초대"
            description="새로운 팀원을 초대할 수 있어요."
          />
          <Card
            imageSrc="/images/resource/landing5.png"
            imageAlt="렌딩이미지5"
            title="구성원"
            description="구성원을 초대하고 내보낼 수 있어요."
          />
        </div>
      </div>
    </div>
  );
};

export default LandingInfo;
