"use client";
import React from "react";
import scss from "./index.module.scss";
import { Menu } from "@/components/ui/menu";
import { MenuHeader } from "./components/menu-header";
import { useParams } from "next/navigation";
import { useGetByIdBoardQuery } from "@/store/api/boardApi";
export const TrelloPage = () => {
	const { id } = useParams<any>();
	console.log(id);
	
	const { data } = useGetByIdBoardQuery(id!);
	return (
		<section
			className={scss.trello_container}
			style={{ background: data?.colorContainer }}>
			<div className={scss.content}>
				<Menu />
				<div className={scss.trello_content}>
					<MenuHeader />
				</div>
			</div>
		</section>
	);
};
