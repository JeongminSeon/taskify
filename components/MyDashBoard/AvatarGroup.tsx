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
    <div className="flex items-center ml-4">
      {avatars.slice(0, 4).map((member, index) => (
        <div
          key={member.id}
          style={{
            backgroundColor: member.profileImageUrl ? "transparent" : "#90cdf4",
            backgroundImage: member.profileImageUrl
              ? `url(${member.profileImageUrl})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            zIndex: index,
          }}
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg -ml-3 border border-white"
        >
          {!member.profileImageUrl && <span>{member.nickname[0]}</span>}
        </div>
      ))}
      {totalCount > 4 && (
        <div
          style={{ backgroundColor: "#f4cccc" }}
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg -ml-3 border border-white"
        >
          +{totalCount - 4}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
