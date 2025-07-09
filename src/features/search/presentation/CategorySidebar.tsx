"use client";

import React from 'react';

interface CategorySidebarProps {
  categories: string[];
  selectedCategory?: string;
  onCategorySelected?: (category: string) => void;
  className?: string;
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  selectedCategory,
  onCategorySelected,
  className = '',
}) => {
  return (
    <aside
      className={`w-[220px] bg-transparent pt-6 pl-8 pr-6 pb-6 ${className}`}
    >
      <div className="text-xl font-bold text-black mb-5">카테고리</div>
      <div className="overflow-y-auto max-h-[calc(100vh-120px)]">
        {categories.map((cat) => (
          <CategoryItem
            key={cat}
            text={cat}
            selected={selectedCategory === cat}
            onClick={() => onCategorySelected?.(cat)}
          />
        ))}
      </div>
    </aside>
  );
};

interface CategoryItemProps {
  text: string;
  selected: boolean;
  onClick: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ text, selected, onClick }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      className={`w-full px-2 py-2 my-0.5 rounded-md cursor-pointer transition-colors duration-150
        ${selected ? 'bg-blue-50 text-blue-600 font-bold' : hover ? 'bg-gray-100 text-black' : 'text-gray-800'}`}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="text-[15px]">{text}</span>
    </div>
  );
}; 