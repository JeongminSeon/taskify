import MyDashList from "@/components/MyDashBoard/MyDashList";
import InvitedList from "@/components/MyDashBoard/InvitedList";
import DashBoardLayout from "@/components/Layout/DashBoardLayout";

const MyDashBoardPage = () => {
  return (
    <DashBoardLayout>
      <div className='w-full p-6 md:p-10 lg:max-w-[1102px]'>
        <MyDashList />
        <InvitedList />
      </div>
    </DashBoardLayout>
  );
};

export default MyDashBoardPage;
