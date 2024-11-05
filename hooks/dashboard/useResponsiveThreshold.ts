import { useEffect, useState } from "react";

// 화면 크기에 따라 설정 값을 동적으로 변경하는 역할을 함
const useResponsiveThreshold = (
  smallScreenThreshold: number,
  largeScreenThreshold: number,
  breakpoint: number = 768
) => {
  // 현재 화면 크기에 맞는 설정 값을 저장하는 상태
  const [threshold, setThreshold] = useState<number>(largeScreenThreshold);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < breakpoint) {
        setThreshold(smallScreenThreshold);
      } else {
        setThreshold(largeScreenThreshold);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [smallScreenThreshold, largeScreenThreshold, breakpoint]);

  // 현재 화면 크기에 맞는 설정 값 반환
  return threshold;
};

export default useResponsiveThreshold;
