import React from "react";
import scss from "./index.module.scss";
import {
	IconMenuDeep,
	IconBrandTrello,
	IconComponents,
	IconHelpHexagon,
} from "@tabler/icons-react";
import CustomInput from "@/components/ui/input-component";
import Image from "next/image";
export const Header = () => {
	return (
		<header className={scss.header_container}>
			<nav className={scss.navbar}>
				<div className={scss.blok_1}>
					<IconMenuDeep
						color="#ccc"
						width={28}
						height={28}
						cursor={"pointer"}
					/>
					<button>
						<IconBrandTrello
							width={28}
							height={28}
							cursor={"pointer"}
							color="#ccc"
						/>
						Trello
					</button>
					<button className={scss.buttons_menu}>Рабочие пространства</button>
					<button className={scss.buttons_menu}>Недавние</button>
					<button className={scss.buttons_menu}>В избранном</button>
					<button className={scss.buttons_menu}>Больше</button>
					<button className={scss.button_plus}>+</button>
				</div>
				<div className={scss.blok_2}>
					<input type="text" placeholder="Поиск" />
					<IconComponents width={28} height={28} color="#ccc" />
					<IconHelpHexagon width={28} height={28} color="#ccc" />
					<img
						src="https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"
						alt="user profile"
						width={28}
						height={28}
						style={{ borderRadius: "50%", cursor: "pointer" }}
					/>
				</div>
			</nav>
		</header>
	);
};
