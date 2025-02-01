namespace Boards {
  type postBoardRequest = {
    title: string;
    userId: string;
  }
  type postBoardResponse = {
    title: string;
    userId: string;
    message: string;
  }

  type getBoardsRequest = void;
  type getBoardsResponse = {
    boards: {

      title: string;
      userId?: string
    }[]
  };
}