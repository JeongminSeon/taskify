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
    console.log("setUser 호출됨:", user);
    set({ user, isAuthenticated: true });
    console.log("Store 상태 업데이트됨:", useAuthStore.getState());
  },
  login: async (loginData: { email: string; password: string }) => {
    try {
      const { user } = await getLogin(loginData);
      set({ user, isAuthenticated: true });
      console.log("로그인 성공:", useAuthStore.getState());
    } catch (error) {
      console.error("로그인 실패:", error);
      set({ user: null, isAuthenticated: false });
    }
  },
  logout: () => {
    console.log("logout 호출됨");
    set({ user: null, isAuthenticated: false });
    console.log("Store 상태 업데이트됨:", useAuthStore.getState());
  },
  checkAuth: async () => {
    try {
      const user = await getUserInfo();
      set({ user, isAuthenticated: true });
      console.log("인증 상태 확인됨:", useAuthStore.getState());
    } catch (error) {
      set({ user: null, isAuthenticated: false });
      console.error("인증 실패:", error);
    }
  },
}));
