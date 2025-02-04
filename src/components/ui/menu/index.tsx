"use client";
import React from "react";
import scss from "./index.module.scss";
import {
	IconArrowLeft,
	IconBrandTrello,
	IconPlus,
	IconSettings,
	IconUser,
} from "@tabler/icons-react";
import { useGetBoardsApiQuery } from "@/store/api/boardApi";
import Link from "next/link";
export const Menu = () => {
	const { data, isLoading } = useGetBoardsApiQuery();

	return (
		<nav className={scss.menu_container}>
			<div className={scss.content}>
				<div className={scss.main_content}>
					<div className={scss.main_text}>
						<h3>Рабочее пространство Trello</h3>
						<p>Premium</p>
					</div>
					<IconArrowLeft
						color="#ccc"
						width={20}
						height={20}
						cursor={"pointer"}
					/>
				</div>
				<div className={scss.buttons_div}>
					<button className={scss.button_board}>
						<IconBrandTrello /> Доски
					</button>
					<div className={scss.button_user}>
						<div className={scss.icon_and_text}>
							<IconUser /> Участники
						</div>
						<IconPlus color="#ccc" />
					</div>
					<div className={scss.button_user}>
						<div className={scss.icon_and_text}>
							<IconSettings /> Настройки рабочего пространства
						</div>
						<IconPlus color="#ccc" />
					</div>
				</div>
				<p className={scss.p}>
					Мои доски <IconPlus color="#ccc" />
				</p>
				{isLoading ? (
					<p>Loading...</p>
				) : (
					<div className={scss.boards_div_container}>
						{data?.boards.map((el, index) => (
							<Link href={`/trello/${el._id}`} key={index + 1} className={scss.board_div}>
								<div
									style={{ background: el.colorContainer }}
									className={scss.board_color}></div>
								{el.title}
							</Link>
						))}
					</div>
				)}
			</div>
		</nav>
	);
};
