import { api as index } from "..";
import Cookies from "js-cookie";
const api = index.injectEndpoints({
	endpoints: (build) => ({
		postCardApi: build.mutation<Cards.postCardResponse, Cards.postCardRequest>({
			query: (data) => ({
				url: "/cards",
				method: "POST",
				body: data,
				headers: {
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			}),
			invalidatesTags: ["card"],
		}),
		getCardsApi: build.query<Cards.getCardsResponse, Cards.getCardsRequest>({
			query: (listId) => ({
				url: `/cards?listId=${listId}`,
				method: "GET",
				headers: {
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			}),
			providesTags: ["card"],
		}),
	}),
});

export const { usePostCardApiMutation, useGetCardsApiQuery } = api;
