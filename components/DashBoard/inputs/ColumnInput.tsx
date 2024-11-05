import { Columns } from "@/types/columns";
import { getColumns } from "@/utils/api/columnsApi";
import { useEffect, useState } from "react";
import { boxStyle, inputStyle, labelStyle } from "../styles";

// ColumnInput 컴포넌트의 props 인터페이스 정의
interface ColumnInputProps {
  value: number; // 선택된 컬럼의 ID
  onChange: (value: number) => void; // 선택 변경 시 호출되는 함수
  dashboardId: number; // 대시보드 ID
}

const ColumnInput = ({ value, onChange, dashboardId }: ColumnInputProps) => {
  const [columns, setColumns] = useState<Columns[]>([]); // 컬럼 상태 정의

  // 대시보드 ID가 변경될 때마다 컬럼을 가져오는 useEffect
  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const { data } = await getColumns({ dashboardId }); // API 호출하여 컬럼 데이터 가져오기
        setColumns(data); // 가져온 데이터로 상태 업데이트
      } catch (error) {
        throw error;
      }
    };

    fetchColumns(); // fetchColumns 함수 호출
  }, [dashboardId]); // dashboardId가 변경될 때마다 호출

  return (
    <div className={`${boxStyle}`}>
      <span className={`${labelStyle}`}>상태</span>
      <select
        className={`${inputStyle} text-purple100`}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {columns.map(
          (
            item // 컬럼 목록을 옵션으로 렌더링
          ) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          )
        )}
      </select>
    </div>
  );
};

export default ColumnInput;
