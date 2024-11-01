import MyDashList from "@/components/MyDashBoard/MyDashList";
import InvitedList from "@/components/MyDashBoard/InvitedList";
import DashBoardLayout from "@/components/Layout/DashBoardLayout";
import MetaHead from "@/components/MetaHead";
import { GetServerSideProps } from "next";
import { parse } from "cookie";
import { getUserInfo } from "@/utils/api/authApi";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const cookies = parse(req.headers.cookie || "");
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
    // 로그인 토큰이 있을 경우 사용자 정보 가져오기
    const user = await getUserInfo(accessToken);
    return {
      props: {
        initialUser: user,
      },
    };
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};

const MyDashBoardPage = () => {
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
