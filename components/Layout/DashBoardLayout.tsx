import { ReactNode, useEffect } from "react";
import MyDashSideMenu from "../MyDashBoard/MyDashSideMenu";
import MyDashHdr from "../MyDashBoard/MyDashHdr";
import { useDashBoardStore } from "@/store/dashBoardStore";

const DashBoardLayout = ({ children }: { children: ReactNode }) => {
  const { dashboards, setDashboards } = useDashBoardStore();

  // setDashboards() 호출되고, 상태 업데이트
  useEffect(() => {
    const fetchDashboards = async () => {
      await setDashboards();
      // 상태가 업데이트된 후 dashboards 확인
      console.log("빈배열", dashboards);
    };

    fetchDashboards();
  }, [setDashboards]);

  return (
    <div className="grid grid-cols-[67px_1fr] md:grid-cols-[160px_1fr] lg:grid-cols-[300px_1fr] transition-all duration-300">
      <MyDashSideMenu dashboards={dashboards} />
      <div className="bg-gray600 ">
        <MyDashHdr dashboards={dashboards} />
        {children}
      </div>
    </div>
  );
};

export default DashBoardLayout;
