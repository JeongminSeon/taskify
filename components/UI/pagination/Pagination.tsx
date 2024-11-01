import Image from "next/image";

interface PaginationProps {
  className?: string;
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  showPageInfo?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNextPage,
  onPreviousPage,
  showPageInfo = true,
}) => {
  // totalPages가 0일 경우 1로 표시
  const displayTotalPages = totalPages > 0 ? totalPages : 1;

  return (
    <div className="flex items-center justify-end gap-5">
      {showPageInfo && ( // showPageInfo가 true일 때만 페이지 정보 표시
        <div>
          <span className="text-sm text-black300">
            {currentPage} 페이지 중 {displayTotalPages}
          </span>
        </div>
      )}
      <div className="flex items-center justify-between">
        <button
          onClick={onPreviousPage}
          disabled={currentPage === 1}
          className="relative w-9 h-9 md:w-10 md:h-10"
        >
          {currentPage === 1 ? (
            <Image src={"/images/icons/pagination_left.svg"} fill alt="이전" />
          ) : (
            <Image
              src={"/images/icons/pagination_left_active.svg"}
              fill
              alt="이전"
            />
          )}
        </button>
        <button
          onClick={onNextPage}
          disabled={currentPage >= totalPages}
          className="relative w-9 h-9 md:w-10 md:h-10"
        >
          {currentPage < totalPages ? (
            <Image
              src={"/images/icons/pagination_right_active.svg"}
              fill
              alt="다음"
            />
          ) : (
            <Image src={"/images/icons/pagination_right.svg"} fill alt="다음" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
