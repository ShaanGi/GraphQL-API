const { gql } = require('apollo-server');

// Type definitions (schema)
const typeDefs = gql`
  type Startup {
    id: ID!
    name: String!
    location: String!
    industry: String!
  }

  type Query {
    startups: [Startup]
    startup(id: ID!): Startup
  }

  type Mutation {
    createStartup(name: String!, location: String!, industry: String!): Startup
    updateStartup(id: ID!, name: String, location: String, industry: String): Startup
    deleteStartup(id: ID!): Startup
  }
`;

module.exports = typeDefs;
