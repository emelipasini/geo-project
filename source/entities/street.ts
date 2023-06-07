import gql from "graphql-tag";

import { getStreets, getAllStreets } from "../services/street-service.js";

import Street from "../models/street.js";

export const typeDefs = gql`
    extend type Query {
        activeStreetsCount: Int!
        street(id_via: Int!): Street
        streets(deleted: DeletedStreets): [Street]
    }

    enum DeletedStreets {
        YES
    }

    type Street {
        id_via: Int!
        nombre_oficial: String!
        fecha_alta: String!
        fecha_baja: String
    }
`;

export const resolvers = {
    Query: {
        activeStreetsCount: async () => {
            const streets = await getStreets();
            return streets.length;
        },
        street: async (root: any, args: any) => {
            const streets = await getStreets();
            return streets.find((street: any) => street.id_via === args.id_via);
        },
        streets: async (root: any, args: any) => {
            let streets: Street[];

            if (args.deleted) {
                streets = await getAllStreets();
            } else {
                streets = await getStreets();
            }

            return streets;
        },
    },
    Street: {
        fecha_alta: (parent: any) => {
            const date = new Date(parent.fecha_alta);
            return date.toLocaleString().replace(",", "");
        },
        fecha_baja: (parent: any) => {
            if (parent.fecha_baja) {
                const date = new Date(parent.fecha_baja);
                return date.toLocaleString().replace(",", "");
            }
            return null;
        },
    },
};
