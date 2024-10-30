import Image from "next/image";
import { barStyle } from "./styles";

interface IconGroupProps {
  icons: { src: string; alt: string }[];
}

const IconGroup = ({ icons }: IconGroupProps) => {
  return (
    <div className="flex gap-[14px]">
      {icons.map((icon, index) => (
        <Image
          key={index}
          src={icon.src}
          alt={icon.alt}
          width="22"
          height="22"
          style={{ width: "22", height: "22" }}
        />
      ))}
    </div>
  );
};

const LandingFooter = () => {
  const icons = [
    { src: "/images/icons/icon_email.svg", alt: "이메일" },
    { src: "/images/icons/icon_facebook.svg", alt: "페이스북" },
    { src: "/images/icons/icon_instagram.svg", alt: "인스타그램" },
  ];

  return (
    <div
      className={`${barStyle} text-gray300 md:flex-row md:justify-between sm:flex-col sm:items-center lg:px-[140px] md:px-0 md:py-[40px] sm:pb-[90px]`}
    >
      <span>©codeit - 2023</span>
      <div className="md:mb-0 md:mt-0 sm:mb-[68px] sm:mt-3">
        <span className="mr-8">Privacy Policy</span>
        <span>FAQ</span>
      </div>
      <IconGroup icons={icons} />
    </div>
  );
};

export default LandingFooter;
