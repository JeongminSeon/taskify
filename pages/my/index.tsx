import DashBoardLayout from "@/components/Layout/DashBoardLayout";
import MyPassWord from "@/components/My/MyPassWord";
import MyProfile from "@/components/My/MyProfile";
import { useRouter } from "next/router";

const MyPage = () => {
  const router = useRouter();
  const returnButton = () => {
    router.back();
  };
  return (
    <DashBoardLayout>
      <div className="mt-5 ml-5 min-h-screen">
        <button
          onClick={returnButton}
          className="text-[16px] font-[500] mb-[29px]"
        >
          &lt; 돌아가기
        </button>
        <MyProfile />
        <MyPassWord />
      </div>
    </DashBoardLayout>
  );
};

export default MyPage;
