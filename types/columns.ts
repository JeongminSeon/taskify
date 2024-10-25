// 컬럼 목록 조회 파라미터 타입
export interface ColoumnsParams {
  teamId: string;
  dashboardId: number;
}

// 컬럼 타입
export interface Columns {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
}

// 컬럼 목록 응답 타입
export interface ColumnsResponse {
  result: string;
  data: Columns[];
}

// 컬럼 생성 파라미터 타입
export interface ColumnsCreateParams {
  teamId: string;
  title: string;
  dashboardId: number;
}

// 컬럼 생성 응답 타입
export interface ColumnsCreateResponse {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

// 이미지 생성 파라미터 타입
export interface ImageCreateParams {
  columnId: number;
  image: File | null;
}

// 이미지 생성 응답 타입
export interface ImageCreateResponse {
  imageUrl: string;
}
