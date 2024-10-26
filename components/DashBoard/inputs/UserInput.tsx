import { useEffect, useState } from "react";
import { getMembers } from "@/utils/api/dashboardsApi";
import { boxStyle, inputStyle, labelStyle } from "../styles";
import { MemberProps } from "@/types/dashboards";

interface UserInputProps {
  value: number;
  onChange: (value: number) => void;
}

const DASHBOARD_ID = 12060;

const UserInput = ({ value, onChange }: UserInputProps) => {
  const [members, setMembers] = useState<MemberProps[]>([]);
  const fetchMembers = async () => {
    try {
      const { members } = await getMembers(DASHBOARD_ID);
      setMembers(members);
    } catch (error) {
      console.error("Failed to fetch members:", error);
    }
  };
  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className={`${boxStyle}`}>
      <span className={`${labelStyle}`}>관리자</span>
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
