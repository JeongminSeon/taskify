import Link from "next/link";
import Image from "next/image";
import { menuListBox } from "./style";

interface DashboardLinkProps {
  id: number;
  title: string;
  color: string;
  createdByMe: boolean;
}

const DashBoardLink: React.FC<DashboardLinkProps> = ({
  id,
  title,
  color,
  createdByMe,
}) => {
  return (
    <Link href={`/dashboard/${id}`} className={`${menuListBox}`}>
      <span
        className="block w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
      ></span>
      <span className="hidden md:block">{title}</span>
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
