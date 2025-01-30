"use client";

import { store } from "@/store/store";
import { FC, ReactNode } from "react";
import { Provider } from "react-redux";

interface ReduxProviderProps {
	children: ReactNode;
}

export const ReduxProvider: FC<ReduxProviderProps> = ({ children }) => {
	return <Provider store={store}>{children}</Provider>;
};
