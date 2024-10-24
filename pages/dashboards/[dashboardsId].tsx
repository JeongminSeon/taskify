import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getColumns } from "../../utils/api/columnsApi";
import { ColoumnsParams, Columns, ColumnsResponse } from "@/types/columns";
import Image from "next/image";
import Column from "@/components/DashBoard/Column";
import DashBoardLayout from "@/components/Layout/DashBoardLayout";

const DashboardDetail: React.FC = () => {
  const router = useRouter();
  const { dashboardsId } = router.query;
  const [columns, setColumns] = useState<Columns[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchColumns = async () => {
      const dashboardId = Number(dashboardsId); // dashboardsId 숫자로 변환
      const params: ColoumnsParams = { teamId: "9-1", dashboardId };

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (columns.length === 0) return <div>No columns available.</div>;

  return (
    <DashBoardLayout>
      <div className="columns flex flex-col lg:flex-row">
        {columns.map((item) => (
          <Column key={item.id} id={item.id} title={item.title} />
        ))}
        <div className="columnList flex-1 h-screen py-4 px-3 md:p-5 border-r border-[gray600]">
          <button
            type="button"
            className="flex justify-center items-center gap-3 w-full sm:h-[66px] h-[70px] lg:mt-12 border border-gray400 rounded-md bg-white100 text-black300 font-bold"
          >
            새로운 컬럼 추가하기
            <Image
              src="/images/icons/icon_add_column.svg"
              width={16}
              height={16}
              alt="할 일 추가"
            />
          </button>
        </div>
      </div>
    </DashBoardLayout>
  );
};

export default DashboardDetail;
