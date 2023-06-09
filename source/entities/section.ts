import gql from "graphql-tag";

import { getActiveSectionsWithStreets, getSectionsWithStreets } from "../services/section-service.js";

import Section from "../models/section.js";

export const typeDefs = gql`
    extend type Query {
        activeSectionsCount: Int!
        section(id: Int!): Section
        sectionsByStreet(street_id: Int!): [Section]
        sections(deleted: DeletedSections): [Section]
    }

    enum DeletedSections {
        YES
        NO
    }

    type Section {
        id: Int!
        street_id: Street
        initial_left: Int
        initial_right: Int
        end_left: Int
        end_right: Int
        right_range: String
        left_range: String
        geometry: String!
        created: String!
        deleted: String
    }
`;

export const resolvers = {
    Query: {
        activeSectionsCount: async () => {
            const sections = await getActiveSectionsWithStreets();
            return sections.length;
        },
        section: async (_: Section, args: { id: number }) => {
            const sections = await getSectionsWithStreets();
            return sections.find((section: Section) => section.id === args.id);
        },
        sectionsByStreet: async (_: Section, args: { street_id: number }) => {
            const sections = await getSectionsWithStreets();
            return sections.filter(
                (section: Section) => (section.street_id as unknown as Section).street_id === args.street_id
            );
        },
        sections: async (_: Section, args: { deleted?: string }) => {
            let sections: Section[];

            if (args.deleted) {
                sections = await getSectionsWithStreets();
            } else {
                sections = await getActiveSectionsWithStreets();
            }

            return sections;
        },
    },
    Section: {
        left_range: (parent: Section) => {
            return `${parent.initial_left} - ${parent.end_left}`;
        },
        right_range: (parent: Section) => {
            return `${parent.initial_right} - ${parent.end_right}`;
        },
        created: (parent: Section) => {
            const date = new Date(parent.created);
            return date.toLocaleString().replace(",", "");
        },
        deleted: (parent: Section) => {
            if (parent.deleted) {
                const date = new Date(parent.deleted);
                return date.toLocaleString().replace(",", "");
            }
            return null;
        },
    },
};
