import LandingLayout from "../components/Landing/LandingLayout";
import LandingHeader from "../components/Landing/LandingHeader";
import LandingBanner from "../components/Landing/LandingBanner";
import LandingInfo from "../components/Landing/LandingInfo";
import LandingFooter from "../components/Landing/LandingFooter";
import MetaHead from "@/components/MetaHead";
import { GetServerSideProps } from "next";
import { useGuest } from "@/utils/auth";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return useGuest(context);
};

const index = () => {
  return (
    <>
      <MetaHead
        title="새로운 일정 관리🎯 Taskify"
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
