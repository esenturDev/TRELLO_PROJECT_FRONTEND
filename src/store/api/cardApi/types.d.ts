namespace Cards {
  type postCardRequest = {
    title: string;
    description: string;
    listId: string;
    boardId: string;
    userId?: string;
  }
  type postCardResponse = {
    title: string;
    description: string;
    listId: string;
    boardId: string;
    userId?: string;
    message: string;
  }

  type getCardsRequest = string;
  type getCardsResponse = {
    title: string;
    description: string;
    listId: string;
    boardId: string;
    userId?: string;
  }[];
}