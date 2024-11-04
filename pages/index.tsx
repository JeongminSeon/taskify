import LandingLayout from "../components/Landing/LandingLayout";
import LandingHeader from "../components/Landing/LandingHeader";
import LandingBanner from "../components/Landing/LandingBanner";
import LandingInfo from "../components/Landing/LandingInfo";
import LandingFooter from "../components/Landing/LandingFooter";
import MetaHead from "@/components/MetaHead";
import { GetServerSideProps } from "next";
import { parse } from "cookie";
import { getUserInfo } from "@/utils/api/authApi";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;

  // 로그인 상태일 경우 /mydashboard로 리다이렉트
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
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  }

  // 로그인 상태가 아닌 경우 페이지에 접근 허용
  return {
    props: {},
  };
};

const index = () => {
  return (
    <>
      <MetaHead
        title="새로운 일정 관리 🎯 Taskify"
        description="Taskify를 통해 일정을 관리해보세요"
      />

      <div className="bg-black100 h-vh">
        <LandingHeader />
        <LandingLayout>
          <LandingBanner />
          <LandingInfo />
        </LandingLayout>
        <LandingFooter />
      </div>
    </>
  );
};

export default index;
