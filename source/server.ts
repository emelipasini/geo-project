import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs, resolvers } from "./schema.js";

const server = new ApolloServer<any>({ typeDefs, resolvers });

startStandaloneServer(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
    listen: { port: 4000 },
}).then(({ url }) => {
    console.log(`Server running at ${url}`);
});
