import { FadeLoader } from "react-spinners";

const LoadingSpinner = ({ text }: { text?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="text-2xl mb-4">{text}</p>
      <FadeLoader color="#5534DA" />
    </div>
  );
};

export default LoadingSpinner;
