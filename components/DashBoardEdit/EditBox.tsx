// BoxProps 인터페이스 정의
interface BoxProps {
  title: string; // 박스의 제목
  children: React.ReactNode; // 박스의 자식 요소
}

const EditBox: React.FC<BoxProps> = ({ title, children }) => {
  return (
    <div className="box relative pb-5 rounded-2xl bg-white100">
      <h2 className="pt-5 px-4 md:px-7 pb-6 text-xl md:text-2xl font-bold">
        {title}
      </h2>
      {children}
    </div>
  );
};

export default EditBox;
