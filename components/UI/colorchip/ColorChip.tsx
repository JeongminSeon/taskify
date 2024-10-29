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
      className="w-[30px] h-[30px] rounded-full bg-no-repeat bg-center"
      onClick={onClick}
      style={{
        backgroundColor: color,
        backgroundImage: isSelected
          ? 'url("/images/icons/icon_chip_selected.svg")'
          : "none",
      }}
    ></button>
  );
};

export default ColorChip;
