import React from 'react';

interface CustomDropdownProps<T> {
  items: T[];
  value?: T;
  onChange: (v: T) => void;
  hint?: string;
  className?: string;
  itemLabel?: (item: T) => string;
  disabled?: boolean;
}

export function CustomDropdown<T extends string | number>({
  items,
  value,
  onChange,
  hint = '선택하세요',
  className = '',
  itemLabel,
  disabled = false,
}: CustomDropdownProps<T>) {
  return (
    <select
      className={`w-full border rounded-lg px-3 py-2 text-base bg-white ${className}`}
      value={value ?? ''}
      onChange={e => onChange(e.target.value as T)}
      disabled={disabled}
    >
      <option value="" disabled>{hint}</option>
      {items.map((item) => (
        <option key={item} value={item}>
          {itemLabel ? itemLabel(item) : item}
        </option>
      ))}
    </select>
  );
} 