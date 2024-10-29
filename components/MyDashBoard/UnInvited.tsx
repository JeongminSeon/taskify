import Image from "next/image";

interface UnInvitedProps {
  message?: string; // 기본값을 위해 optional로 설정
}

const UnInvited: React.FC<UnInvitedProps> = ({ message }) => {
  return (
    <div className="py-[105px] md:py-16">
      <div className="relative w-[60px] h-[60px] mx-auto md:w-[100px] md:h-[100px]">
        <Image
          src="/images/resource/uninvited_image.png"
          fill
          className="object-contain"
          alt="description"
        />
      </div>
      <p className="pt-6 text-[18px] text-gray300 text-center">{message}</p>
    </div>
  );
};

export default UnInvited;
