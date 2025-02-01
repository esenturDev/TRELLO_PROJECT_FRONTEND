import { api as index } from "..";

import Cookies from "js-cookie";
const api = index.injectEndpoints({
	endpoints: (build) => ({
		postBoardApi: build.mutation<
			Boards.postBoardResponse,
			Boards.postBoardRequest
		>({
			query: (data) => ({
				url: "/boards",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["board"],
		}),
		getBoardsApi: build.query<
			Boards.getBoardsResponse,
			Boards.getBoardsRequest
		>({
			query: () => ({
				url: "/boards",
				method: "GET",
				headers: {					
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			}),
			providesTags: ["board"],
		}),
	}),
});


export const { usePostBoardApiMutation, useGetBoardsApiQuery } = api;
