const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./schema');
const startups = require('./db');
const { v4: uuidv4 } = require('uuid');

// Resolvers
const resolvers = {
  Query: {
    startups: () => startups,
    startup: (_, { id }) => startups.find(startup => startup.id === id),
  },
  Mutation: {
    createStartup: (_, { name, location, industry }) => {
      const newStartup = { id: uuidv4(), name, location, industry };
      startups.push(newStartup);
      return newStartup;
    },
    updateStartup: (_, { id, name, location, industry }) => {
      const startup = startups.find(startup => startup.id === id);
      if (!startup) {
        throw new Error('Startup not found');
      }
      if (name !== undefined) startup.name = name;
      if (location !== undefined) startup.location = location;
      if (industry !== undefined) startup.industry = industry;
      return startup;
    },
    deleteStartup: (_, { id }) => {
      const index = startups.findIndex(startup => startup.id === id);
      if (index === -1) {
        throw new Error('Startup not found');
      }
      const deletedStartup = startups.splice(index, 1);
      return deletedStartup[0];
    },
  },
};

// Create Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
