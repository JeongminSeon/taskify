import Image from "next/image";
import Link from "next/link";
import { containerStyle } from "./styles";

const LandingHeader = () => {
  return (
    <div
      className={`${containerStyle} bg-black100 xl:max-w-[1760px] text-white100 flex justify-between px-20 py-4 sticky top-0 left-0 z-1 `}
    >
      <Link href="/">
        <Image
          src="/images/logos/logo-landing.svg"
          width="121"
          height="39"
          alt="로고"
        />
      </Link>
      <div className="text-base font-normal">
        <Link href="/login" className="mr-9">
          로그인
        </Link>
        <Link href="/signup">회원가입</Link>
      </div>
    </div>
  );
};

export default LandingHeader;
