"use client";

import React from "react";
import scss from "./index.module.scss";
import { NavbarPagesComponent } from "@/components/ui/navbar-pages-component";
import { useGetBoardsApiQuery } from "@/store/api/boardApi";
import { IconUsers } from "@tabler/icons-react";
import Cookies from "js-cookie";
import { Modal } from "antd";

export const BoardsPage = () => {
	const { data, isLoading } = useGetBoardsApiQuery();
	
	console.log(Cookies.get("token"));

	return (
		<section className={scss.boards_container}>
			<div className="container">
				<div className={scss.content}>
					<NavbarPagesComponent />
					<div className={scss.boards_content_container}>
						{data?.boards.length! > 0 && (
							<div className={scss.boards_map}>
								{/* <h3>Недавно просмотренное</h3> */}
								{data?.boards.map((el, index) => (
									<div key={index + 1} className={scss.card}>
										<div className={scss.card_c}>
											<p className={scss.board_name}>{el.title}</p>
											<IconUsers width={16} height={16} />
										</div>
									</div>
								))}
							</div>
						)}
						<div className={scss.add_board_and_cards}>
							<h2 className={scss.h2}></h2>
							<div className={scss.board_content}>
								<p>Рабочее пространство Trello...</p>
							</div>
							<div className={scss.add_and_boards}>
								{data?.boards.length! > 0 &&
									data?.boards.map((item, index) => (
										<div key={index + 1} className={scss.card_board}>
											<div className={scss.x}>
												<p className={scss.board_name}>{item.title}</p>
												<IconUsers width={16} height={16} />
											</div>
										</div>
									))}
									<button>Создать доску</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
