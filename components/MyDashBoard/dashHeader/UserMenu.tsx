import React from "react";
import Image from "next/image";
import Dropdown from "@/components/UI/dropdown/Dropdown";

// 사용자 정보를 담는 인터페이스 정의
interface User {
  profileImageUrl?: string; // 프로필 이미지 URL
  nickname?: string; // 사용자 닉네임
}

// UserProfileProps 인터페이스 정의
interface UserProfileProps {
  user: User | null; // 사용자 정보
  isDropdownOpen: boolean; // 드롭다운 열림 여부
  onDropdownToggle: () => void; // 드롭다운 토글 핸들러
  dropdownItems: { label: string; onClick?: () => void; href?: string }[]; // 드롭다운 항목
}

const UserMenu: React.FC<UserProfileProps> = ({
  user,
  isDropdownOpen,
  onDropdownToggle,
  dropdownItems,
}) => {
  return (
    <>
      <div className="relative">
        <button
          onClick={onDropdownToggle}
          className="relative flex items-center gap-3 ml-4 pl-4 border-l border-gray400 md:ml-8 md:pl-8 lg:ml-9 lg:pl-9"
        >
          <span className="overflow-hidden relative w-[34px] h-[34px] rounded-full bg-slate-500">
            {user?.profileImageUrl ? (
              <Image
                className="object-cover"
                src={user.profileImageUrl}
                fill
                alt="Profile Image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <Image
                className="object-cover"
                src="https://via.placeholder.com/34"
                fill
                alt="Default Profile"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
          </span>
          <p className="hidden md:block">{user?.nickname || ""}</p>
        </button>
        {isDropdownOpen && (
          <Dropdown isOpen={isDropdownOpen} items={dropdownItems} />
        )}
      </div>
    </>
  );
};

export default UserMenu;
