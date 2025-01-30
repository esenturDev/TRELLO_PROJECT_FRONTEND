import { api as index } from "..";

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
	}),
});

export const { usePostSignUpMutation, usePostSignInMutation } = api;
