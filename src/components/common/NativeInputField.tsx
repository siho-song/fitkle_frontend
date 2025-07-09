import React from 'react';

interface NativeInputFieldProps {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
  minRows?: number;
  maxRows?: number;
  maxLength?: number;
  disabled?: boolean;
  className?: string;
}

export const NativeInputField: React.FC<NativeInputFieldProps> = ({
  value,
  onChange,
  placeholder,
  multiline = false,
  minRows = 1,
  maxRows = 4,
  maxLength,
  disabled = false,
  className = '',
}) => {
  const inputProps = {
    className: `w-full px-3 py-2 border-none outline-none bg-transparent text-base ${className}`,
    value: value || '',
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange?.(e.target.value),
    placeholder,
    maxLength,
    disabled,
  };
  return multiline ? (
    <textarea
      {...inputProps}
      rows={minRows}
      style={{ resize: 'vertical', minHeight: 40, maxHeight: maxRows * 40 }}
    />
  ) : (
    <input type="text" {...inputProps} />
  );
}; 