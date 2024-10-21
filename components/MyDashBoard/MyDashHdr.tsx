import { hdMenuBtn, hdMenuBtnIcon } from "./style";
import { UserResponse } from "@/types/users";
import useGetUser from "@/hooks/useGetUser";
import Image from "next/image";

const MyDashHdr = () => {
  const { data } = useGetUser();
  const userData = data as UserResponse;

  return (
    <div className="border-b border-gray400 bg-white">
      <div className="headerWrap flex justify-between items-center w-full p-[13px_8px_13px_18px] md:px-10 md:py-[15px]">
        <h2 className="pageTitle flex-1 text-x font-bold md:text-xl lg:text-[2rem]">
          내 대시보드
        </h2>
        <ul className="flex gap-[6px] md:gap-4">
          <li>
            <button type="button" className={`${hdMenuBtn}`}>
              <span className={`${hdMenuBtnIcon}`}>
                <Image
                  src={"/images/icons/icon_settings.svg"}
                  width={15}
                  height={15}
                  alt="관리"
                />
              </span>
              관리
            </button>
          </li>
          <li>
            <button type="button" className={`${hdMenuBtn}`}>
              <span className={`${hdMenuBtnIcon}`}>
                <Image
                  src={"/images/icons/icon_add_box.svg"}
                  width={15}
                  height={15}
                  alt="초대하기"
                />
              </span>
              초대하기
            </button>
          </li>
        </ul>
        <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray400 md:ml-8 md:pl-8 lg:ml-9 lg:pl-9">
          <span className="overflow-hidden relative w-[34px] h-[34px] rounded-full bg-slate-500">
            {userData?.profileImageUrl ? (
              <Image
                src={userData.profileImageUrl}
                fill
                objectFit="cover"
                alt="Profile Image"
              />
            ) : (
              <Image
                src="https://via.placeholder.com/34"
                fill
                objectFit="cover"
                alt="Default Profile"
              />
            )}
          </span>
          <p className="hidden md:block">{userData ? userData.nickname : ""}</p>
        </div>
      </div>
    </div>
  );
};

export default MyDashHdr;
