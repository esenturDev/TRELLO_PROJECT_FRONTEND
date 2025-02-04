import { api as index } from "..";

import Cookies from "js-cookie";
const api = index.injectEndpoints({
	endpoints: (build) => ({
		postBoardApi: build.mutation<
			Boards.postBoardResponse,
			Boards.postBoardRequest
		>({
			query: ({ title, colorContainer }) => ({
				url: "/boards",
				method: "POST",
				body: { title, colorContainer },
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
		getByIdBoard: build.query<
			Boards.getByIdBoardResponse,
			Boards.getByIdBoardRequest
		>({
			query: (id) => ({
				url: `/boards/${id}`,
				method: "GET",
				headers: {
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			}),
			providesTags: ["board"],
		}),
	}),
});

export const {
	usePostBoardApiMutation,
	useGetBoardsApiQuery,
	useGetByIdBoardQuery,
} = api;
