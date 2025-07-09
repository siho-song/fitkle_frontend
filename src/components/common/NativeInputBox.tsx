import React, { ReactNode } from 'react';

interface NativeInputBoxProps {
  label?: ReactNode;
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  errorText?: string;
  multiline?: boolean;
  minRows?: number;
  maxRows?: number;
  maxLength?: number;
  showCounter?: boolean;
  button?: ReactNode;
  className?: string;
  disabled?: boolean;
}

export const NativeInputBox: React.FC<NativeInputBoxProps> = ({
  label,
  value,
  onChange,
  placeholder,
  errorText,
  multiline = false,
  minRows = 1,
  maxRows = 4,
  maxLength,
  showCounter = false,
  button,
  className = '',
  disabled = false,
}) => {
  const inputProps = {
    className: 'w-full px-3 py-2 border-none outline-none bg-transparent text-base',
    value: value || '',
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange?.(e.target.value),
    placeholder,
    maxLength,
    disabled,
  };
  return (
    <div className={`flex items-stretch border rounded-lg bg-white ${errorText ? 'border-red-400' : 'border-gray-200'} ${className}`}>
      {label && <div className="flex items-center px-3 text-gray-500 whitespace-nowrap">{label}</div>}
      {multiline ? (
        <textarea
          {...inputProps}
          rows={minRows}
          style={{ resize: 'vertical', minHeight: 40, maxHeight: maxRows * 40 }}
        />
      ) : (
        <input type="text" {...inputProps} />
      )}
      {button && <div className="flex items-center px-2">{button}</div>}
      {showCounter && maxLength && (
        <div className="flex items-center px-2 text-xs text-gray-400">{(value?.length || 0)}/{maxLength}</div>
      )}
      {errorText && <div className="absolute mt-1 text-xs text-red-500">{errorText}</div>}
    </div>
  );
}; 