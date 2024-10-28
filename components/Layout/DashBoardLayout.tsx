import { ReactNode } from "react";
import { getDashboards } from "@/utils/api/dashboardsApi";
import { GetServerSideProps } from "next";
import MyDashSideMenu from "../MyDashBoard/MyDashSideMenu";
import MyDashHdr from "../MyDashBoard/MyDashHdr";

import { Dashboard } from "@/types/dashboards";
//import { useDashBoardStore } from "@/store/dashBoardStore";

interface DashBoardLayoutProps {
  children: ReactNode;
  initialDashboards: Dashboard[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const data = await getDashboards(1, 20); // 대시보드 목록 가져오기

    console.log(data);
    return {
      props: { initialDashboards: data.dashboards },
    };
  } catch (error) {
    console.error("Error fetching user info:", error);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};

const DashBoardLayout = ({
  children,
  //initialUser,
  initialDashboards,
}: DashBoardLayoutProps) => {
  return (
    <div className="grid grid-cols-[67px_1fr] md:grid-cols-[160px_1fr] lg:grid-cols-[300px_1fr] transition-all duration-300">
      <MyDashSideMenu initialDashboards={initialDashboards} />
      <div className="bg-gray600 ">
        <MyDashHdr />
        {children}
      </div>
    </div>
  );
};

export default DashBoardLayout;
