import { Member } from "@/types/dashboards";
import { getMembers } from "@/utils/api/dashboardsApi";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useResponsiveThreshold from "@/hooks/dashboard/useResponsiveThreshold";

const AvatarGroup = () => {
  const showCountThreshold = useResponsiveThreshold(3, 5); // 표시할 아바타 수 결정
  const [avatars, setAvatars] = useState<Member[]>([]); // 멤버 아바타 상태
  const [totalCount, setTotalCount] = useState(0); // 총 멤버 수 상태
  const router = useRouter(); // 라우터 객체 생성
  const { dashboardsId } = router.query; // 대시보드 ID 쿼리 파라미터

  // 대시보드 ID가 변경되거나 처음 로드될 때 멤버 데이터 로드
  useEffect(() => {
    const loadMembers = async () => {
      if (!dashboardsId) return; // 대시보드 ID가 없으면 종료
      try {
        const response = await getMembers({
          dashboardId: Number(dashboardsId as string), // 대시보드 ID를 숫자로 변환
        });
        setAvatars(response.members); // 멤버 아바타 업데이트
        setTotalCount(response.totalCount); // 총 멤버 수 업데이트
      } catch (error) {
        throw error;
      }
    };
    if (dashboardsId) {
      loadMembers(); // 대시보드 ID가 있으면 멤버 로드
    }
  }, [dashboardsId]);

  return (
    <div className="flex items-center ml-4 relative z-0">
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
