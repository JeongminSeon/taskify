import { useEffect, useState } from "react";
import { getMembers } from "@/utils/api/dashboardsApi";
import { boxStyle, inputStyle, labelStyle } from "../styles";
import { Member } from "@/types/dashboards";

interface UserInputProps {
  value: number;
  onChange: (value: number) => void;
  dashboardId: number;
}

const UserInput = ({ value, onChange, dashboardId }: UserInputProps) => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { members } = await getMembers({ dashboardId });
        setMembers(members);
      } catch (error) {
        throw error;
      }
    };
    fetchMembers();
  }, [dashboardId]);

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
