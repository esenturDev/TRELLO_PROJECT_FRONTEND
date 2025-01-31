"use client";
import { IconBrandTrello, IconTemplate } from "@tabler/icons-react";
// import { usePathname } from "next/navigation";
import React from "react";
interface BoardsArrayTypes {
	title: string;
	icon: any;
	href: string;
}
// const pathname = usePathname();
export const BoardsArray: BoardsArrayTypes[] = [
	{
		title: "Доски",
		icon: (
			<IconBrandTrello
				width={24}
				height={24}
				color={window.location.pathname === "/boards" ? "#579DFF" : "#ccc"}
			/>
		),
		href: "/boards",
	},
	{
		title: "Шаблоны",
		icon: (
			<IconTemplate
				width={24}
				height={24}
				color={window.location.pathname === "/templates" ? "#579DFF" : "#ccc"}
			/>
		),
		href: "/templates",
	},
	{
		title: "Главная страница",
		icon: (
			<IconTemplate
				width={24}
				height={24}
				color={window.location.pathname === "/" ? "#579DFF" : "#ccc"}
			/>
		),
		href: "/",
	},
];
