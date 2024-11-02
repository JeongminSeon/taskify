import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold text-purple100">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">
        Oops! 페이지를 찾을 수 없습니다.
      </h2>
      <p className="mt-2 text-center">
        찾으시는 페이지가 없거나 잘못된 경로로 접근하셨습니다. 아래 버튼을 통해
        다른 곳으로 이동할 수 있어요.
      </p>
      <div className="mt-10">
        <Link
          href="/"
          className="px-6 py-4 text-white bg-purple100 rounded-lg hover:bg-purple transition"
        >
          홈페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
