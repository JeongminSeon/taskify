// 컬럼 목록 조회 파라미터 타입
export interface ColoumnsParams {
  dashboardId: number;
}

// 컬럼 타입
export interface Columns {
  id: number;
  title: string;
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
  title: string;
  dashboardId: number;
}

// 컬럼 생성 응답 타입
export interface ColumnsResponse {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

// 이미지 생성 파라미터 타입
export interface ImageCreateParams {
  columnId: number;
  image: File;
}

// 이미지 생성 응답 타입
export interface ImageCreateResponse {
  imageUrl: string;
}

// 컬럼 수정 파라미터 타입
export interface ColumnsUpdateParams {
  columnId: number;
  title: string;
}

// 컬럼 삭제 파라미터 타입
export interface ColumnsDeleteParams {
  columnId: number;
}
