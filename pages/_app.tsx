import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
