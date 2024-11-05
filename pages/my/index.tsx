import DashBoardLayout from "@/components/Layout/DashBoardLayout";
import MyPassWord from "@/components/My/MyPassWord";
import MyProfile from "@/components/My/MyProfile";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { ProfileProps } from "@/types/my";
import MetaHead from "@/components/MetaHead";
import { withAuth } from "@/utils/auth";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return withAuth(context);
};

const MyPage = ({ initialUser }: { initialUser: ProfileProps }) => {
  const router = useRouter();

  // 이전 페이지로 돌아감
  const returnButton = () => {
    router.back();
  };

  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <>
      <MetaHead
        title="내 정보 ℹ️"
        description="내 정보를 확인 또는 수정 할 수 있습니다!"
      />
      <DashBoardLayout>
        <div className="mt-5 ml-5 md:mb-[136px] sm:mb-[61px] min-h-screen">
          <button
            onClick={returnButton}
            className="text-[16px] font-[500] mb-[29px]"
          >
            &lt; 돌아가기
          </button>
          <MyProfile profileData={initialUser} />
          <MyPassWord />
        </div>
      </DashBoardLayout>
    </>
  );
};

export default MyPage;
