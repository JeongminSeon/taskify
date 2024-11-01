import { Member } from "@/types/dashboards";
import { getMembers } from "@/utils/api/dashboardsApi";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useResponsiveThreshold from "@/hooks/dashboard/useResponsiveThreshold";

const AvatarGroup = () => {
  const showCountThreshold = useResponsiveThreshold(3, 5);
  const [avatars, setAvatars] = useState<Member[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter();
  const { dashboardsId } = router.query;

  const loadMembers = async () => {
    if (!dashboardsId) return;
    try {
      const response = await getMembers({
        dashboardId: Number(dashboardsId as string),
      }); // id를 문자열로 캐스팅
      setAvatars(response.members);
      setTotalCount(response.totalCount);
    } catch (error) {
      console.error("예기치 못한 에러가 발생했습니다.", error);
    }
  };

  // id가 변경되었거나 처음 로드되었을 때만 loadMembers 호출
  useEffect(() => {
    if (dashboardsId) {
      loadMembers();
    }
  }, [dashboardsId]);

  return (
    <div className="flex items-center ml-4">
      {avatars.slice(0, showCountThreshold).map((member, index) => (
        <div
          key={member.id}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-lg -ml-3 border border-white bg-cover bg-center ${
            member.profileImageUrl ? "bg-gray-200" : "bg-blue-400"
          } relative`}
          style={{
            backgroundImage: member.profileImageUrl
              ? `url(${member.profileImageUrl})`
              : "none",
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
