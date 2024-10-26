import { TodoFormProps } from "@/types/dashboards";

// 랜덤 색상 생성 함수
export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const INITIAL_VALUES = {
  assigneeUserId: 0,
  title: "",
  description: "",
  dueDate: null,
  tags: [],
  imageUrl: null,
  manager: "",
};

export const validateForm = (formData: TodoFormProps) => {
  return (
    formData.title &&
    formData.description &&
    formData.dueDate &&
    formData.tags.length > 0 &&
    formData.imageUrl !== null
  );
};

export const hexToRgba = (hex: string, opacity: number) => {
  const r = parseInt(hex.slice(1, 3), 16); // red
  const g = parseInt(hex.slice(3, 5), 16); // green
  const b = parseInt(hex.slice(5, 7), 16); // blue

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
