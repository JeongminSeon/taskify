import { barStyle } from "./styles";
import Image from "next/image";
import Link from "next/link";

const LandingHeader = () => {
  return (
    <div className="w-full bg-black100 sticky top-0 left-0 z-1">
      <div
        className={`${barStyle} text-white100 justify-between lg:px-20 md:px-0 sm:py-4`}
      >
        <Link href="/">
          <Image
            src="/images/logos/logo-landing.svg"
            width="121"
            height="39"
            alt="로고"
          />
        </Link>
        <div className="text-base font-normal flex items-center">
          <Link href="/login" className="mr-9">
            로그인
          </Link>
          <Link href="/signup">회원가입</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingHeader;
