import React from "react";
import scss from "./index.module.scss";
import {
	IconArrowDown,
	IconArticle,
	IconBoltFilled,
	IconBrandTrello,
	IconFilters,
	IconMenuDeep,
	IconRocket,
	IconStar,
	IconUserCheck,
	IconUserCircle,
	IconUsers,
} from "@tabler/icons-react";
export const MenuHeader = () => {
	return (
		<nav className={scss.menu_header_container}>
			<div className={scss.content}>
				<ul className={scss.ul}>
					<h2>Trello</h2>
					<IconStar height={16} width={16} color="white" />
					<li>
						<IconUsers height={16} width={16} color="white" />
						Для рабочего пространства
					</li>
					<button>
						<IconBrandTrello height={16} width={16} color="#4b4848" /> По доске
					</button>
					<li>
						<IconArticle height={16} width={16} color="#ccc" /> Таблица
					</li>
					<IconArrowDown color="#ccc" cursor={"pointer"} />
				</ul>
				<ul className={scss.ul}>
					<li>
						<IconRocket height={16} width={16} color="white" />
						Улучшение
					</li>
					<li>
						<IconBoltFilled height={16} width={16} color="#ccc" /> Автоматизация
					</li>
					<li>
						<IconFilters height={16} width={16} color="#ccc" /> Фильтры
					</li>
					<IconUserCircle
						width={20}
						height={20}
						color="#ccc"
						cursor={"pointer"}
					/>
					<button>
						<IconUserCheck height={16} width={16} color="#4b4848" /> Поделиться
					</button>
					<IconMenuDeep
						height={16}
						width={16}
						color="white"
						cursor={"pointer"}
					/>
				</ul>
			</div>
		</nav>
	);
};
