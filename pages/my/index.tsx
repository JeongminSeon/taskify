import DashBoardLayout from "@/components/Layout/DashBoardLayout";
import MyPassWord from "@/components/My/MyPassWord";
import MyProfile from "@/components/My/MyProfile";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { ProfileProps } from "@/types/my";
import MetaHead from "@/components/MetaHead";
import { useAuth } from "@/utils/auth";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return useAuth(context);
};

const MyPage = ({ profileData }: { profileData: ProfileProps }) => {
  const router = useRouter();
  const returnButton = () => {
    router.back();
  };

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
          <MyProfile profileData={profileData} />
          <MyPassWord />
        </div>
      </DashBoardLayout>
    </>
  );
};

export default MyPage;
