interface ColorChipProps {
  color: string;
  onClick: () => void;
  isSelected: boolean;
}

const ColorChip: React.FC<ColorChipProps> = ({
  color,
  onClick,
  isSelected,
}) => {
  return (
    <button
      type="button"
      className="w-[30px] h-[30px] rounded-full"
      onClick={onClick}
      style={{
        backgroundColor: color,
        border: isSelected ? "2px solid black" : "none",
      }}
    ></button>
  );
};

export default ColorChip;
