import axiosInstance from "@/utils/api/axiosInstanceApi";
import React, { useEffect, useState } from "react";

interface Member {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}

const AvatarGroup = () => {
  const [avatars, setAvatars] = useState<Member[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const loadMembers = async () => {
    try {
      const response = await axiosInstance.get(
        "/members?page=1&size=20&dashboardId=12006"
      );
      setAvatars(response.data.members);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error("예기치 못한 에러가 발생했습니다.", error);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  return (
    <div className="flex items-center">
      {avatars.slice(0, 4).map((member, index) => (
        <div
          key={member.id}
          style={{
            backgroundColor: member.profileImageUrl ? "transparent" : "#90cdf4", // 이미지가 없을 때 색상 설정
            backgroundImage: member.profileImageUrl
              ? `url(${member.profileImageUrl})`
              : "none", // 이미지가 있을 때만 설정
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: avatars.length - index,
          }}
          className="w-10 h-10 rounded-full text-white flex items-center justify-center text-lg -ml-3 border-2 border-white"
        >
          <p>{member.nickname[0]}</p>
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
