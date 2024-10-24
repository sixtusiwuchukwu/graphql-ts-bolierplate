import gql from 'graphql-tag';

// Define the GraphQL schema (type definitions)
 export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    user(id: ID!): User
    users: [User!]!
  }

  type Mutation {
    createUser(name: String!, email: String!): User
  }
`;

// Mock data (replace with real database integration in the future)
const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' }
];

// Define resolvers
 export const resolvers = {
  Query: {
    user: (_parent: any, args: { id: string }) => {
      return users.find(user => user.id === args.id);
    },
    users: () => users,
  },
  Mutation: {
    createUser: (_parent: any, args: { name: string, email: string }) => {
      const newUser = {
        id: String(users.length + 1),
        name: args.name,
        email: args.email
      };
      users.push(newUser);
      return newUser;
    },
  }
};
