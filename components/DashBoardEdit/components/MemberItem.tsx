import Image from "next/image";
import React from "react";

// MemberItemProps 인터페이스 정의
interface MemberItemProps {
  member: {
    id: number; // 멤버의 고유 ID
    nickname: string; // 멤버의 별명
    profileImageUrl?: string; // 프로필 이미지 URL (선택적)
    userId: number; // 멤버의 사용자 ID
  };
  handleDeleteMember: (id: number) => void; // 멤버 삭제 함수
  currentUserId: number; // 현재 사용자 ID
}

const MemberItem: React.FC<MemberItemProps> = ({
  member, // 멤버 정보
  handleDeleteMember, // 삭제 처리 함수
  currentUserId, // 현재 사용자 ID
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

      {/* 현재 사용자와 다른 경우에만 삭제 버튼 표시 */}
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
