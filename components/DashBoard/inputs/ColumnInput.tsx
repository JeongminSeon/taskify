import { Columns } from "@/types/columns";
import { getColumns } from "@/utils/api/columnsApi";
import { useEffect, useState } from "react";

interface ColumnInputProps {
  value: number;
  onChange: (value: number) => void;
  dashboardId: number;
}

const ColumnInput = ({ value, onChange, dashboardId }: ColumnInputProps) => {
  const [columns, setColumns] = useState<Columns[]>([]);

  useEffect(() => {
    const fetchColumns = async () => {
      const response = await getColumns({ dashboardId });
      setColumns(response.data || []);
    };

    fetchColumns();
  }, [dashboardId]);

  return (
    <select value={value} onChange={(e) => onChange(Number(e.target.value))}>
      {columns.map((item) => (
        <option key={item.id}>{item.title}</option>
      ))}
    </select>
  );
};

export default ColumnInput;
