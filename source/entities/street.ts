import gql from "graphql-tag";

import {
    getStreetCount,
    getActiveStreetCount,
    findStreetById,
    getActiveStreetsWithSections,
    getStreetsWithSections,
    saveNewStreet,
} from "../services/street-service.js";

import Street from "../models/street.js";

export const typeDefs = gql`
    extend type Query {
        streetsCount: Int!
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
        streetsCount: async () => {
            return await getStreetCount();
        },
        activeStreetsCount: async () => {
            return await getActiveStreetCount();
        },
        street: async (_: Street, args: { id: number }) => {
            return await findStreetById(args.id);
        },
        streets: async (_: Street, args: { deleted?: string }) => {
            let streets: Street[];

            if (args.deleted) {
                streets = await getStreetsWithSections();
            } else {
                streets = await getActiveStreetsWithSections();
            }

            return streets;
        },
    },
    Mutation: {
        addStreet: async (_: Street, args: { name: string }) => {
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
