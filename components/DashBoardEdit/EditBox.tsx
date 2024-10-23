interface BoxProps {
  title: string;
  children: React.ReactNode;
}

const EditBox: React.FC<BoxProps> = ({ title, children }) => {
  return (
    <div className="box py-5 px-4 md:py-8 md:px-7 rounded-2xl bg-white100">
      <h2 className="pb-6 text-xl md:text-2xl font-bold">{title}</h2>
      {children}
    </div>
  );
};

export default EditBox;
