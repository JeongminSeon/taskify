import axiosInstance from "./axiosInstanceApi";

interface formData {
  email: string;
  nickname: string;
  password: string;
}

export const createUser = async (formData: formData) => {
  try {
    const response = await axiosInstance.post("/users", formData);
    return response.data;
  } catch (error) {
    console.error("유저 생성 중 오류가 발생했습니다.", error);
    throw error;
  }
};

export const login = async () => {};
