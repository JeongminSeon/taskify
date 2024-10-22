import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getColumns } from "../api/columnsApi";
import { ColoumnsParams, Columns, ColumnsResponse } from "@/types/columns";
import DashBoardLayout from "@/components/Layout/DashBoardLayout";
import Image from "next/image";
import CardList from "@/components/Cards/CardList";

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
      <div className="columns flex flex-col lg:flex-row">
        {columns.map((item) => (
          <div
            key={item.id}
            className="columnList flex-1 h-screen py-4 px-3 md:p-5 border-r border-[gray600]"
          >
            <h2 className="flex items-center gap-2 text-black100 font-bold">
              <span className="block w-2 h-2 rounded-full bg-purple100"></span>
              <p className="flex-1">{item.title}</p>
              <span>
                <Image
                  src="/images/icons/icon_settings.svg"
                  width={22}
                  height={22}
                  alt="설정"
                />
              </span>
            </h2>
            <button
              type="button"
              className="block w-full h-8 md:h-10 mt-6 border border-gray400 rounded-md bg-white100"
            >
              <Image
                src="/images/icons/icon_add_column.svg"
                width={16}
                height={16}
                alt="할 일 추가"
                className="mx-auto"
              />
            </button>
            <CardList columnId={item.id} />
          </div>
        ))}
      </div>
    </DashBoardLayout>
  );
};

export default DashboardDetail;
