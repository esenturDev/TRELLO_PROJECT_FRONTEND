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

  type getListsRequest = {
    boardId: string;
  };
  type getListsResponse = {
    title: string;
    boardId?: string;
    _id: string;
  }[];
}