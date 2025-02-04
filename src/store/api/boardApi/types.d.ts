namespace Boards {
	type postBoardRequest = {
		title: string;
		// userId: string;
		colorContainer: string;
	};
	type postBoardResponse = {
		title: string;
		userId: string;
		message: string;
		status: number;
		_id: string;
	};

	type getBoardsRequest = void;
	type getBoardsResponse = {
		boards: {
			colorContainer: string;
			title: string;
			userId?: string;
      _id: string;
		}[];
	};

	type getByIdBoardRequest = string;
	type getByIdBoardResponse = {
		_id: string;
		status: number;
		title: string;
		colorContainer: string;
	};
}
