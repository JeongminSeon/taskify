import { useEffect, useState } from "react";

const useResponsiveThreshold = (
  smallScreenThreshold: number,
  largeScreenThreshold: number,
  breakpoint: number = 768
) => {
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

  return threshold;
};

export default useResponsiveThreshold;
