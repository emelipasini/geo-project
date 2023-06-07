import gql from "graphql-tag";

import { typeDefs as sectionDefs } from "./entities/section.js";
import { typeDefs as streetDefs, resolvers as streetResolver } from "./entities/street.js";

const rootTypeDefs = gql`
    type Query {
        _: String
    }

    type Mutation {
        _: String
    }
`;

export const resolvers = [streetResolver];

export const typeDefs = [rootTypeDefs, sectionDefs, streetDefs];
