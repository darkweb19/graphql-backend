import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";

async function startServer() {
	const app = express();
	app.use(cors());
	app.use(express.json());

	//*graphql server
	const gqlServer = new ApolloServer({
		typeDefs: `
        type Query {
            hello : String! 
            say(name : String) : String
        }
        `,
		resolvers: {
			Query: {
				hello: () => `Hey  , I am grapql server`,
				say: (_, { name }: { name: string }) =>
					`Hey , ${name} , How are you?`,
			},
		},
	});

	//!starting the gql server
	await gqlServer.start();

	app.get("/", (req, res) => {
		res.json({ message: "Server is runnnig" });
	});

	app.use("/graphql", expressMiddleware(gqlServer));

	app.listen(8000, () => {
		console.log("Server is runnnig at port 3000");
	});
}

startServer();
