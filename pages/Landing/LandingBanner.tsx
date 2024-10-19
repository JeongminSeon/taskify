import Image from "next/image";
import { useRouter } from "next/router";

const LandingBanner = () => {
  const router = useRouter();
  return (
    <div className="pt-[94px] pb-[160px] z-0">
      <div className="flex flex-col items-center">
        <Image
          className="mb-12 xl:w-[722px] xl:h-[423px] md:w-[537px] md:h-[315px]"
          src="/images/resource/main_bnr.png"
          alt="메인이미지"
          width="722"
          height="423"
          priority
        />
        <h2 className="text-white text-[76px] font-bold mb-[111px]">
          새로운 일정 관리{" "}
          <span className="text-[90px] text-purple100">Taskify</span>
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
