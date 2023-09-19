import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGraphqlServer from "./graphql";
import UserService from "./services";

async function startServer() {
	const app = express();

	app.use(express.json());

	app.get("/", (req, res) => {
		res.json({ message: "Server is runnnig" });
	});

	app.use(
		"/graphql",
		expressMiddleware(await createApolloGraphqlServer(), {
			context: async ({ req }) => {
				//@ts-ignore
				const token = req.headers["token"];
				try {
					const user = UserService.decodeJWTToken(token as string);
					return { user };
				} catch (err) {
					return {};
				}
			},
		})
	);

	app.listen(8000, () => {
		console.log("Server is runnnig at port 3000");
	});
}

startServer();
