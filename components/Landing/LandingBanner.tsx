import Image from "next/image";
import { useRouter } from "next/router";

const LandingBanner = () => {
  const router = useRouter();
  return (
    <div className="md:pt-[94px] md:pb-[180px] sm:pt-[42px] sm:pb-[76px]">
      <div className="flex flex-col items-center">
        <Image
          className="lg:w-[722px] lg:h-[423px] md:w-[537px] md:h-[315px] md:mb-12 sm:w-[287px] sm:h-[168px] sm:mb-[26px]"
          src="/images/resource/main_bnr.png"
          alt="메인이미지"
          width={722}
          height={423}
          priority
        />
        <h2 className="flex md:flex-row sm:flex-col sm:items-center lg:gap-7 md:gap-6 text-white100 font-bold lg:text-[76px] lg:mb-[111px] md:text-[56px] md:mb-[109px] sm:text-[40px] sm:mb-[101px] ">
          새로운 일정 관리 <br className="md:hidden" />
          <span className="text-purple100 lg:text-[90px] md:text-[70px] sm:text-[42px]">
            Taskify
          </span>
        </h2>
        <button
          className="px-[101px] py-[9px] rounded-lg text-white100 text-[18px] font-[500] bg-purple100"
          onClick={() => {
            router.push("/login");
          }}
        >
          로그인하기
        </button>
      </div>
    </div>
  );
};

export default LandingBanner;
