import { hdMenuBtn, hdMenuBtnIcon } from "../MyDashStyle";
import Image from "next/image";
import React from "react";
import AvatarGroup from "../AvatarGroup";

interface ActionButtonProps {
  onManageClick: () => void; // 관리 버튼 클릭 핸들러
  onInviteClick: () => void; // 초대하기 버튼 클릭 핸들러
  isMyDashboardPage: boolean; // 현재 페이지가 내 대시보드인지 여부
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onManageClick,
  onInviteClick,
  isMyDashboardPage,
}) => {
  if (isMyDashboardPage) return null; // '/mydashboard'에서 버튼을 숨김
  return (
    <ul className="flex items-center gap-[6px] md:gap-4">
      <li>
        <button onClick={onManageClick} className={`${hdMenuBtn}`}>
          <span className={`${hdMenuBtnIcon}`}>
            <Image
              src="/images/icons/icon_settings.svg"
              width={15}
              height={15}
              alt="관리"
            />
          </span>
          관리
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={onInviteClick}
          className={`${hdMenuBtn}`}
        >
          <span className={`${hdMenuBtnIcon}`}>
            <Image
              src="/images/icons/icon_add_box.svg"
              width={15}
              height={15}
              alt="초대하기"
            />
          </span>
          초대하기
        </button>
      </li>
      <li>
        <AvatarGroup />
      </li>
    </ul>
  );
};

export default ActionButton;
