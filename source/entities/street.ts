import gql from "graphql-tag";

import { getActiveStreets, getStreets, saveNewStreet } from "../services/street-service.js";

import Street from "../models/street.js";

export const typeDefs = gql`
    extend type Query {
        activeStreetsCount: Int!
        street(id_via: Int!): Street
        streets(deleted: DeletedStreets): [Street]
    }

    extend type Mutation {
        addStreet(nombre_oficial: String!): Street
    }

    enum DeletedStreets {
        YES
    }

    type Street {
        id_via: ID!
        nombre_oficial: String!
        fecha_alta: String!
        fecha_baja: String
        tramos: [Section]
    }
`;

export const resolvers = {
    Query: {
        activeStreetsCount: async () => {
            const streets = await getActiveStreets();
            return streets.length;
        },
        street: async (_: Street, args: { id_via: number }) => {
            const streets = await getStreets();
            return streets.find((street: Street) => street.id_via === args.id_via);
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
        addStreet: async (_: Street, args: { nombre_oficial: string }) => {
            const streets = await getStreets();

            const streetAlreadyExists = streets.find((street: Street) => street.nombre_oficial === args.nombre_oficial);
            if (streetAlreadyExists) {
                return streetAlreadyExists;
            }

            const newStreet = await saveNewStreet(args.nombre_oficial);
            return newStreet;
        },
    },
    Street: {
        fecha_alta: (parent: Street) => {
            const date = new Date(parent.fecha_alta);
            return date.toLocaleString().replace(",", "");
        },
        fecha_baja: (parent: Street) => {
            if (parent.fecha_baja) {
                const date = new Date(parent.fecha_baja);
                return date.toLocaleString().replace(",", "");
            }
            return null;
        },
    },
};
