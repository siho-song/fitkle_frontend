import React from 'react';

interface NativeInputFieldProps {
  hintText?: string;
  value?: string;
  onChange?: (v: string) => void;
  isMultiline?: boolean;
  padding?: string;
  style?: React.CSSProperties;
  maxLength?: number;
  showBorder?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  showCounter?: boolean;
  height?: number;
  disabled?: boolean;
}

export const NativeInputField: React.FC<NativeInputFieldProps> = ({
  hintText,
  value,
  onChange,
  isMultiline = false,
  padding = '0 16px',
  style,
  maxLength,
  showBorder = false,
  textAlign = 'left',
  showCounter = false,
  height = 40,
  disabled = false,
}) => {
  const inputProps = {
    value: value ?? '',
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange?.(e.target.value),
    placeholder: hintText,
    maxLength,
    disabled,
    style: {
      padding,
      textAlign,
      border: showBorder ? '1.5px solid #D1D5DB' : 'none',
      borderRadius: 8,
      background: '#fff',
      fontSize: 16,
      height,
      ...style,
    } as React.CSSProperties,
  };

  return (
    <div className="relative w-full">
      {isMultiline ? (
        <textarea
          {...inputProps}
          rows={1}
          maxLength={maxLength}
          className="w-full resize-none outline-none"
        />
      ) : (
        <input
          {...inputProps}
          className="w-full outline-none"
          type="text"
        />
      )}
      {showCounter && maxLength && (
        <span className="absolute right-3 bottom-1 text-xs text-gray-400 select-none">
          {(value ?? '').length}/{maxLength}
        </span>
      )}
    </div>
  );
}; 