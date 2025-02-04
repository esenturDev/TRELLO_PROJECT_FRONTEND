"use client";
import React from "react";
import scss from "./index.module.scss";
import { Menu } from "@/components/ui/menu";
import { MenuHeader } from "./components/menu-header";
import { useParams, useSearchParams } from "next/navigation";
import { useGetByIdBoardQuery } from "@/store/api/boardApi";
import { useGetCardsApiQuery } from "@/store/api/cardApi";
import CustomInput from "@/components/ui/input-component";
import { IconX } from "@tabler/icons-react";
export const TrelloPage = () => {
	const { id } = useParams<any>();
	const searchParams = useSearchParams();
	const { data } = useGetByIdBoardQuery(id!);
	const { data: trello, isLoading } = useGetCardsApiQuery(data?._id!);
	console.log(id);

	const handleOpenAddInput = () => {
		const params = new URLSearchParams();
		params.get("openAddButton")
			? params.delete("openAddButton")
			: params.set("openAddButton", "open");
		const newUrl = `${window.location.pathname}?${params.toString()}`;
		window.history.replaceState(null, "", newUrl);
	};
	const closeOPenButton = () => {
		const params = new URLSearchParams();
		params.delete("openAddButton");
		const newUrl = `${window.location.pathname}?${params.toString()}`;
		window.history.replaceState(null, "", newUrl);
	};
	return (
		<section
			className={scss.trello_container}
			style={{ background: data?.colorContainer }}>
			<div className={scss.content}>
				<Menu />
				<div className={scss.trello_content}>
					<MenuHeader />
					<div className={scss.content_trello_container}>
						{trello?.length! > 0 && (isLoading ? <p>Loading</p> : <div></div>)}
						{searchParams?.get("openAddButton") ? (
							<div className={scss.open_input_div}>
								<div className={scss.input_and_button_add_trello}>
									<input type="text" />
									<div className={scss.add_button_x}>
										<button>Добавить карточку</button>
										<IconX
											onClick={closeOPenButton}
											color="white"
											cursor={"pointer"}
										/>
									</div>
								</div>
							</div>
						) : (
							<button onClick={handleOpenAddInput}>Добавить список</button>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};
