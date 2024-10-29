interface BoxProps {
  title: string;
  children: React.ReactNode;
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
