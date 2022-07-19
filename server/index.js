import "dotenv/config";
import { ApolloServer, AuthenticationError } from "apollo-server";
import mongoose from "mongoose";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";
import { getUser, verifyToken } from "./auth";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cors: "no-cors",
  context: async ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization || "";
    // we check user roles/permissions here
    const payload = verifyToken(token);
    if (payload && payload.userId) {
      const user = await getUser(payload.userId);
      // add the user to the context
      return { user };
    }
    throw new AuthenticationError(
      "Vous n'êtes pas autorisé a effectuer cette opération.",
    );
  },
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