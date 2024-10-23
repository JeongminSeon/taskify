import { InviteListResponse, InviteList } from "@/types/invitedList";
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "@/pages/api/axiosInstanceApi";

export const useGetInvitedList = (size: number = 10) => {
  const [invitations, setInvitations] = useState<InviteList[]>([]); // 초대 목록 상태
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getInvitedboard = useCallback(async () => {
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      setLoading(false); // 토큰이 없으면 로딩 상태를 false로 설정
      return; // API 호출을 하지 않고 종료
    }
    try {
      setLoading(true);
      const response = await axiosInstance.get<InviteListResponse>(
        `invitations?size=${size}`
      );
      setInvitations(response.data.invitations);
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [size]); // invitations를 의존성에 추가

  // 컴포넌트가 처음 마운트될 때 데이터 로드
  useEffect(() => {
    getInvitedboard();
  }, [getInvitedboard]); // 여기서 getDashboard만 의존성으로 사용

  return { data: invitations, loading, error };
};
