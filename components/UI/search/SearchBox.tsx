import Image from "next/image";

// SearchBox 컴포넌트의 props 인터페이스 정의
interface SearchBoxProps {
  searchTerm: string; // 검색어
  setSearchTerm: (term: string) => void; // 검색어 상태를 업데이트하는 함수
  placeholder: string; // 검색어 입력 필드 placeholder
}

// 검색 창 컴포넌트 정의
const SearchBox: React.FC<SearchBoxProps> = ({
  searchTerm,
  setSearchTerm,
  placeholder,
}) => {
  // 입력 필드 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="searchBox relative flex mt-4 mx-4 md:mx-7">
      <Image
        src={"/images/icons/icon_search.svg"}
        width={18}
        height={18}
        alt="검색"
        className="absolute left-4 top-1/2 transform -translate-y-1/2"
      />
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        className="border py-2 pl-12 rounded-md w-full"
      />
    </div>
  );
};

export default SearchBox;
