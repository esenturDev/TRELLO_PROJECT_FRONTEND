namespace Boards {
  type postBoardRequest = {
    title: string;
    // userId: string;
    colorContainer: string;
  }
  type postBoardResponse = {
    title: string;
    userId: string;
    message: string;
    status: number;
  }

  type getBoardsRequest = void;
  type getBoardsResponse = {
    boards: {
      colorContainer: string;
      title: string;
      userId?: string
    }[]
  };
}