import { DashboardProvider } from "@/context/DashboardContext";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import "@/styles/globals.css";

// app 컴포넌트에서 글로벌하게 인증 상태를 관리하여 모든 페이지에서 인증 상태를 자동으로 확인할 수 있습니다.
export default function App({ Component, pageProps }: AppProps) {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  /**
   * 주의할 점은 checkAuth 함수가 매 렌더링마다 새로 생성되지 않도록 해야 합니다.
   * 만약 useAuthStore가 *zustand와 같은 상태 관리 라이브러리를 사용한다면,
   * 이 함수는 안정적일 것이므로 문제가 없습니다.
   * 그렇지 않다면 useCallback을 사용하여 checkAuth 함수를 메모이제이션 해야 할 수 있습니다.
   */
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <DashboardProvider>
      <Component {...pageProps} />
    </DashboardProvider>
  );
}
