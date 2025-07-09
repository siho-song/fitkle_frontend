import React, { useState } from 'react';
import { NativeInputField } from './NativeInputField';

interface NativeInputBoxProps {
  label?: React.ReactNode;
  labelFlex?: number;
  inputFlex?: number;
  buttonFlex?: number;
  button?: React.ReactNode;
  height?: number;
  width?: number | string;
  padding?: string;
  borderRadius?: number;
  borderColor?: string;
  hoverBorderColor?: string;
  borderWidth?: number;
  showBorder?: boolean;
  showHoverEffect?: boolean;
  errorText?: string;
  errorPadding?: string;
  errorTextStyle?: React.CSSProperties;
  // NativeInputField props
  hintText?: string;
  value?: string;
  onChange?: (v: string) => void;
  isMultiline?: boolean;
  inputPadding?: string;
  inputStyle?: React.CSSProperties;
  maxLength?: number;
  showCounter?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  enabled?: boolean;
  labelAlignment?: 'flex-start' | 'center' | 'flex-end';
  inputFieldHeight?: number;
}

export const NativeInputBox: React.FC<NativeInputBoxProps> = ({
  label,
  labelFlex = 2,
  inputFlex = 8,
  buttonFlex,
  button,
  height,
  width,
  padding,
  borderRadius = 8,
  borderColor = '#E5E7EB',
  hoverBorderColor = '#D1D5DB',
  borderWidth = 1.5,
  showBorder = true,
  showHoverEffect = true,
  errorText,
  errorPadding = '4px 0 0 8px',
  errorTextStyle,
  hintText,
  value,
  onChange,
  isMultiline = false,
  inputPadding,
  inputStyle,
  maxLength,
  showCounter = false,
  textAlign = 'left',
  enabled = true,
  labelAlignment = 'flex-start',
  inputFieldHeight,
}) => {
  const [hovered, setHovered] = useState(false);

  const effectiveBorderColor =
    showHoverEffect && hovered ? hoverBorderColor : borderColor;

  return (
    <div className="flex flex-col w-full">
      <div
        style={{
          height,
          width,
          padding,
          borderRadius,
          border: showBorder ? `${borderWidth}px solid ${effectiveBorderColor}` : undefined,
          background: '#fff',
          opacity: enabled ? 1 : 0.5,
          transition: 'border-color 0.2s',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex items-stretch"
      >
        {label && (
          <div
            style={{
              flex: labelFlex,
              display: 'flex',
              alignItems: labelAlignment,
              minWidth: 0,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {label}
          </div>
        )}
        <div style={{ flex: inputFlex, minWidth: 0 }}>
          <NativeInputField
            hintText={hintText}
            value={value}
            onChange={onChange}
            isMultiline={isMultiline}
            padding={inputPadding}
            style={inputStyle}
            maxLength={maxLength}
            showBorder={false}
            textAlign={textAlign}
            showCounter={showCounter}
            height={inputFieldHeight ?? 40}
            disabled={!enabled}
          />
        </div>
        {button && buttonFlex && (
          <div style={{ flex: buttonFlex }}>{button}</div>
        )}
      </div>
      {errorText && (
        <div
          style={{
            padding: errorPadding,
            color: '#EF4444',
            fontSize: 12,
            fontWeight: 600,
            ...errorTextStyle,
          }}
        >
          {errorText}
        </div>
      )}
    </div>
  );
}; 