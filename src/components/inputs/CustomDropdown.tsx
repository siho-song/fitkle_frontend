import React from 'react';

interface CustomDropdownProps<T> {
  items: T[];
  value: T | null;
  onChange: (value: T | null) => void;
  hintText?: string;
  itemLabelBuilder?: (item: T) => string;
  className?: string;
  disabled?: boolean;
  errorText?: string;
}

export function CustomDropdown<T>({
  items,
  value,
  onChange,
  hintText = '선택하세요',
  itemLabelBuilder,
  className = '',
  disabled = false,
  errorText,
}: CustomDropdownProps<T>) {
  return (
    <div className={`w-full ${className}`}>
      <select
        className={
          `w-full h-12 px-4 rounded-lg border ` +
          (errorText ? 'border-red-500' : 'border-gray-300') +
          ' bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary appearance-none'
        }
        value={value !== null && value !== undefined ? String(items.indexOf(value)) : ''}
        onChange={e => {
          const idx = Number(e.target.value);
          onChange(idx >= 0 ? items[idx] : null);
        }}
        disabled={disabled}
      >
        <option value="">{hintText}</option>
        {items.map((item, idx) => (
          <option key={idx} value={idx}>
            {itemLabelBuilder ? itemLabelBuilder(item) : String(item)}
          </option>
        ))}
      </select>
      {errorText && (
        <div className="mt-1 text-xs text-red-500 font-medium">{errorText}</div>
      )}
    </div>
  );
} 