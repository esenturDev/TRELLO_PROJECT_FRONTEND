namespace AUTH {
	type PostSignUpRequest = {
		email: string;
		password: string;
		name?: string;
	};
	type PostSignUpResponse = {
		_id: string;
		email: string;
		name: string;
		status?: number;
		message: string;
	};

	type PostSignInRequest = {
		email: string;
		password: string;
	};
	type PostSignInResponse = {
		token: string;
		status: number;
		message: string;
	};

	type GetMeRequest = void;
	type GetMeResponse = {
		_id: string;
		name: string;
		email: string;
	};
}
