import DashBoardLayout from "@/components/Layout/DashBoardLayout";
import MyPassWord from "@/components/My/MyPassWord";
import MyProfile from "@/components/My/MyProfile";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { getUserInfo } from "@/utils/api/authApi";
import { ProfileProps } from "@/types/my";
import { parseCookies } from "nookies";
import MetaHead from "@/components/MetaHead";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context); // 쿠키 파싱

  try {
    // 쿠키에서 필요한 인증 토큰을 가져오기
    const accessToken = cookies.accessToken; // 쿠키 이름에 맞게 수정

    const profileData = await getUserInfo(accessToken); // 서버에서 프로필 데이터 가져오기
    return {
      props: { profileData }, // 데이터를 props로 전달
    };
  } catch (error) {
    console.error("프로필 정보를 불러오는 중 오류 발생했습니다.", error);
    return {
      props: { profileData: null }, // 오류 발생 시 null 전달
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
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
