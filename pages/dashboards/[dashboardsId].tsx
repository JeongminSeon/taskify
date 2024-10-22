import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getColumns } from "../api/columnsApi";
import { ColoumnsParams, Columns, ColumnsResponse } from "@/types/columns";
import DashBoardLayout from "@/components/Layout/DashBoardLayout";

const DashboardDetail: React.FC = () => {
  const router = useRouter();
  const { dashboardsId } = router.query;
  const [columns, setColumns] = useState<Columns[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dashboardId = Number(dashboardsId); // dashboardsId 숫자로 변환
    const teamId = "9-1";

    const params: ColoumnsParams = { teamId, dashboardId };

    const fetchColumns = async () => {
      try {
        const columnsData: ColumnsResponse = await getColumns(params);
        setColumns(columnsData.data);
      } catch (err) {
        console.error("Error fetching columns:", err);
        setError("Failed to fetch columns. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (dashboardsId) {
      fetchColumns();
    }
  }, [dashboardsId]);

  // 로딩 및 오류 처리
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (columns.length === 0) return <div>No columns available.</div>;

  return (
    <DashBoardLayout>
      <div className="columns flex flex-col py-4 px-3">
        {columns.map((item) => (
          <div key={item.id} className="columnList">
            <h2 className="">
              {item.title}
              <span>설정</span>
            </h2>
            <button>+</button>
            <ul>
              <li className="columncard"></li>
            </ul>
          </div>
        ))}
      </div>
    </DashBoardLayout>
  );
};

export default DashboardDetail;
