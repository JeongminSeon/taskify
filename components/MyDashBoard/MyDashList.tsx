import { useDashboardContext } from "@/context/DashboardContext";

const MyDashList: React.FC = () => {
  const { dashboards } = useDashboardContext();

  return (
    <div>
      {dashboards?.dashboards.map((dashboard) => (
        <div key={dashboard.id}>
          <h3>{dashboard.title}</h3>
          {/* 대시보드에 대한 추가 정보 표시 */}
        </div>
      ))}
    </div>
  );
};

export default MyDashList;
