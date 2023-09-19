import { User } from ".";
import UserService, { CreateUserPayload } from "../../services";

const queries = {
	getUserToken: async (
		_: any,
		payload: { email: string; password: string }
	) => {
		const token = await UserService.getUserToken({
			email: payload.email,
			password: payload.password,
		});
		return token;
	},
	getCurrentLoggedInUSer: async (_: any, parameters: any, context: any) => {
		if (context && context.user.id) {
			const id = context.user.id;
			const user = await UserService.getUserById(id);

			return user;
		}

		throw new Error("i dont know who are you ");
	},
};

const mutations = {
	createUser: async (_: any, payload: CreateUserPayload) => {
		const res = await UserService.createUser(payload);
		return res.id;
	},
};

export const resolvers = { queries, mutations };
