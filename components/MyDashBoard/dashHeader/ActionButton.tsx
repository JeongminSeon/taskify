import Image from "next/image";
import Link from "next/link";
import React from "react";
import { hdMenuBtn, hdMenuBtnIcon } from "../MyDashStyle";

const ActionButton = ({ dashboardsId }) => {
  return (
    <ul className="flex gap-[6px] md:gap-4">
      <li>
        <Link
          href={`/dashboards/${dashboardsId}/edit`}
          className={`${hdMenuBtn}`}
        >
          <span className={`${hdMenuBtnIcon}`}>
            <Image
              src="/images/icons/icon_settings.svg"
              width={15}
              height={15}
              alt="관리"
            />
          </span>
          관리
        </Link>
      </li>
      <li>
        <button type="button" className={`${hdMenuBtn}`}>
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
    </ul>
  );
};

export default ActionButton;
