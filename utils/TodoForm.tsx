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
  title: "",
  description: "",
  dueDate: null,
  tags: [],
  imageUrl: null,
  manager: "",
};

// 파일을 Base64로 변환하는 유틸리티 함수
// export const toBase64 = (file: File): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//   });
// };
