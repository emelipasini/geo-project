import gql from "graphql-tag";

import {
    getSectionCount,
    getActiveSectionCount,
    findSectionById,
    getSectionsByStreetId,
    getActiveSectionsWithStreets,
    getSectionsWithStreets,
} from "../services/section-service.js";

import type Section from "../models/section.js";
import { replaceNumberForName } from "../models/street-types.js";

export const typeDefs = gql`
    extend type Query {
        sectionsCount: Int!
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
        street_type: String
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
        sectionsCount: async () => {
            return await getSectionCount();
        },
        activeSectionsCount: async () => {
            return await getActiveSectionCount();
        },
        section: async (_: Section, args: { id: number }) => {
            return await findSectionById(args.id);
        },
        sectionsByStreet: async (_: Section, args: { street_id: number }) => {
            return await getSectionsByStreetId(args.street_id);
        },
        sections: async (_: Section, args: { deleted?: string }) => {
            let sections: Section[];

            if (args.deleted === "YES") {
                sections = await getSectionsWithStreets();
            } else {
                sections = await getActiveSectionsWithStreets();
            }

            return sections;
        },
    },
    Section: {
        street_type: (parent: Section) => {
            return replaceNumberForName(parent.street_type);
        },
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
            if (parent.deleted !== null) {
                const date = new Date(parent.deleted);
                return date.toLocaleString().replace(",", "");
            }
            return null;
        },
    },
};
