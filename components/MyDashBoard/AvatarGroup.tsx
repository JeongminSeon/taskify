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
  const [showCountThreshold, setShowCountThreshold] = useState(5);

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
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowCountThreshold(3);
      } else {
        setShowCountThreshold(5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    loadMembers();
  }, []);

  return (
    <div className="flex items-center ml-4">
      {avatars.slice(0, 4).map((member, index) => (
        <div
          key={member.id}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-lg -ml-3 border border-white ${
            member.profileImageUrl ? "bg-white" : "bg-blue-400"
          } relative`}
          style={{
            backgroundImage: member.profileImageUrl
              ? `url(${member.profileImageUrl})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: index,
          }}
        >
          {!member.profileImageUrl && <span>{member.nickname[0]}</span>}
        </div>
      ))}
      {totalCount > showCountThreshold && (
        <div className="w-10 h-10 rounded-full bg-red-200 text-white flex items-center justify-center text-lg -ml-3 border border-white z-50">
          +{totalCount - showCountThreshold}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
