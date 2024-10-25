import Image from "next/image";

interface PaginationProps {
  className?: string;
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNextPage,
  onPreviousPage,
}) => {
  return (
    <div className="flex items-center justify-end gap-5">
      <div>
        <span className="text-sm text-black300">
          {currentPage} 페이지 중 {totalPages}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={onPreviousPage}
          disabled={currentPage === 1}
          className="relative w-9 h-9 md:w-10 md:h-10"
        >
          <Image src={"/images/icons/pagination_left.svg"} fill alt="이전" />
        </button>
        <button
          onClick={onNextPage}
          disabled={currentPage >= totalPages}
          className="relative w-9 h-9 md:w-10 md:h-10"
        >
          <Image src={"/images/icons/pagination_right.svg"} fill alt="다음" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
