import { ReactNode } from "react";
import MyDashSideMenu from "../MyDashBoard/MyDashSideMenu";
import MyDashHdr from "../MyDashBoard/MyDashHdr";

const DashBoardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-cols-[67px_1fr] md:grid-cols-[160px_1fr] lg:grid-cols-[300px_1fr] transition-all duration-300 h-screen min-h-screen">
      <MyDashSideMenu />
      <div className="bg-gray600 ">
        <MyDashHdr />
        {children}
      </div>
    </div>
  );
};

export default DashBoardLayout;
