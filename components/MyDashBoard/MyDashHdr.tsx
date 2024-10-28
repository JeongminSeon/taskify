import { hdMenuBtn, hdMenuBtnIcon } from "./MyDashStyle";
import { useRouter } from "next/router";
//import { getDashboardDetail } from "@/utils/api/dashboardsApi";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

const MyDashHdr = () => {
  const router = useRouter();
  const { dashboardsId } = router.query;

  const { user } = useAuthStore();

  // 대시보드 상세 가져오기
  // useEffect(() => {
  //   const fetchDashboardDetail = async () => {
  //     if (dashboardid) {
  //       try {
  //         const detail = await getDashboardDetail(Number(dashboardid));
  //         setDashboardDetail(detail);
  //       } catch (error) {
  //         console.error("Failed to fetch dashboard detail:", error);
  //       }
  //     }
  //   };

  //   fetchDashboardDetail();
  // }, [dashboardid, setDashboardDetail]);

  return (
    <div className="border-b border-gray400 bg-white">
      <div className="headerWrap flex justify-between items-center w-full p-[13px_8px_13px_18px] md:px-10 md:py-[15px]">
        <h2 className="pageTitle flex-1 text-x font-bold md:text-xl lg:text-[2rem]">
          내 대시보드
        </h2>
        <ul className="flex gap-[6px] md:gap-4">
          <li>
            <Link
              href={`/dashboards/${dashboardsId}/edit`}
              className={`${hdMenuBtn}`}
            >
              <span className={`${hdMenuBtnIcon}`}>
                <Image
                  src="/images/icons/icon_settings.svg"
                  width={15}
                  height={15}
                  alt="관리"
                />
              </span>
              관리
            </Link>
          </li>
          <li>
            <button type="button" className={`${hdMenuBtn}`}>
              <span className={`${hdMenuBtnIcon}`}>
                <Image
                  src="/images/icons/icon_add_box.svg"
                  width={15}
                  height={15}
                  alt="초대하기"
                />
              </span>
              초대하기
            </button>
          </li>
        </ul>
        <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray400 md:ml-8 md:pl-8 lg:ml-9 lg:pl-9">
          <span className="overflow-hidden relative w-[34px] h-[34px] rounded-full bg-slate-500">
            {user?.profileImageUrl ? (
              <Image
                className="object-cover"
                src={user.profileImageUrl}
                fill
                alt="Profile Image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // 뷰포트에 따른 이미지 크기 설정
              />
            ) : (
              <Image
                className="object-cover"
                src="https://via.placeholder.com/34"
                fill
                alt="Default Profile"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // 뷰포트에 따른 이미지 크기 설정
              />
            )}
          </span>
          <p className="hidden md:block">{user?.nickname || ""}</p>
        </div>
      </div>
    </div>
  );
};

export default MyDashHdr;
