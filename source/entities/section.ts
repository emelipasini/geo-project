import gql from "graphql-tag";

import { getActiveSections, getSections } from "../services/section-service.js";

import Section from "../models/section.js";

export const typeDefs = gql`
    extend type Query {
        activeSectionsCount: Int!
        section(id_tramo: Int!): Section
        sectionsByStreet(id_via: Int!): [Section]
        sections(deleted: DeletedSections): [Section]
    }

    enum DeletedSections {
        YES
    }

    type Section {
        id_tramo: Int!
        id_via: Street
        alt_izqini: Int
        alt_derini: Int
        alt_izqfin: Int
        alt_derfin: Int
        altura_derecha: String
        altura_izquierda: String
        geom: String!
        fecha_alta: String!
        fecha_baja: String
    }
`;

export const resolvers = {
    Query: {
        activeSectionsCount: async () => {
            const sections = await getActiveSections();
            return sections.length;
        },
        section: async (_: Section, args: { id_tramo: number }) => {
            const sections = await getSections();
            return sections.find((section: Section) => section.id_tramo === args.id_tramo);
        },
        sectionsByStreet: async (_: Section, args: { id_via: number }) => {
            const sections = await getSections();
            return sections.filter((section: Section) => (section.id_via as unknown as Section).id_via === args.id_via);
        },
        sections: async (_: Section, args: { deleted?: string }) => {
            let sections: Section[];

            if (args.deleted) {
                sections = await getSections();
            } else {
                sections = await getActiveSections();
            }

            return sections;
        },
    },
    Section: {
        altura_izquierda: (parent: Section) => {
            return `${parent.alt_izqini} - ${parent.alt_izqfin}`;
        },
        altura_derecha: (parent: Section) => {
            return `${parent.alt_derini} - ${parent.alt_derfin}`;
        },
        fecha_alta: (parent: Section) => {
            const date = new Date(parent.fecha_alta);
            return date.toLocaleString().replace(",", "");
        },
        fecha_baja: (parent: Section) => {
            if (parent.fecha_baja) {
                const date = new Date(parent.fecha_baja);
                return date.toLocaleString().replace(",", "");
            }
            return null;
        },
    },
};
