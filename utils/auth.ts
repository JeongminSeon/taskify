import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parse } from "cookie";
import { getUserInfo } from "./api/authApi";
import { User } from "@/store/authStore";

interface AuthProps {
  initialUser: User | null;
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
        initialUser: user,
      },
    };
  } catch (error) {
    console.error("사용자 정보를 불러오는데 실패했습니다:", error);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}

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
