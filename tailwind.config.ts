import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        black100: "var(--black100)",
        black200: "var(--black200)",
        black300: "var(--black300)",
        gray100: "var(--gray100)",
        gray200: "var(--gray200)",
        gray300: "var(--gray300)",
        gray400: "var(--gray400)",
        gray500: "var(--gray500)",
        gray600: "var(--gray600)",
        white100: "var(--white100)",
        purple100: "var(--purple100)",
        red100: "var(--red100)",
        pink100: "var(--pink100)",
        green100: "var(--green100)",
        violet100: "var(--purple200)",
        blue100: "var(--blue100)",
        orange100: "var(--orange100)",
      },
      screens: {
        sm: "375px",
        md: "768px",
        lg: "1200px",
      },
    },
  },
  plugins: [],
};
export default config;
