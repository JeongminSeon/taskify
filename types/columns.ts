// 컬럼 목록 조회 파라미터 타입
export interface ColoumnsParams {
  dashboardId: number; // 조회할 대시보드의 ID
}

// 컬럼 타입
export interface Columns {
  id: number; // 컬럼 ID
  title: string; // 컬럼 제목
  teamId: string;
  createdAt: string; // 컬럼 생성 일시
  updatedAt: string; // 컬럼 수정 일시
}

// 컬럼 목록 응답 타입
export interface ColumnsResponse {
  result: string; // 응답 결과 메시지
  data: Columns[]; // 컬럼 목록
}

// 컬럼 생성 파라미터 타입
export interface ColumnsCreateParams {
  title: string; // 생성할 컬럼의 제목
  dashboardId: number; // 해당 컬럼이 속할 대시보드의 ID
}

// 컬럼 생성 응답 타입
export interface ColumnsCreateResponse {
  id: number; // 생성된 컬럼의 ID
  title: string; // 생성된 컬럼의 제목
  createdAt: string; // 컬럼 생성 일시
  updatedAt: string; // 컬럼 수정 일시
}

// 이미지 생성 파라미터 타입
export interface ImageCreateParams {
  columnId: number; // 이미지를 추가할 컬럼의 ID
  image: File; // 업로드할 이미지 파일
}

// 이미지 생성 응답 타입
export interface ImageCreateResponse {
  imageUrl: string; // 생성된 이미지의 URL
}

// 컬럼 수정 파라미터 타입
export interface ColumnsUpdateParams {
  columnId: number; // 수정할 컬럼의 ID
  title: string; // 새로운 컬럼 제목
}

// 컬럼 삭제 파라미터 타입
export interface ColumnsDeleteParams {
  columnId: number; // 삭제할 컬럼의 ID
}
