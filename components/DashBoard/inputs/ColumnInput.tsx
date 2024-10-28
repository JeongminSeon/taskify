import { Columns } from "@/types/columns";
import { getColumns } from "@/utils/api/columnsApi";
import { useEffect, useState } from "react";
import { boxStyle, inputStyle, labelStyle } from "../styles";

interface ColumnInputProps {
  value: number;
  onChange: (value: number) => void;
  dashboardId: number;
}

const ColumnInput = ({ value, onChange, dashboardId }: ColumnInputProps) => {
  const [columns, setColumns] = useState<Columns[]>([]);

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const { data } = await getColumns({ dashboardId });
        setColumns(data);
      } catch (error) {
        console.error("Failed to fetch columns:", error);
      }
    };

    fetchColumns();
  }, [dashboardId]);

  return (
    <div className={`${boxStyle}`}>
      <span className={`${labelStyle}`}>상태</span>
      <select
        className={`${inputStyle}`}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {columns.map((item) => (
          <option key={item.id} value={item.id}>
            {item.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ColumnInput;
