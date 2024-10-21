import MyDashHdr from "@/components/MyDashBoard/MyDashHdr";
import MyDashSideMenu from "@/components/MyDashBoard/MyDashSideMenu";
import MyDashList from "@/components/MyDashBoard/MyDashList";
import InvitedList from "@/components/MyDashBoard/InvitedList";

const MyDashBoardPage = () => {
  return (
    <div className="grid grid-cols-[67px_1fr] md:grid-cols-[160px_1fr] lg:grid-cols-[300px_1fr] transition-all duration-300">
      <MyDashSideMenu />
      <div className="bg-gray600 ">
        <MyDashHdr />
        <div className="w-full p-6 md:p-10 lg:max-w-[1102px]">
          <MyDashList />
          <InvitedList />
        </div>
      </div>
    </div>
  );
};

export default MyDashBoardPage;
