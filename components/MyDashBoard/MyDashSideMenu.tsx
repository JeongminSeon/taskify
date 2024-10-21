import { menuListBox } from "./style";
import { DashboardDetailResponse } from "@/types/dashboards";
import Link from "next/link";
import Image from "next/image";
import AddBox from "@/public/images/icons/icon_add_box.svg";
import SmlLogo from "@/public/images/logos/logo-small.svg";
import LgLogo from "@/public/images/logos/logo-large.svg";

interface MyDashSideMenuProps {
  data: DashboardDetailResponse | null; // 데이터가 null일 수도 있으므로
}

const MyDashSideMenu: React.FC<MyDashSideMenuProps> = ({ data }) => {
  return (
    <div className="sticky top-0 h-screen py-5 px-[14px] border-r border-gray400 bg-white lg:px-2 ">
      <h1 className="md:hidden">
        <Link href="/">
          <SmlLogo className="mx-auto" />
        </Link>
      </h1>
      <h1 className="hidden md:block">
        <Link href="/">
          <LgLogo />
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
          <AddBox className="mx-auto md:mx-0" />
        </button>
        <ul className="flex flex-col gap-2">
          {data?.dashboards.map((dashboard) => (
            <li key={dashboard.id} className="md:px-[10px] lg:px-3">
              <Link
                href={`/dashboard/${dashboard.id}`}
                className={`${menuListBox}`}
              >
                <span
                  className="block w-2 h-2 rounded-full"
                  style={{ backgroundColor: dashboard.color }}
                ></span>
                <span className="hidden md:block">{dashboard.title}</span>
                {dashboard.createdByMe && (
                  <Image
                    src={"/images/icons/icon_crown.svg"}
                    width={20}
                    height={18}
                    className="hidden md:block md:h-[14px] md:w-[18px]"
                    alt="왕관"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyDashSideMenu;
