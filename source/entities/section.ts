import gql from "graphql-tag";

import { getSections, getAllSections } from "../services/section-service.js";

import Section from "../models/section.js";

export const typeDefs = gql`
    extend type Query {
        activeSectionsCount: Int!
        section(id_tramo: Int!): Section
        sections(deleted: DeletedSections): [Section]
    }

    enum DeletedSections {
        YES
    }

    type Section {
        id_tramo: Int!
        id_via: Int!
        alt_izqini: Int
        alt_derini: Int
        alt_izqfin: Int
        alt_derfin: Int
        geom: String!
        fecha_alta: String!
        fecha_baja: String
    }
`;

export const resolvers = {
    Query: {
        activeSectionsCount: async () => {
            const sections = await getSections();
            return sections.length;
        },
        section: async (root: any, args: any) => {
            const sections = await getSections();
            return sections.find((section: any) => section.id_tramo === args.id_tramo);
        },
        sections: async (root: any, args: any) => {
            let sections: Section[];

            if (args.deleted) {
                sections = await getAllSections();
            } else {
                sections = await getSections();
            }

            return sections;
        },
    },
    Section: {
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
