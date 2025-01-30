import React from "react";
import scss from "@/components/ui/toastify/index.module.scss";
import {
	toast,
	ToastContainer,
	ToastContainerProps,
	ToastOptions,
	TypeOptions,
} from "react-toastify";

export const showToast = (
	type: TypeOptions,
	message: string,
	options?: ToastOptions
): void => {
	if (type === "success") {
		toast.success(message, options);
	} else if (type === "error") {
		toast.error(message, options);
	} else {
		toast(message, options);
	}
};
const Toastify = () => {
	const options: ToastContainerProps = {
		hideProgressBar: true,
		closeOnClick: true,
		autoClose: 1500,
		draggable: true,
	};
	return (
		<ToastContainer
			{...options}
			toastClassName={(context) =>
				`${scss.toastContainer} ${
					context?.type === "success"
						? scss.success
						: context?.type === "error"
						? scss.error
						: scss.default
				}`
			}
			closeButton={({ closeToast }) => (
				<button className={scss.closeButton} onClick={closeToast}>
					x
				</button>
			)}
		/>
	);
};

export default Toastify;
