import { useEffect, useRef } from "react";

const useObserver = (
  callback: IntersectionObserverCallback,
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
