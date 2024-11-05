import { menuListBox } from "./MyDashStyle";
import Link from "next/link";
import Image from "next/image";

// 대시보드 링크의 Props 인터페이스 정의
interface DashboardLinkProps {
  id: number; // 대시보드 ID
  title: string; // 대시보드 제목
  color?: string; // 대시보드 색상 (선택적)
  createdByMe: boolean; // 내가 생성한 대시보드 여부
}

const DashBoardLink: React.FC<DashboardLinkProps> = ({
  id,
  title,
  color,
  createdByMe,
}) => {
  return (
    <Link href={`/dashboards/${id}`} className={`${menuListBox}`}>
      <span
        className="block flex-none w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
      ></span>
      <span className="hidden md:block leading-[26px] truncate">{title}</span>
      {createdByMe && (
        <Image
          src="/images/icons/icon_crown.svg"
          width={20}
          height={18}
          className="hidden md:block md:h-[14px] md:w-[18px]"
          alt="왕관"
        />
      )}
    </Link>
  );
};

export default DashBoardLink;
