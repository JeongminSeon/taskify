// useImagePreview.ts
import { useEffect, useState } from "react";

const useImagePreview = (imageUrl: string | null) => {
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (!imageUrl) {
      setPreview("");
      return;
    }

    setPreview(imageUrl);

    return () => setPreview("");
  }, [imageUrl]);

  return preview;
};

export default useImagePreview;
