import { GraphQLServer } from 'graphql-yoga';
import { prisma } from './generated/prisma-client';

import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import User from './resolvers/User';
import Link from './resolvers/Link';

const resolvers = {
  Query,
  Mutation,
  User,
  Link
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});

server.start((): void =>
  console.log(`Server is running on http://localhost:4000`)
);
