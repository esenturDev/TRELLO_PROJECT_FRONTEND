"use client";

import React from "react";
import scss from "@/pages/signUpPage/index.module.scss";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { urlPhoneAuth1, urlPhoneAuth2 } from "./constant";
import CustomInput from "@/components/ui/input-component";
import { Button, Input } from "antd";
import { usePostSignUpMutation } from "@/store/api/auth";
import { showToast } from "@/components/ui/toastify";
import Link from "next/link";

const SignUpPage = () => {
	const [postSignUp, { isLoading }] = usePostSignUpMutation();
	const router = useRouter();

	const {
		handleSubmit,
		reset,
		control,
		formState: { errors, isValid },
	} = useForm<AuthTypes>({
		mode: "onBlur",
	});
	const onSubmit: SubmitHandler<AuthTypes> = async (data, event) => {
		event?.preventDefault();
		try {
			const res = await postSignUp(data).unwrap();
			if (res.status === 201 || res.email) {
				setTimeout(() => {
					showToast("success", res.message || "success");
					router.push("/signIn");
				}, 300);
			}
			reset();
		} catch (error) {
			const err = error as TypesAuthorizationError;
			console.error(error);
			const errorMessage = err?.data?.message || "Произошла ошибка";
			showToast("error", errorMessage);
		}
	};
	return (
		<section className={scss.signUp_container}>
			<div className="container">
				<div className={scss.content}>
					<form
						className={scss.form_container}
						onSubmit={handleSubmit(onSubmit)}>
						<div className={scss.content_form}>
							<div className={scss.div_icon}>
								<Image
									src="data:image/svg+xml,%3csvg%20viewBox='0%200%2094%2032'%20height='32'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%20focusable='false'%20aria-hidden='true'%3e%3cdefs%3e%3clinearGradient%20id='uid3'%20x1='9.33821'%20y1='23.6824'%20x2='9.33821'%20y2='5.00599'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%230052CC'%20offset='0%25'%3e%3c/stop%3e%3cstop%20stop-color='%232684FF'%20offset='100%25'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3cpath%20fill='var(--ds-text,%20%23172B4D)'%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M68.749%2023.7902C66.249%2023.7902%2064.6742%2022.5776%2064.6742%2019.7573V5H68.5155V19.2304C68.5155%2020.0477%2069.0574%2020.3381%2069.7131%2020.3381C69.9021%2020.3421%2070.0911%2020.3331%2070.2789%2020.3112V23.6315C69.7788%2023.7552%2069.2639%2023.8086%2068.749%2023.7902ZM38.7121%209.98505V6.37431H26.0297V9.98505H30.3051V23.6825H34.4308V9.98505H38.7121ZM40.1498%2023.6825H43.9641V16.6227C43.9641%2014.464%2045.2276%2013.8053%2047.9072%2014.0149V10.027C45.8443%209.89522%2044.6856%2010.973%2043.9641%2012.7904V10.2096H40.1498V23.6825ZM72.6901%2019.7573C72.6901%2022.5776%2074.2619%2023.7902%2076.7619%2023.7902C77.2787%2023.809%2077.7957%2023.7556%2078.2978%2023.6315V20.3112C78.109%2020.333%2077.9189%2020.342%2077.7289%2020.3381C77.0732%2020.3381%2076.5313%2020.0477%2076.5313%2019.2304V5H72.6901V19.7573ZM80.1444%2016.9402C80.1444%2012.7786%2082.5396%209.93129%2086.6653%209.93129C90.791%209.93129%2093.1353%2012.7845%2093.1353%2016.9402C93.1353%2021.0958%2090.764%2024%2086.6653%2024C82.5665%2024%2080.1444%2021.0749%2080.1444%2016.9402ZM83.8809%2016.9402C83.8809%2018.9701%2084.7312%2020.5749%2086.6653%2020.5749C88.5994%2020.5749%2089.3988%2018.9701%2089.3988%2016.9402C89.3988%2014.9103%2088.5724%2013.3474%2086.6653%2013.3474C84.7581%2013.3474%2083.8959%2014.9103%2083.8959%2016.9402H83.8809ZM56.2777%2018.3621C55.2023%2018.3538%2054.1281%2018.2909%2053.0592%2018.1734C53.4124%2020.0986%2054.8256%2020.7692%2056.8795%2020.7692C58.4004%2020.7692%2059.8854%2020.3501%2061.1998%2019.9309V23.1734C59.7762%2023.7133%2058.2642%2023.9824%2056.7417%2023.9668C51.6131%2023.9668%2049.3436%2021.4009%2049.3436%2017.0806C49.3436%2012.934%2051.9723%209.94%2056.0801%209.94C59.1309%209.94%2061.6668%2012.0058%2061.6668%2014.7513C61.6668%2017.5776%2059.1968%2018.3621%2056.2777%2018.3621ZM57.9513%2014.6166C57.9513%2013.6136%2057.0831%2012.8801%2056.0022%2012.8801L55.9992%2012.8711C55.4963%2012.8789%2055.0046%2013.0206%2054.5746%2013.2816C54.1447%2013.5426%2053.7921%2013.9135%2053.5532%2014.3561C53.2546%2014.9118%2053.0751%2015.5236%2053.0262%2016.1525C53.686%2016.2551%2054.3525%2016.3081%2055.0202%2016.3112C56.5861%2016.3112%2057.9513%2015.91%2057.9513%2014.6166Z'%3e%3c/path%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M16.4579%205H2.21854C1.63014%205%201.06585%205.23374%200.649794%205.64979C0.233738%206.06585%200%206.63014%200%207.21854V21.4669C0%2022.0553%200.233738%2022.6196%200.649794%2023.0356C1.06585%2023.4517%201.63014%2023.6854%202.21854%2023.6854H16.4579C17.0463%2023.6854%2017.6106%2023.4517%2018.0266%2023.0356C18.4427%2022.6196%2018.6764%2022.0553%2018.6764%2021.4669V7.22452C18.6772%206.93268%2018.6204%206.64354%2018.5093%206.37369C18.3981%206.10383%2018.2348%205.85855%2018.0287%205.65191C17.8227%205.44527%2017.5778%205.28131%2017.3083%205.16945C17.0387%205.05758%2016.7497%205%2016.4579%205V5ZM8.04481%2018.4729C8.04481%2018.6685%207.96731%2018.8561%207.82927%2018.9947C7.69123%2019.1333%207.50391%2019.2116%207.30829%2019.2124H4.18558C3.98969%2019.2116%203.80205%2019.1334%203.66353%2018.9949C3.52502%2018.8564%203.44685%2018.6688%203.44607%2018.4729V9.19157C3.44685%208.99568%203.52502%208.80804%203.66353%208.66952C3.80205%208.53101%203.98969%208.45284%204.18558%208.45205H7.30829C7.50391%208.45285%207.69123%208.53111%207.82927%208.66971C7.96731%208.80831%208.04481%208.99595%208.04481%209.19157V18.4729ZM15.2304%2014.2185C15.2296%2014.4143%2015.1514%2014.602%2015.0129%2014.7405C14.8744%2014.879%2014.6867%2014.9572%2014.4908%2014.958H11.3681C11.1725%2014.9572%2010.9852%2014.8789%2010.8471%2014.7403C10.7091%2014.6017%2010.6316%2014.4141%2010.6316%2014.2185V9.19157C10.6316%208.99595%2010.7091%208.80831%2010.8471%208.66971C10.9852%208.53111%2011.1725%208.45285%2011.3681%208.45205H14.4908C14.6867%208.45284%2014.8744%208.53101%2015.0129%208.66952C15.1514%208.80804%2015.2296%208.99568%2015.2304%209.19157V14.2185Z'%20fill='url(%23uid3)'%3e%3c/path%3e%3c/svg%3e"
									alt="icon trello"
									width={85}
									height={40}
								/>
							</div>
							<div className={scss.forms}>
								<p>Зарегистрируйтесь, чтобы продолжить</p>
								<Controller
									name="name"
									control={control}
									defaultValue=""
									rules={{
										required: "Введите имя для регистрации",
										minLength: {
											value: 3,
											message: "Имя должно содержать не менее 3 символов",
										},
									}}
									render={({ field, fieldState }) => (
										<CustomInput
											placeholder="Имя пользователя"
											id="name"
											{...field}
											type="text"
											error={errors.name?.message}
											success={fieldState.isTouched && !fieldState.invalid}
										/>
									)}
								/>
								<Controller
									name="email"
									control={control}
									defaultValue=""
									rules={{
										required: "Введите e-mail для регистрации",
										pattern: {
											value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
											message: "Введите действительный e-mail адрес",
										},
									}}
									render={({ field, fieldState }) => (
										<CustomInput
											placeholder="Введите e-mail"
											id="email"
											{...field}
											type="text"
											error={errors.email?.message}
											success={fieldState.isTouched && !fieldState.invalid}
										/>
									)}
								/>
								<Controller
									name="password"
									control={control}
									defaultValue=""
									rules={{
										required: "Введите пароль",
										minLength: {
											value: 3,
											message: "Пароль должен содержать не менее 3 символов",
										},
									}}
									render={({ field, fieldState }) => (
										<CustomInput
											placeholder="Пароль"
											id="password"
											{...field}
											type="password"
											error={errors.password?.message}
											success={fieldState.isTouched && !fieldState.invalid}
										/>
									)}
								/>
								<button className={scss.button} type="submit">
									{isLoading ? "Loading..." : "Зарегистрироваться"}
								</button>
								<Link className={scss.link} href={"/signIn"}>
									Login
								</Link>
							</div>
						</div>
					</form>
					<div className={scss.photos_div}>
						<Image
							width={320}
							height={320}
							className={scss.images}
							src={urlPhoneAuth1}
							alt="photo 1"
						/>
						<Image
							width={320}
							height={320}
							className={scss.images}
							src={urlPhoneAuth2}
							alt="photo 2"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SignUpPage;
