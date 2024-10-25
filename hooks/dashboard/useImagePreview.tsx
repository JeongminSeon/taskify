import { useEffect, useState } from "react";

const useImagePreview = (imageFile: File | null) => {
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (!imageFile) return;

    const nextPreview = URL.createObjectURL(imageFile);
    setPreview(nextPreview);

    return () => {
      URL.revokeObjectURL(nextPreview);
      setPreview("");
    };
  }, [imageFile]);

  return preview;
};

export default useImagePreview;
