import gql from "graphql-tag";

import { getActiveStreets, getStreets, saveNewStreet } from "../services/street-service.js";

import Street from "../models/street.js";

export const typeDefs = gql`
    extend type Query {
        activeStreetsCount: Int!
        street(id: Int!): Street
        streets(deleted: DeletedStreets): [Street]
    }

    extend type Mutation {
        addStreet(name: String!): Street
    }

    enum DeletedStreets {
        YES
        NO
    }

    type Street {
        id: ID!
        name: String!
        created: String!
        deleted: String
        sections: [Section]
    }
`;

export const resolvers = {
    Query: {
        activeStreetsCount: async () => {
            const streets = await getActiveStreets();
            return streets.length;
        },
        street: async (_: Street, args: { id: number }) => {
            const streets = await getStreets();
            return streets.find((street: Street) => street.id === args.id);
        },
        streets: async (_: Street, args: { deleted?: string }) => {
            let streets: Street[];

            if (args.deleted) {
                streets = await getStreets();
            } else {
                streets = await getActiveStreets();
            }

            return streets;
        },
    },
    Mutation: {
        addStreet: async (_: Street, args: { name: string }) => {
            const streets = await getStreets();

            const streetAlreadyExists = streets.find((street: Street) => street.name === args.name);
            if (streetAlreadyExists) {
                return streetAlreadyExists;
            }

            const newStreet = await saveNewStreet(args.name);
            return newStreet;
        },
    },
    Street: {
        created: (parent: Street) => {
            const date = new Date(parent.created);
            return date.toLocaleString().replace(",", "");
        },
        deleted: (parent: Street) => {
            if (parent.deleted) {
                const date = new Date(parent.deleted);
                return date.toLocaleString().replace(",", "");
            }
            return null;
        },
    },
};
