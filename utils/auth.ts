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
  try {
    const cookies = parse(context.req.headers.cookie || "");
    const accessToken = cookies.accessToken;

    if (!accessToken) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    const user = await getUserInfo(accessToken);
    return {
      props: {
        initialUser: user, // 사용자 정보를 props로 반환
      },
    };
  } catch (error) {
    console.error("사용자 정보를 불러오는데 실패했습니다:", error);
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
  try {
    const cookies = parse(context.req.headers.cookie || "");
    const accessToken = cookies.accessToken;

    if (accessToken) {
      const user = await getUserInfo(accessToken);
      if (user) {
        return {
          redirect: {
            destination: "/mydashboard",
            permanent: false,
          },
        };
      }
    }

    return {
      props: {},
    };
  } catch (error) {
    console.error("게스트 접근에 실패했습니다:", error);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}
