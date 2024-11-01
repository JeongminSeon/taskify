import React from "react";
import Link from "next/link";

interface DropdownItem {
  label: string;
  onClick?: () => void;
  href?: string;
}

interface DropdownProps {
  isOpen: boolean;
  items: DropdownItem[];
}

const Dropdown: React.FC<DropdownProps> = ({ isOpen, items }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-[45px] right-0 w-[100px] bg-white rounded-md shadow-lg z-10">
      {items.map((item, index) =>
        item.href ? ( // Link 사용 경우
          <Link
            key={index}
            href={item.href}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            {item.label}
          </Link>
        ) : (
          <button
            key={index}
            onClick={item.onClick}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            {item.label}
          </button>
        )
      )}
    </div>
  );
};

export default Dropdown;
