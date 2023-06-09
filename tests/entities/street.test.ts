import { ApolloServer } from "@apollo/server";

import assert from "assert";

import { typeDefs, resolvers } from "../../source/schema";

describe("Street entity test suit", () => {
    let testServer: ApolloServer;

    beforeAll(() => {
        testServer = new ApolloServer({
            typeDefs,
            resolvers,
        });
    });

    it("should return the amount of active streets", async () => {
        const response = await testServer.executeOperation({
            query: `query { activeStreetsCount }`,
        });

        assert(response.body.kind === "single");
        expect(response.body.singleResult.errors).toBeUndefined();
        expect(response.body.singleResult.data?.activeStreetsCount).toBe(10);
    });
});
