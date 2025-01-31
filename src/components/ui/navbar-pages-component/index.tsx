"use client";

import React from "react";
import scss from "./index.module.scss";
import { BoardsArray } from "./constant";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
export const NavbarPagesComponent = () => {
	const pathname = usePathname();
	return (
		<nav className={scss.navbar_container}>
			<div className={scss.content}>
				{BoardsArray.map((el, index) => (
					<Link 
						className={`${scss.link} ${
							el.href === pathname ? scss.active : ""
						}`}
						key={index + 1}
						href={el.href}>
						{el.icon}
						{el.title}
					</Link>
				))}
			</div>
		</nav>
	);
};
