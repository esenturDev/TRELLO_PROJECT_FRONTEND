"use client";

import React, { useState } from "react";
import scss from "./index.module.scss";
import { NavbarPagesComponent } from "@/components/ui/navbar-pages-component";
import {
	useGetBoardsApiQuery,
	usePostBoardApiMutation,
} from "@/store/api/boardApi";
import { IconUsers } from "@tabler/icons-react";
import { Button, Modal } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { ColorArray } from "./constant";
import CustomInput from "@/components/ui/input-component";
import { showToast } from "@/components/ui/toastify";

export const BoardsPage = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [openModal, setOpenModal] = useState(false);
	const [valueTitle, setValueTitle] = useState<string>("");
	const { data, isLoading, refetch } = useGetBoardsApiQuery();
	const [postBoardApi, { isLoading: isLoadingPost }] =
		usePostBoardApiMutation();
	const updateSearchParams = (key: string, value: string | number) => {
		const params = new URLSearchParams();
		params.set(key, value.toString());
		const newUrl = `${window.location.pathname}?${params.toString()}`;
		window.history.replaceState(null, "", newUrl);
	};

	const getSearchParamValue = (key: string, fallback = 0) =>
		Number(searchParams?.get(key) || fallback);

	const renderColor = (index: string) =>
		updateSearchParams("photo_product_index", index);

	const renderActiveColor = () => {
		const startIndex = getSearchParamValue("photo_product_index");
		return (
			<div
				style={{
					width: "100%",
					height: "200px",
					borderRadius: "11px",
					background: ColorArray[startIndex],
					cursor: "pointer",
				}}></div>
		);
	};
	const openModalFunk = () => {
		// const params = new URLSearchParams();
		// params.get("openModal")
		// 	? params.delete("openModal")
		// 	: params.set("openModal", "true");
		// const newUrl = `${window.location.pathname}?${params.toString()}`;
		// window.history.replaceState(null, "", newUrl);
		setOpenModal(true);
	};
	if (isLoading) {
		return (
			<div>
				<h1>isLoading...</h1>
			</div>
		);
	}
	const handleAddBoardFunk = async () => {
		if (valueTitle.trim().length <= 0)
			return showToast("error", "Поланы толтурунуз!");

		try {
			const res = await postBoardApi({
				colorContainer:
					ColorArray[
						Number(searchParams?.get("photo_product_index"))
					].toString() || "#1D2125",
				title: valueTitle,
			}).unwrap();
			if (res.status === 201) {
				setTimeout(() => {
					router.push("/trello");
					showToast("success", res.message);
					refetch();
					setOpenModal(false);
				}, 300);
			}
		} catch (error) {
			const err = error as TypesAuthorizationError;
			console.error(error);
			const errorMessage = err?.message || "Произошла ошибка";
			showToast("error", errorMessage);
		}
	};
	return (
		<>
			<section className={scss.boards_container}>
				<div className="container">
					<div className={scss.content}>
						<NavbarPagesComponent />
						<div className={scss.boards_content_container}>
							{data?.boards.length! > 0 && (
								<div className={scss.boards_map}>
									{/* <h3>Недавно просмотренное</h3> */}
									{data?.boards.map((el, index) => (
										<div
											key={index + 1}
											className={scss.card}
											style={{ background: el.colorContainer }}>
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
											<div
												key={index + 1}
												className={scss.card_board}
												style={{ background: item.colorContainer }}>
												<div className={scss.x}>
													<p className={scss.board_name}>{item.title}</p>
													<IconUsers width={16} height={16} />
												</div>
											</div>
										))}
									<button onClick={openModalFunk}>Создать доску</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Modal
				open={openModal}
				onCancel={() => setOpenModal(false)}
				onOk={() => setOpenModal(false)}
				centered
				footer={false}>
				<div className={scss.modal_container}>
					<p className={scss.add_board_text}>Создать доску</p>
					{renderActiveColor()}
					<div className={scss.colors_div}>
						<p className={scss.add_board_text}>Фон</p>
						<div className={scss.colors}>
							{ColorArray.map((item, index) => (
								<div
									onClick={(e) => {
										renderColor(String(index));
										e.stopPropagation();
										e.preventDefault();
									}}
									key={index + 1}
									style={{
										width: "80px",
										height: "65px",
										borderRadius: "7px",
										background: item,
										cursor: "pointer",
									}}></div>
							))}
						</div>
					</div>
					<div className={scss.form_add_div}>
						<CustomInput
							value={valueTitle}
							onChange={setValueTitle}
							label="Заголовок доски"
							type="text"
						/>
						<p className={scss.add_board_text}>👋 Укажите название доски.</p>
					</div>
					<Button
						disabled={valueTitle.length === 0 ? true : false}
						onClick={handleAddBoardFunk}>
						{isLoadingPost ? "Loading..." : "Создать"}
					</Button>
					<span>
						Используя изображения с сайта Unsplash, вы принимаете его Условия
						использования и правила лицензии.
					</span>
				</div>
			</Modal>
		</>
	);
};
