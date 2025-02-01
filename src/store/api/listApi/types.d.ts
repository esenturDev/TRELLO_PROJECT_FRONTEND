namespace Lists {
  type postListRequest = {
    title: string;
    boardId: string;
    userId?: string
  }
  type postListResponse = {
    message: string;
    title: string;
    boardId: string;
    userId?: string
  }

  type getListsRequest = void;
  type getListsResponse = {
    title: string;
    boardId?: string;
  }[];
}