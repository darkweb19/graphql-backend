import { ApolloServer } from "@apollo/server";
import { User } from "./user";

async function createApolloGraphqlServer() {
	//*graphql server
	const gqlServer = new ApolloServer({
		typeDefs: `
        type Query {
	
			${User.queries}
           
        }
		type Mutation {
			${User.mutations}
		}
        `,
		resolvers: {
			Query: {
				...User.resolvers.queries,
			},
			Mutation: {
				...User.resolvers.mutations,
			},
		},
	});

	//!starting the gql server
	await gqlServer.start();
	return gqlServer;
}

export default createApolloGraphqlServer;
