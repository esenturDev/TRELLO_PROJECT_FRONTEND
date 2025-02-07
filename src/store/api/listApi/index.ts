import { api as index } from "..";
import Cookies from "js-cookie";
const api = index.injectEndpoints({
	endpoints: (build) => ({
		postListApi: build.mutation<Lists.postListResponse, Lists.postListRequest>({
			query: ({ boardId, title }) => ({
				url: "/lists",
				method: "POST",
				body: { boardId, title },
				headers: {
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			}),
			invalidatesTags: ["list"],
		}),
		getListsApi: build.query<Lists.getListsResponse, Lists.getListsRequest>({
			query: ({ boardId }) => ({
				url: `/lists?boardId=${boardId}`,
				method: "GET",
				headers: {
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			}),
			providesTags: ["list"],
		}),
	}),
});

export const { usePostListApiMutation, useGetListsApiQuery } = api;
