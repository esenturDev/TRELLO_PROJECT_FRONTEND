import React from "react";
import scss from "./index.module.scss";
export const WelcomePage = () => {
	return (
		<section className={scss.home_container}>
			<div className="container">
				<div className={scss.content}></div>
			</div>
		</section>
	);
};
