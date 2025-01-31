import React from "react";
import scss from "./index.module.scss";
import { NavbarPagesComponent } from "@/components/ui/navbar-pages-component";
export const WelcomePage = () => {
	return (
		<section className={scss.home_container}>
			<div className="container">
				<div className={scss.content}>
					<NavbarPagesComponent/>
					
				</div>
			</div>
		</section>
	);
};
