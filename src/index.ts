import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { prismaClient } from "./lib/db";

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
		type Mutation {
			createUser(firstName : String! , lastName : String! ,email : String! , password :String!) : Boolean
		}
        `,
		resolvers: {
			Query: {
				hello: () => `Hey  , I am grapql server`,
				say: (_, { name }: { name: string }) =>
					`Hey , ${name} , How are you?`,
			},
			Mutation: {
				createUser: async (
					_,
					{
						firstName,
						lastName,
						email,
						password,
					}: {
						firstName: string;
						lastName: string;
						email: string;
						password: string;
					}
				) => {
					await prismaClient.user.create({
						data: {
							firstName,
							lastName,
							email,
							password,
							salt: "random-salt",
						},
					});
					return true;
				},
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
