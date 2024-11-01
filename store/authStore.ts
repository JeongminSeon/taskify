import { create } from "zustand";
import { getUserInfo, getLogin } from "@/utils/api/authApi";

interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  login: (loginData: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
    useAuthStore.getState();
  },
  login: async (loginData: { email: string; password: string }) => {
    try {
      const { user } = await getLogin(loginData);
      set({ user, isAuthenticated: true });
      // 로그인 성공 시, 상태 업데이트
      useAuthStore.getState();
    } catch (error) {
      console.error("로그인 실패:", error);
      set({ user: null, isAuthenticated: false });
    }
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
    // store 상태 업데이트
    useAuthStore.getState();
  },
  checkAuth: async () => {
    try {
      const user = await getUserInfo();
      set({ user, isAuthenticated: true });
      // 인증상태 확인
      useAuthStore.getState();
    } catch (error) {
      set({ user: null, isAuthenticated: false });
      console.error("인증 실패:", error);
    }
  },
}));
