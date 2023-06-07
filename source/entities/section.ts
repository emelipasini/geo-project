import gql from "graphql-tag";

export const typeDefs = gql`
    type Section {
        id_tramo: Int!
        id_via: Int!
        alt_izqini: Int
        alt_derini: Int
        alt_izqfin: Int
        alt_derfin: Int
        geom: String!
    }
`;
