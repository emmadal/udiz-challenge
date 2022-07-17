import { gql } from "apollo-server";

export const typeDefs = gql`
  # User type defines the queryable fields for every User in our data source.
  type User {
    id: ID!
    name: String!
    username: String!
    password: String!
    token: String
  }
  # PERFORMANCE Enum is related to each Roof.
  enum Performance {
    ACOUSTIC
    HUMIDITY
    LIGHT_REFLECT
    THERMIC
    FIRE_RESISTANCE
  }
  # Roof type defines the queryable fields for every Roof in our data source.
  type Roof {
    id: ID!
    ref: String!
    amount: Int!
    length: String!
    width: String!
    performance: [Performance]
  }

  type Query {
    roofs: [Roof]
    roof(id: ID!): Roof!
  }

  input RoofInput {
    ref: String!
    amount: Int!
    length: String!
    width: String!
    performance: [Performance]
  }

  input UserInput {
    name: String!
    username: String!
    password: String!
  }

  type Mutation {
    createRoof(input: RoofInput!): Roof
    deleteRoof(id: ID!): [Roof]
    updateRoof(id: ID!, input: RoofInput): Roof
    signUp(input: UserInput!): User
    signIn(username: String!, password: String!): User
  }
`;