import "dotenv/config";
import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cors: "no-cors",
});

const connectDatabase = async () => {
  // Initialize Database connection.
  await mongoose.connect(process.env.DATABASE_URI, {
    keepAlive: true,
    serverSelectionTimeoutMS: 9000,
  });
};

// launch the web server.
server.listen().then(({ url }) => {
  connectDatabase().then(() => console.log(`🗳️   Connected to database`));
  console.log(`🚀  GraphQL Server ready at ${url}`);
});