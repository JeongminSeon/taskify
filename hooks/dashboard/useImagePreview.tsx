// useImagePreview.ts
import { useEffect, useState } from "react";

// 이미지 URL이 주어지면 미리보기를 제공하는 역할을 함
const useImagePreview = (imageUrl: string | null) => {
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    // imageUrl이 없을 경우 preview 상태를 빈 문자열로 설정하고 종료
    if (!imageUrl) {
      setPreview("");
      return;
    }
    // imageUrl이 존재할 경우 preview 상태에 이미지 URL 설정
    setPreview(imageUrl);

    // 컴포넌트가 언마운트되거나 imageUrl이 변경될 때 preview 상태를 초기화
    return () => setPreview("");
  }, [imageUrl]);

  // 미리보기 이미지 URL을 반환
  return preview;
};

export default useImagePreview;
