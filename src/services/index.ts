import { prismaClient } from "../lib/db";
import { createHmac, randomBytes } from "node:crypto";
import JWT from "jsonwebtoken";

const JWT_SECRET = "!@#Sask123";

export interface CreateUserPayload {
	firstName: string;
	lastName?: string;
	email: string;
	password: string;
}

export interface GetUserTokenPayload {
	email: string;
	password: string;
}
class UserService {
	//get user by id
	public static getUserById(id: string) {
		return prismaClient.user.findUnique({ where: { id } });
	}

	//generate hash for the password
	private static generateHash(salt: string, password: string) {
		const hashedPassword = createHmac("sha256", salt)
			.update(password)
			.digest("hex");
		return hashedPassword;
	}

	public static createUser(payload: CreateUserPayload) {
		const { firstName, lastName, email, password } = payload;
		const salt = randomBytes(32).toString("hex");
		const hashedPassword = UserService.generateHash(salt, password);

		return prismaClient.user.create({
			data: {
				firstName,
				lastName,
				email,
				salt,
				password: hashedPassword,
			},
		});
	}

	private static getUserByEmail(email: string) {
		return prismaClient.user.findUnique({ where: { email } });
	}

	//login and return token
	public static async getUserToken(payload: GetUserTokenPayload) {
		const { email, password } = payload;
		const user = await UserService.getUserByEmail(email);
		if (!user) throw new Error("user not found ");

		const userSalt = user.salt;
		const userHashedPassword = UserService.generateHash(userSalt, password);

		if (userHashedPassword !== user.password)
			throw new Error("Password did not matched");

		//generate a token JWT
		const token = JWT.sign({ id: user.id, email: user.email }, JWT_SECRET);

		return token;
	}

	public static decodeJWTToken(token: string) {
		return JWT.verify(token, JWT_SECRET);
	}
}
export default UserService;
