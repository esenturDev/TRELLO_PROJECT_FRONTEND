import { api as index } from "..";
import Cookies from "js-cookie";
const api = index.injectEndpoints({
	endpoints: (build) => ({
		postSignUp: build.mutation<AUTH.PostSignUpResponse, AUTH.PostSignUpRequest>(
			{
				query: (newData) => ({
					url: "/auth/signUp",
					method: "POST",
					body: newData,
				}),
				invalidatesTags: ["auth"],
			}
		),
		postSignIn: build.mutation<AUTH.PostSignInResponse, AUTH.PostSignInRequest>(
			{
				query: (newData) => ({
					url: "/auth/signIn",
					method: "POST",
					body: newData,
				}),
				invalidatesTags: ["auth"],
			}
		),
		getMeUserApi: build.query<AUTH.GetMeResponse, AUTH.GetMeRequest>({
			query: () => ({
				url: "/auth/signUp/me",
				method: "GET",
				headers: {
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			}),
			providesTags: ["auth"],
		}),
	}),
});

export const {
	usePostSignUpMutation,
	usePostSignInMutation,
	useGetMeUserApiQuery,
} = api;
