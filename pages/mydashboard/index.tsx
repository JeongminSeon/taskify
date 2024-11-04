import MyDashList from "@/components/MyDashBoard/MyDashList";
import InvitedList from "@/components/MyDashBoard/InvitedList";
import DashBoardLayout from "@/components/Layout/DashBoardLayout";
import MetaHead from "@/components/MetaHead";
import { GetServerSideProps } from "next";
import { withAuth } from "@/utils/auth";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return withAuth(context);
};

const MyDashBoardPage = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <>
      <MetaHead
        title="내 대시보드🎯"
        description="나의 대시보드에 새로운 일정을 추가해보세요!"
      />
      <DashBoardLayout>
        <div className="w-full p-6 md:p-10 lg:max-w-[1102px]">
          <MyDashList />
          <InvitedList />
        </div>
      </DashBoardLayout>
    </>
  );
};

export default MyDashBoardPage;
