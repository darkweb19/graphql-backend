import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import createApolloGraphqlServer from "./graphql";

async function startServer() {
	const app = express();
	app.use(cors());
	app.use(express.json());

	app.get("/", (req, res) => {
		res.json({ message: "Server is runnnig" });
	});

	app.use("/graphql", expressMiddleware(await createApolloGraphqlServer()));

	app.listen(8000, () => {
		console.log("Server is runnnig at port 3000");
	});
}

startServer();
