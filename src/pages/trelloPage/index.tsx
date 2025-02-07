"use client";
import React, { useState } from "react";
import scss from "./index.module.scss";
import { Menu } from "@/components/ui/menu";
import { MenuHeader } from "./components/menu-header";
import { useParams, useSearchParams } from "next/navigation";
import { useGetByIdBoardQuery } from "@/store/api/boardApi";
import { useGetCardsApiQuery, usePostCardApiMutation } from "@/store/api/cardApi";
import CustomInput from "@/components/ui/input-component";
import {
	IconColorSwatch,
	IconMenuDeep,
	IconPencil,
	IconPlus,
	IconX,
} from "@tabler/icons-react";
import {
	useGetListsApiQuery,
	usePostListApiMutation,
} from "@/store/api/listApi";
import { showToast } from "@/components/ui/toastify";
import { CustomTextArea } from "@/components/ui/textArea-component";
export const TrelloPage = () => {
	const { id } = useParams<any>();
	const [addCardApi] = usePostCardApiMutation();
	const [titleValue, setTitleValue] = useState<string>("");
	const [openAddCard, setOpenAddCard] = useState<null | string>(null);
	const [cardValue, setCardValue] = useState<string>("");
	const [addListApi] = usePostListApiMutation();
	const { data: cardData } = useGetCardsApiQuery();
	const {
		data: listsData,
		isLoading: loadingLists,
		refetch,
	} = useGetListsApiQuery({ boardId: id });
	console.log(listsData, "esentur!");

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
	const handleAddListFunk = async () => {
		if (titleValue.trim().length <= 0 || !id)
			return showToast("error", "title is required");

		try {
			const res = await addListApi({ boardId: id, title: titleValue }).unwrap();
			if (res.message) return showToast("success", res.message);
			refetch();
			setTitleValue("");
		} catch (error) {
			const err = error as TypesAuthorizationError;
			console.error(error);
			const errorMessage = err?.data?.message || "Произошла ошибка";
			showToast("error", errorMessage);
		}
	};
	function openListAddFunk(id: string) {
		console.log(id);

		setOpenAddCard(id === openAddCard ? null : id);
	}
	const handleAddCardsFunk = async () => {
		try {
			
		} catch (error) {
			const err = error as TypesAuthorizationError;
			console.error(error);
			const errorMessage = err?.data?.message || "Произошла ошибка";
			showToast("error", errorMessage);
		}
	}
	return (
		<section
			className={scss.trello_container}
			style={{ background: data?.colorContainer }}>
			<div className={scss.content}>
				<Menu />
				<div className={scss.trello_content}>
					<MenuHeader />
					<div className={scss.content_trello_container}>
						{listsData?.length !== 0 &&
							listsData?.map((el) => (
								<div key={el._id} className={scss.list_container}>
									<div className={scss.content_list_card}>
										<div className={scss.title_text_and_icon_div}>
											<p>{el.title}</p>
											<IconMenuDeep
												height={13}
												width={13}
												color="#ccc"
												cursor={"pointer"}
											/>
										</div>
										{cardData?.length !== 0 &&
											cardData?.map((el, index) => (
												<div className={scss.card_content_div} key={index + 1}>
													<p className={scss.title_content_p}>{el.title}</p>
													<IconPencil
														height={13}
														width={13}
														color="#ccc"
														cursor={"pointer"}
													/>
												</div>
											))}
										{openAddCard! === el._id ? (
											<div className={scss.add_card_form}>
												<CustomTextArea
													value={cardValue}
													onChange={setCardValue}
													placeholder="Введите название или вставьте ссылку"
												/>
												<div>
													<button>Добавить карточку</button>
													<IconX
														height={15}
														width={15}
														color="#ccc"
														cursor={"pointer"}
														onClick={() => setOpenAddCard(null)}
													/>
												</div>
											</div>
										) : (
											<div className={scss.add_card_and_add_sample_container}>
												<button onClick={() => openListAddFunk(el._id)}>
													<IconPlus
														height={13}
														width={13}
														color="#ccc"
														cursor={"pointer"}
													/>{" "}
													Добавить карточку
												</button>
												<IconColorSwatch
													width={13}
													color="#ccc"
													cursor={"pointer"}
												/>
											</div>
										)}
									</div>
								</div>
							))}
						{searchParams?.get("openAddButton") ? (
							<div className={scss.open_input_div}>
								<div className={scss.input_and_button_add_trello}>
									<input
										type="text"
										value={titleValue}
										onChange={(e) => setTitleValue(e.target.value)}
									/>
									<div className={scss.add_button_x}>
										<button onClick={handleAddListFunk}>
											Добавить карточку
										</button>
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
