import Image from "next/image";
import React from "react";

interface MemberItemProps {
  member: {
    id: number;
    nickname: string;
    profileImageUrl?: string;
    userId: number;
  };
  handleDeleteMember: (id: number) => void;
  currentUserId: number;
}

const MemberItem: React.FC<MemberItemProps> = ({
  member,
  handleDeleteMember,
  currentUserId,
}) => {
  return (
    <li
      key={member.id}
      className="flex items-center gap-2 md:gap-3 py-3 md:py-4 px-4 md:px-7 border-b border-gray500"
    >
      <Image
        className="overflow-hidden relative w-[34px] h-[34px] rounded-full"
        src={member?.profileImageUrl || ""}
        alt="맴버 프로필"
        width="38"
        height="38"
      />

      <p className="flex-1 text-sm md:text-[16px]">{member.nickname}</p>
      {member.userId !== currentUserId && (
        <button
          type="button"
          className="sm:w-[52px] md:w-[84px] h-8 border border-gray400 rounded-[4px] text-xs md:text-sm text-purple100 font-medium leading-8"
          onClick={() => handleDeleteMember(member.id)}
        >
          삭제하기
        </button>
      )}
    </li>
  );
};

export default MemberItem;
