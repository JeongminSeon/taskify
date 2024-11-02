import { useEffect, useRef } from "react";

const useObserver = (
  // Intersection Observer가 요소의 교차 상태가 변경될 때 호출되는 콜백 함수
  callback: IntersectionObserverCallback,
  // Intersection Observer를 설정하는 옵션을 담는 객체
  options?: IntersectionObserverInit
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Intersection Observer 인스턴스 생성
    observerRef.current = new IntersectionObserver(callback, options);

    // 컴포넌트 언마운트 시 Observer 해제
    return () => {
      observerRef.current?.disconnect();
    };
  }, [callback, options]);

  const observe = (element: Element) => {
    if (observerRef.current && element) {
      observerRef.current.observe(element);
    }
  };

  const unobserve = (element: Element) => {
    if (observerRef.current && element) {
      observerRef.current.unobserve(element);
    }
  };

  return { observe, unobserve };
};

export default useObserver;
