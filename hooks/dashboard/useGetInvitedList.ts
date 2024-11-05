import { MyInviteListResponse, MyInviteList } from "@/types/invitedList";
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "@/utils/api/axiosInstanceApi";

// 주어진 크기(size)만큼 초대 목록 데이터를 가져오는 역할을 함
export const useGetInvitedList = (size: number = 10) => {
  const [invitations, setInvitations] = useState<MyInviteList[]>([]); // 초대 목록 상태
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 초대 목록을 서버에서 가져오는 함수
  const getInvitedboard = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<MyInviteListResponse>(
        `invitations?size=${size}` // size에 따른 요청 URL 설정
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
