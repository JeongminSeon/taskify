import { DashboardDetailResponse } from "@/types/dashboards";
import Link from "next/link";
import Image from "next/image";
import DashBoardLink from "./DashBoardLink";

interface MyDashSideMenuProps {
  data: DashboardDetailResponse | null; // 데이터가 null일 수도 있으므로
}

const MyDashSideMenu: React.FC<MyDashSideMenuProps> = ({ data }) => {
  return (
    <div className="sticky top-0 h-screen py-5 px-[14px] border-r border-gray400 bg-white lg:px-2 ">
      <h1 className="md:hidden">
        <Link href="/">
          <Image
            src={"/images/logos/logo-small.svg"}
            width={23}
            height={27}
            alt="로고"
          />
        </Link>
      </h1>
      <h1 className="hidden md:block">
        <Link href="/">
          <Image
            src={"/images/logos/logo-large.svg"}
            width={109}
            height={33}
            alt="로고"
          />
        </Link>
      </h1>
      <div className="mt-[38px] color text-gray200 text-xs">
        <button
          type="button"
          className="flex justify-between items-center w-full py-4"
        >
          <span className="hidden font-semibold md:inline-block">
            Dash Boards
          </span>
          <Image
            src={"/images/icons/icon_add_box.svg"}
            width={20}
            height={20}
            alt="초대하기"
            className="mx-auto md:mx-0"
          />
        </button>
        <ul className="flex flex-col gap-2">
          {data?.dashboards.map((dashboard) => (
            <li key={dashboard.id} className="md:px-[10px] lg:px-3">
              <DashBoardLink
                id={dashboard.id}
                title={dashboard.title}
                color={dashboard.color}
                createdByMe={dashboard.createdByMe}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyDashSideMenu;
