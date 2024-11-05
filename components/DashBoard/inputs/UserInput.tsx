import { useEffect, useState } from "react";
import { getMembers } from "@/utils/api/dashboardsApi";
import { boxStyle, inputStyle, labelStyle } from "../styles";
import { Member } from "@/types/dashboards";

// UserInputProps 인터페이스 정의
interface UserInputProps {
  value: number; // 선택된 사용자 ID
  onChange: (value: number) => void; // 값 변경 핸들러
  dashboardId: number; // 대시보드 ID
}

const UserInput = ({ value, onChange, dashboardId }: UserInputProps) => {
  const [members, setMembers] = useState<Member[]>([]); // 멤버 목록 상태

  // 대시보드 ID가 변경될 때 멤버 목록을 가져오는 useEffect
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { members } = await getMembers({ dashboardId }); // 멤버 정보 API 호출
        setMembers(members); // 상태 업데이트
      } catch (error) {
        throw error;
      }
    };
    fetchMembers(); // 멤버 가져오기 함수 호출
  }, [dashboardId]); // dashboardId가 변경될 때마다 실행

  return (
    <div className={`${boxStyle}`}>
      <span className={`${labelStyle}`}>담당자</span>
      <select
        className={`${inputStyle} text-gray300`}
        name="assigneeUserId"
        value={value}
        onChange={(e) => {
          onChange(Number(e.target.value));
        }}
      >
        <option value="default">이름을 입력해주세요</option>
        {members.map((item) => (
          <option key={item.id} value={item.userId}>
            {item.nickname}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserInput;
