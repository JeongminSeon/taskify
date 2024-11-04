import { useEffect, useState } from "react";

// 주어진 값(value)을 지정된 시간(delay) 후에 설정하여
// 빠르게 변하는 값의 업데이트 빈도를 줄이는 역할을 함
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value); // 지연된 값을 저장

  useEffect(() => {
    // delay 시간 후에 value 값을 debouncedValue에 설정하는 타이머 생성
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // value나 delay가 변경될 때 기존 타이머를 제거
    // 이를 통해 이전 타이머가 계속 실행되지 않도록 함
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]); // value와 delay가 변경될 때마다 useEffect 실행

  // 최종적으로 지연된 값을 반환
  return debouncedValue;
};

export default useDebounce;
