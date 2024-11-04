import { TodoFormProps } from "@/types/dashboards";

// 랜덤 색상 생성 함수
export const getRandomColor = () => {
  const letters = "0123456789ABCDEF"; // 16진수 색상 코드에서 사용할 수 있는 문자
  let color = "#"; // 색상 문자열 초기화
  for (let i = 0; i < 6; i++) {
    // 6자리의 16진수 색상 코드 생성
    color += letters[Math.floor(Math.random() * 16)]; // 무작위로 16진수 문자를 추가
  }
  return color; // 생성된 색상 코드 반환
};

// 초기 값 설정 객체
export const INITIAL_VALUES = {
  dashboardId: 0, // 대시보드 ID (초기값: 0)
  columnId: 0, // 열 ID (초기값: 0)
  assigneeUserId: 0, // 할당된 사용자 ID (초기값: 0)
  title: "", // 할 일 제목 (초기값: 빈 문자열)
  description: "", // 할 일 설명 (초기값: 빈 문자열)
  dueDate: "", // 기한 (초기값: 빈 문자열)
  tags: [], // 태그 배열 (초기값: 빈 배열)
  imageUrl: "", // 이미지 URL (초기값: 빈 문자열)
};

// 폼 데이터 유효성 검사 함수
export const validateForm = (formData: TodoFormProps) => {
  // 제목, 설명, 기한, 태그, 이미지 URL이 모두 채워져 있는지 확인
  return (
    formData.title && // 제목이 비어있지 않으면 true
    formData.description && // 설명이 비어있지 않으면 true
    formData.dueDate && // 기한이 비어있지 않으면 true
    formData.tags.length > 0 && // 태그 배열의 길이가 0보다 크면 true
    formData.imageUrl !== "" // 이미지 URL이 비어있지 않으면 true
  );
};

// 16진수 색상을 RGBA로 변환하는 함수
export const hexToRgba = (hex: string, opacity: number) => {
  const r = parseInt(hex.slice(1, 3), 16); // 빨강 색상 값
  const g = parseInt(hex.slice(3, 5), 16); // 초록 색상 값
  const b = parseInt(hex.slice(5, 7), 16); // 파랑 색상 값

  // RGBA 형식으로 변환된 색상 문자열 반환
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
