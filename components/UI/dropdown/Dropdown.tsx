import React from "react";

interface DropdownItem {
  label: string;
  onClick: () => void;
}

interface DropdownProps {
  isOpen: boolean;
  items: DropdownItem[];
}

const Dropdown: React.FC<DropdownProps> = ({ isOpen, items }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-[28px] right-0 w-[93px] bg-white rounded-md shadow-lg z-10">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default Dropdown;
