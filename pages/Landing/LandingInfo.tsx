import Image from "next/image";
import { infoHeadingStyle, infoSectionStyle, infoTextStyle } from "./styles";

interface CardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
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

const LandingInfo = () => {
  return (
    <div>
      <div className={infoSectionStyle}>
        <div className="flex flex-col md:ml-[60px] lg:mb-[223px] md:mt-[63px] sm:mt-[60px] md:items-start sm:items-center ">
          <span className={infoTextStyle}>Point 1</span>
          <h2 className={`${infoHeadingStyle} md:text-left sm:text-center`}>
            일의 <span className="text-gray300">우선순위</span>를
            <br />
            관리하세요
          </h2>
        </div>
        <Image
          className="lg:w-[594px] lg:h-[497px] md:w-[519px] md:h-[435px] md:ml-[145px] sm:w-[296px] sm:h-[248px] sm:ml-[47px]"
          src="/images/resource/landing1.png"
          alt="렌딩이미지1"
          width="594"
          height="497"
        />
      </div>

      <div className={infoSectionStyle}>
        <Image
          className="lg:ml-[108px] lg:w-[436px] lg:h-[502px] md:w-[360px] md:h-[415px] sm:w-[217px] sm:h-[250px] lg:order-1 sm:order-2 md:m-auto md:mb-0"
          src="/images/resource/landing2.png"
          alt="렌딩이미지2"
          width="436"
          height="502"
        />
        <div className="lg:mr-[326px] lg:mb-[223px] md:ml-[60px] md:mt-[63px] sm:mt-[60px]  lg:order-2 sm:order-1">
          <span className={infoTextStyle}>Point 2</span>
          <h2 className={infoHeadingStyle}>
            해야 할 일을
            <br />
            등록하세요
          </h2>
        </div>
      </div>

      <div className="md:mb-40 sm:mb-[120px] text-white100 flex flex-col lg:items-start sm:items-center">
        <h3 className="text-white100 md:text-[28px] font-bold mb-9">
          생산성을 높이는 다양한 설정 ⚡
        </h3>
        <div className="flex items-center lg:gap-[33px] md:gap-12 sm:gap-10 lg:flex-row sm:flex-col">
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
