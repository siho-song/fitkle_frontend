import React, { useState } from 'react';

interface CategorySidebarProps {
  categories: string[];
  selectedCategory?: string;
  onCategorySelected?: (cat: string) => void;
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({ categories, selectedCategory, onCategorySelected }) => {
  return (
    <aside className="w-56 bg-transparent p-6 pt-8 flex flex-col">
      <div className="text-xl font-bold mb-6">카테고리</div>
      <div className="flex-1 overflow-y-auto flex flex-col gap-1">
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

const CategoryItem: React.FC<{ text: string; selected: boolean; onClick: () => void }> = ({ text, selected, onClick }) => {
  const [hover, setHover] = useState(false);
  const bg = selected ? 'bg-blue-50' : hover ? 'bg-gray-100' : '';
  const color = selected ? 'text-blue-600 font-bold' : hover ? 'text-black' : 'text-gray-800';
  return (
    <div
      className={`w-full px-2 py-2 rounded-md cursor-pointer transition ${bg} ${color}`}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {text}
    </div>
  );
}; 