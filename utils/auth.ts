import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parse } from "cookie";
import { getUserInfo } from "./api/authApi";
import { User } from "@/store/authStore";

interface AuthProps {
  initialUser: User | null;
}

export async function useAuth(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<AuthProps>> {
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

  try {
    const user = await getUserInfo(accessToken);
    return {
      props: {
        initialUser: user,
      },
    };
  } catch (error) {
    console.error("사용자 정보를 불러오는데 실패했습니다. :", error);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}

export async function useGuest(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{}>> {
  const cookies = parse(context.req.headers.cookie || "");
  const accessToken = cookies.accessToken;

  if (accessToken) {
    try {
      await getUserInfo(accessToken);
      return {
        redirect: {
          destination: "/mydashboard",
          permanent: false,
        },
      };
    } catch (error) {
      console.error("사용자 정보를 불러오는데 실패했습니다. :", error);
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
}
