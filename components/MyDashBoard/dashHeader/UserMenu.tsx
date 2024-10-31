import React from "react";
import Image from "next/image";
import Dropdown from "@/components/UI/dropdown/Dropdown";

interface User {
  profileImageUrl?: string;
  nickname?: string;
}

interface UserProfileProps {
  user: User | null;
  isDropdownOpen: boolean;
  onDropdownToggle: () => void;
  dropdownItems: { label: string; onClick?: () => void; href?: string }[];
}

const UserMenu: React.FC<UserProfileProps> = ({
  user,
  isDropdownOpen,
  onDropdownToggle,
  dropdownItems,
}) => {
  return (
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
      {isDropdownOpen && (
        <div className="absolute top-[45px] right-0 w-[100px] bg-white rounded-md shadow-lg z-10">
          <Dropdown isOpen={isDropdownOpen} items={dropdownItems} />
        </div>
      )}
    </button>
  );
};

export default UserMenu;
