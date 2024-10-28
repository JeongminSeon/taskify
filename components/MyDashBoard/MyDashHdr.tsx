import { hdMenuBtn, hdMenuBtnIcon } from "./MyDashStyle";
import { UserResponse } from "@/types/users";
import { useRouter } from "next/router";
import { useEffect } from "react";
//import { getDashboardDetail } from "@/utils/api/dashboardsApi";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { GetServerSideProps } from "next";
import { parse } from "cookie";
import { getUserInfo } from "@/utils/api/authApi";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parse(context.req.headers.cookie || ""); // 쿠키 파싱
  const accessToken = cookies.accessToken; // accessToken 추출

  if (!accessToken) {
    // accessToken이 없으면 로그인 페이지로 리다이렉트
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const user = await getUserInfo(accessToken); // accessToken으로 유저 정보 가져오기
    return {
      props: { initialUser: user }, // 유저 정보를 initialUser로 전달
    };
  } catch (error) {
    console.error("Error fetching user info:", error);
    // 에러 발생 시 로그인 페이지로 리다이렉트
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};

interface MyDashHdrProps {
  initialUser: UserResponse | null;
}

const MyDashHdr: React.FC<MyDashHdrProps> = ({ initialUser }) => {
  const router = useRouter();
  const { dashboardid } = router.query;

  // 인증 관련 상태와 메서드 불러오기
  const { user, setUser, checkAuth } = useAuthStore();

  // 컴포넌트가 마운트될 때 initialUser가 있으면 유저 정보 설정, 없으면 인증 체크
  useEffect(() => {
    if (initialUser) {
      setUser({
        ...initialUser,
        profileImageUrl: initialUser.profileImageUrl || "",
      });
    } else {
      checkAuth();
    }
  }, [initialUser, setUser, checkAuth]);

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
              href={`/dashboards/${dashboardid}/edit`}
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
