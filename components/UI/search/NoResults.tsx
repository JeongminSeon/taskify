import Image from "next/image";
const NoResults = () => (
  <div className="flex flex-col gap-2 justify-center mt-10 text-center">
    <Image
      src="/images/icons/icon_no_results.png"
      width={50}
      height={50}
      alt="검색 결과 없음"
      className="mx-auto"
    />
    <span className="search-icon text-xl font-semibold text-purple100">
      검색 결과가 없습니다.
    </span>
    <p className="text-sm text-gray300">
      검색어를 변경해보거나 다른 내용을 시도해보세요.
    </p>
  </div>
);

export default NoResults;
