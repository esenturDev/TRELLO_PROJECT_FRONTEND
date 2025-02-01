type AuthTypes = {
  email: string;
  password: string;
  name?: string;
}

type TypesAuthorizationError = {
	data: {
		message: string;
		status: number;
	},
	message: string;
	status: number;
}