namespace AUTH {
	type PostSignUpRequest = {
		email: string;
		password: string;
		name: string;
	};
	type PostSignUpResponse = {
		_id: string;
		email: string;
		name: string;
	};

	type PostSignInRequest = {
		email: string;
		password: string;
	};
	type PostSignInResponse = {
		token: string;
	};
}
