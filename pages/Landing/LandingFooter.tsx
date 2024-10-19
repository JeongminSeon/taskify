import Image from "next/image";

const LandingFooter = () => {
  return (
    <div className="flex justify-between text-gray300 px-[140px] py-[40px]">
      <span>©codeit - 2023</span>
      <div>
        <span className="mr-8">Privacy Policy</span>
        <span>FAQ</span>
      </div>
      <div className="flex gap-[14px]">
        <Image
          src="/images/icons/icon_email.svg"
          alt="이메일"
          width="22"
          height="22"
        />
        <Image
          src="/images/icons/icon_facebook.svg"
          alt="페이스북"
          width="22"
          height="22"
        />
        <Image
          src="/images/icons/icon_instagram.svg"
          alt="인스타그램"
          width="22"
          height="22"
        />
      </div>
    </div>
  );
};

export default LandingFooter;
