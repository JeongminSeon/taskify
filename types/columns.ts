// 컬럼 목록 조회 파라미터 타입
export interface ColoumnsParams {
  teamId: string;
  dashboardId: number;
}

export interface Columns {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
}

// 컬럼 목록 타입
export interface ColumnsResponse {
  result: string;
  data: Columns[];
}
