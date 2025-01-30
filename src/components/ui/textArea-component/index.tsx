"use client"

import React, { FC } from 'react';
import scss from './index.module.scss';
import { Input } from 'antd';

const { TextArea } = Input;

interface CustomTextAreaProps {
  value?: string;
  placeholder?: string;
  maxLength?: number;
  error?: string;
  onChange?: (value: string) => void;
}
export const CustomTextArea: FC<CustomTextAreaProps> = ({
  value = '',
  placeholder = '',
  maxLength,
  error,
  onChange,
}) => {
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const handleFoces = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const containerClassName = `${scss.customTextareaContainer} ${
    error ? scss.error : isFocused ? scss.focused : scss.default
  }`;
  return (
    <div className={containerClassName}>
      <label className={scss.customTextareaLabel}>
        {isFocused ? 'Typing' : error ? 'Error' : 'Label'}
      </label>
      <TextArea
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onFocus={handleFoces}
        onChange={handleChange}
        onBlur={handleBlur}
        className={scss.customTextarea}
      />
      {error && <div className={scss.errorMessage}>{error}</div>}
    </div>
  );
};
