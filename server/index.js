import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
});

const connectDatabase = async () => {
  // Initialize Database connection.
  const DB_URI =
    "mongodb+srv://emmadal:Qwerty2022@cluster0.fwsxr.mongodb.net/?retryWrites=true&w=majority";
  await mongoose.connect(DB_URI, {
    keepAlive: true,
    serverSelectionTimeoutMS: 9000,
  });
};

// launch the web server.
server.listen().then(({ url }) => {
  connectDatabase().then(() => console.log(`🗳️   Connected to database`));
  console.log(`🚀  GraphQL Server ready at ${url}`);
});
