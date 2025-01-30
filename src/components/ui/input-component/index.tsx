"use client";

import { Input } from "antd";
import scss from "./index.module.scss";
import { useState } from "react";

const { Password } = Input;
type CustomInputProps = {
	value?: string;
	error?: string;
	type: "text" | "password";
	placeholder?: string;
	label?: string;
	success?: boolean;
	disabled?: boolean;
	onBlur?: React.FocusEventHandler<HTMLInputElement>
	onChange?: (value: string) => void;
	id?: string;
};
const CustomInput = ({
	error,
	value = "",
	type = "text",
	label,
	success = false,
	disabled = false,
	onBlur,
	onChange,
	placeholder = "",
	id,
}: CustomInputProps) => {
	const [isFocused, setIsFocused] = useState<boolean>(false);
	
	console.log(error);

	const handleFocus = () => setIsFocused(true);
	// const handleBlur = () => setIsFocused(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(e.target.value);
		}
	};

	const containerClassName = `${scss.inputContainer} ${
    error
        ? scss.error
        : success
        ? scss.success
        : isFocused
        ? scss.focused
        : scss.default
}`;

	return (
		<div className={containerClassName}>
			{label && <label className={scss.inputLabel}>{label}</label>}
			{type === "password" ? (
				<Password
					id={id}
					value={value}
					placeholder={placeholder}
					disabled={disabled}
					onFocus={handleFocus}
					onBlur={onBlur}
					onChange={handleChange}
					className={`${scss.inputField} ${error ? scss.error : ''}`}
				/>
			) : (
				<Input
					id={id}
					value={value}
					placeholder={placeholder}
					disabled={disabled}
					onFocus={handleFocus}
					onBlur={onBlur}
					onChange={handleChange}
					className={`${scss.inputField} ${error ? scss.error : ''}`}
				/>
			)}
			{error && <div className={scss.errorMessage}>{error}</div>}
			{success && <div className={scss.successIcon}>Успешно</div>}
		</div>
	);
};

export default CustomInput;
