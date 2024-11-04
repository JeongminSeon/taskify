import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parse } from "cookie";
import { getUserInfo } from "./api/authApi"; // 사용자 정보를 가져오는 API 호출
import { User } from "@/store/authStore"; // 사용자 타입 정의

interface AuthProps {
  initialUser: User | null; // 초기 사용자 정보
}

export async function withAuth(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<AuthProps>> {
  const cookies = parse(context.req.headers.cookie || ""); // 쿠키 파싱
  const accessToken = cookies.accessToken; // accessToken 추출

  // accessToken이 없으면 로그인 페이지로 리다이렉트
  if (!accessToken) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const user = await getUserInfo(accessToken); // 사용자 정보 가져오기
    return {
      props: {
        initialUser: user, // 사용자 정보를 props로 반환
      },
    };
  } catch (error) {
    console.error("사용자 정보를 불러오는데 실패했습니다. :", error);
    return {
      redirect: {
        destination: "/login", // 사용자 정보 불러오기 실패 시 로그인 페이지로 리다이렉트
        permanent: false,
      },
    };
  }
}

// 게스트 사용자 상태를 확인하는 함수
export async function withGuest(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{}>> {
  const cookies = parse(context.req.headers.cookie || ""); // 쿠키 파싱
  const accessToken = cookies.accessToken; // accessToken 추출

  // accessToken이 있으면 사용자 정보 확인
  if (accessToken) {
    try {
      await getUserInfo(accessToken); // 사용자 정보 가져오기
      return {
        redirect: {
          destination: "/mydashboard", // 로그인된 사용자는 대시보드로 리다이렉트
          permanent: false,
        },
      };
    } catch (error) {
      console.error("사용자 정보를 불러오는데 실패했습니다. :", error);
      return {
        redirect: {
          destination: "/login", // 사용자 정보 불러오기 실패 시 로그인 페이지로 리다이렉트
          permanent: false,
        },
      };
    }
  }

  return {
    props: {}, // 게스트 사용자일 경우 빈 props 반환
  };
}
