import { useEffect, useRef } from "react";

// Intersection Observer API를 간편하게 사용할 수 있도록 도와주는 커스텀 훅
const useObserver = (
  // Intersection Observer 요소의 교차 상태가 변경될 때 호출되는 콜백 함수
  callback: IntersectionObserverCallback,
  // Intersection Observer를 설정하는 옵션을 담는 객체
  options?: IntersectionObserverInit
) => {
  // Intersection Observer 인스턴스를 저장하는 ref
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Intersection Observer 인스턴스 생성
    observerRef.current = new IntersectionObserver(callback, options);

    // 컴포넌트가 언마운트될 때 Observer를 해제하여 메모리 누수를 방지
    return () => {
      observerRef.current?.disconnect();
    };
  }, [callback, options]);

  // 관찰하고자 하는 DOM 요소를 Observer에 등록
  const observe = (element: Element) => {
    if (observerRef.current && element) {
      observerRef.current.observe(element); // 지정한 요소의 교차 상태를 관찰 시작
    }
  };

  // 더 이상 관찰하지 않을 DOM 요소를 Observer에서 해제
  const unobserve = (element: Element) => {
    if (observerRef.current && element) {
      observerRef.current.unobserve(element); // 지정한 요소의 교차 상태를 관찰 중지
    }
  };

  return { observe, unobserve };
};

export default useObserver;
